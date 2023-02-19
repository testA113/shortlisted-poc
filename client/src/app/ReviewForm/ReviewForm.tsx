"use client";
import { Upload } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, UploadButton } from "../components/Button";
import { TextInput } from "../components/TextInput";

type FormValues = {
  file: File[];
  url: string;
};

export function ReviewForm() {
  const { register, handleSubmit } = useForm<FormValues>();
  const { ref: fileRef, onChange, ...fileRest } = register("file");
  const { ref: urlRef, ...urlRest } = register("url");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const file = data.file[0];
    console.log(file.name);
    console.log("submitting");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1:</h2>
      <UploadButton
        accept=".pdf"
        color="bg-gray-300"
        innerRef={fileRef}
        onChange={onChange}
        {...fileRest}
      >
        <Upload />
        Upload Resume
      </UploadButton>
      <h2>Step 2:</h2>
      <TextInput
        labelText="URL to Seek job listing"
        placeholder="e.g. https://seek.co.nz/job/12345678"
        className="w-80"
        innerRef={urlRef}
        {...urlRest}
      />
      <h2>Step 3:</h2>
      <Button type="submit">Get custom feedback</Button>
    </form>
  );
}
