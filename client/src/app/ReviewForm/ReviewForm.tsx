"use client";
import { Upload } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button, UploadButton } from "../components/Button";
import { TextInput } from "../components/TextInput";

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
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Schema>({ resolver: zodResolver(schema), mode: "onTouched" });
  const { ref: fileRef, onChange, ...fileRest } = register("file");
  const { ref: urlRef, ...urlRest } = register("url");

  const onSubmit: SubmitHandler<Schema> = (data) => {
    const file = data.file[0];
    const url = data.url;
    console.log(file.name);
    console.log(url);
    console.log("submitting");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1:</h2>
      <UploadButton
        accept=".pdf"
        color="bg-cyan-200"
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
        placeholder="e.g. https://www.seek.co.nz/job/12345678"
        className="w-80"
        innerRef={urlRef}
        error={errors.url?.message}
        {...urlRest}
      />
      <h2>Step 3:</h2>
      <Button type="submit" disabled={!isValid}>
        Get shortlisted
      </Button>
    </form>
  );
}
