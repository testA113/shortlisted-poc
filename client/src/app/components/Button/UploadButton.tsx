"use client";
import React, { createRef, HTMLProps, ReactNode, useState } from "react";
import { Button } from "./Button";

interface Props extends HTMLProps<HTMLInputElement> {
  children: ReactNode;
  className?: string;
  accept?: string;
  color?: string;
}

export function UploadButton({
  children,
  className,
  accept = ".pdf",
  color,
  ...inputProps
}: Props) {
  const [fileName, setFileName] = useState("");
  const fileRef = createRef<HTMLInputElement>();

  return (
    <div className="flex flex-col">
      <input
        className="hidden"
        ref={fileRef}
        type="file"
        accept={accept}
        {...inputProps}
        onChange={onChange}
      />
      <Button
        className={className}
        color={color}
        type="button"
        onClick={handleButtonClick}
      >
        {children}
      </Button>
      {fileName && <p>{fileName}</p>}
    </div>
  );

  function handleButtonClick() {
    if (fileRef && fileRef.current) {
      fileRef.current.click();
    }
  }

  function onChange() {
    if (fileRef && fileRef.current && fileRef.current.files) {
      const file = fileRef.current.files[0];
      setFileName(file.name);
      console.log(file);
    }
  }
}
