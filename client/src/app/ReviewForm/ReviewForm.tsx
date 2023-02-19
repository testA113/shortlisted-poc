"use client";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button, UploadButton } from "../components/Button";

export function ReviewForm() {
  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = () => {
    console.log(getValues());
    console.log("submitting");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1:</h2>
      <UploadButton
        accept=".pdf"
        color="bg-gray-300"
        {...register("file")}
        ref={null}
      >
        <Upload />
        Upload Resume
      </UploadButton>
      <h2>Step 2:</h2>

      <Button type="submit">Submit</Button>
    </form>
  );
}
