package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"code.sajari.com/docconv"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	gogpt "github.com/sashabaranov/go-gpt3"
)

func review(w gin.ResponseWriter, r *http.Request) {
	fmt.Println("method:", r.Method) //get request method

	// Parse our multipart form, 10 << 20 specifies a maximum
	// upload of 10 MB files.
	r.ParseMultipartForm(5 << 20)
	// FormFile returns the first file for the given key `myFile`
	// it also returns the FileHeader so we can get the Filename,
	// the Header and the size of the file
	file, handler, err := r.FormFile("file")
	if err != nil {
		fmt.Println("Error Retrieving the File")
		fmt.Println(err)
		return
	}
	defer file.Close()
	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)

	// Create a temporary file within our temp-images directory that follows
	// a particular naming pattern
	tempFile, err := ioutil.TempFile("/tmp", "upload-*.pdf")
	if err != nil {
		fmt.Println("failed creating tmp file")
		fmt.Println(err)
	}
	defer tempFile.Close()

	// read all of the contents of our uploaded file into a
	// byte array
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}
	// write this byte array to our temporary file
	tempFile.Write(fileBytes)
	// return that we have successfully uploaded our file!
	fmt.Println("Successfully Uploaded File: " + tempFile.Name())

	resume, err := docconv.ConvertPath(tempFile.Name())
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(resume) // this is the text content of the pdf

	// get the url string from the request form data
	url := r.FormValue("url")
	fmt.Println("url:", url)

	// get the job id from the url
	jobID := strings.Split(url, "/")[4]
	fmt.Println("jobID:", jobID)

	// make a rest request to https://www.seek.co.nz/graphql with the job id and get the response body as a string
	requestBody := fmt.Sprintf(`{"operationName":"GetJobDetails","variables":{"jobId":"%s","zone":"anz-2"},"query":"query GetJobDetails($jobId: ID!, $zone: Zone!) {\n  jobDetails(\n id: $jobId\n ) {\n job {\n content(platform: WEB)\n salary {\n currencyLabel(zone: $zone)\n label\n __typename\n }\n advertiser {\n id\n name\n __typename\n }\n categories {\n label\n __typename\n }\n __typename\n }\n __typename\n }\n}\n"}`, jobID)
	response, err := http.Post("https://www.seek.co.nz/graphql", "application/json", strings.NewReader(requestBody))
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	}
	defer response.Body.Close()
	jobInfo, _ := ioutil.ReadAll(response.Body)

	// call open ai to suggest changes to the resume
	gptPrompt := fmt.Sprintf("I have a job listing that I want you to understand. With it, I will send you information about my resume section by section. For example my experience then education, then achievements. You must act as a career coach and resume reviewer to give constructive feedback on each section to help me get this job (generate a bullet point list of changes to the whole section that will be helpful - speak as if you are talking directly to the job candidate). If there is missing experience for this job, please reccomend courses that will help get the job, or jobs that I could get which help me get experience for a job like the one in this listing. The job listing is:\n```\n%s\n```\nThe resume is: \n```\n%s\n```\n ADVICE:", string(jobInfo), resume.Body)
	fmt.Println(gptPrompt)
	c := gogpt.NewClient(os.Getenv("OPENAI_API_KEY"))
	req := gogpt.CompletionRequest{
		Model:     gogpt.GPT3TextDavinci003,
		MaxTokens: 2500,
		Prompt:    gptPrompt,
	}
	resp, err := c.CreateCompletion(context.Background(), req)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(resp.Choices[0].Text)

	w.Write([]byte(resp.Choices[0].Text))
}

func main() {
	godotenv.Load(".env")
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"PUT", "PATCH", "GET", "POST", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Length", "Content-Type"},
	}))
	r.POST("/api/review", func(c *gin.Context) {
		review(c.Writer, c.Request)
		c.String(http.StatusOK, "pong")
	})
	r.Run(":8080")
}
