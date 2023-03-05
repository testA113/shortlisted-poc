"use client";
import { Upload } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-query";

import { Button, UploadButton } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

const schema = z.object({
  file: z.instanceof(FileList, "Must be a FileList"),
  url: z
    .string()
    .url("Must be a Seek job URL")
    .regex(
      /^(?:https?:\/\/)?(?:[^./]+\.)?seek\.co\.nz\/job\/\d+(?:\?.*)?$/,
      "Must be a Seek job URL"
    ),
});

type Schema = z.infer<typeof schema>;

export function ReviewForm() {
  const reviewMutation = useMutation((data: FormData) => {
    return fetch("http://localhost:8080/api/review", {
      body: data,
      method: "POST",
    });
  });
  const [fileName, setFileName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Schema>({ resolver: zodResolver(schema), mode: "onTouched" });
  const { ref: fileRef, onChange, ...fileRest } = register("file");
  const { ref: urlRef, ...urlRest } = register("url");
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<Schema> = async () => {
    if (formRef.current) {
      reviewMutation.mutate(new FormData(formRef.current));
    }
  };

  return (
    <form
      className="flex flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
    >
      <h2>Step 1:</h2>
      <UploadButton
        accept=".pdf"
        color="bg-cyan-200"
        innerRef={fileRef}
        onChange={onChange}
        fileName={fileName}
        setFileName={setFileName}
        error={fileName ? errors.file?.message : "Please upload a resume"}
        {...fileRest}
      >
        <Upload className="h-4" />
        Upload Resume
      </UploadButton>
      <h2>Step 2:</h2>
      <TextInput
        labelText="URL to Seek job listing"
        placeholder="e.g. https://www.seek.co.nz/job/12345678"
        className="w-96"
        innerRef={urlRef}
        error={errors.url?.message}
        {...urlRest}
      />
      <h2>Step 3:</h2>
      <Button
        className="min-w-[320px]"
        type="submit"
        disabled={!isValid || !fileName || reviewMutation.isLoading}
        loadingText={<LoadingButtonText isLoading={reviewMutation.isLoading} />}
        isLoading={reviewMutation.isLoading}
      >
        Get shortlisted
      </Button>
    </form>
  );
}

// this component cycles through and array of strings, with one fading out and the next fading in. It is used as a child to a button
function LoadingButtonText({ isLoading }: { isLoading: boolean }) {
  const [index, setIndex] = useState(0);
  const loadingText = [
    "Checking out the job...",
    "Inspecting your resume...",
    "Creating feedback...",
  ];

  useEffect(() => {
    if (loadingText.length === index || !isLoading) return;
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [loadingText.length, index, isLoading]);

  return (
    <span
      className={clsx(
        // pulse different loading text so the user doesn't get bored
        isLoading && index == 0 && "animate-slow-pulse-start",
        isLoading &&
          index >= 1 &&
          index < loadingText.length - 1 &&
          "animate-slow-pulse",
        isLoading &&
          index === loadingText.length - 1 &&
          "animate-slow-pulse-end"
      )}
    >
      {loadingText[index] || loadingText[index - 1]}
    </span>
  );
}
