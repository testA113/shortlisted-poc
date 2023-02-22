"use client";
import clsx from "clsx";
import { CheckCircle2 } from "lucide-react";
import { Dispatch, HTMLProps, ReactNode, Ref, SetStateAction } from "react";
import { FormError } from "../FormError";

interface Props extends HTMLProps<HTMLInputElement> {
  children: ReactNode;
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
  innerRef?: Ref<HTMLInputElement>;
  maxFileSize?: number;
  className?: string;
  accept?: string;
  color?: string;
  error?: string;
}

export function UploadButton({
  children,
  fileName,
  setFileName,
  innerRef,
  maxFileSize = 5,
  className,
  accept = ".pdf",
  color = "bg-yellow-300",
  onChange,
  error,
  ...inputProps
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor={inputProps.id}
        className="group relative inline-block focus:outline-none"
      >
        <input
          className="hidden"
          type="file"
          accept={accept}
          ref={innerRef}
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              if (file.size > maxFileSize * 1024 * 1024) {
                alert(`File is too big! Max size is ${maxFileSize}MB.`);
                e.preventDefault();
                return;
              }
              setFileName(file.name);
            }
            if (onChange) {
              onChange(e);
            }
          }}
          {...inputProps}
        />
        <span
          className={clsx(
            color,
            "absolute inset-0 translate-x-1.5 translate-y-1.5 cursor-pointer transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
          )}
        ></span>
        <span
          className={clsx(
            className,
            "relative flex cursor-pointer gap-2 border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
          )}
        >
          {children}
        </span>
      </label>
      {error && <FormError error={error} />}
      {fileName && (
        <div className={fileName ? "" : "invisible"}>
          <span className="my-1 flex items-center gap-1">
            <CheckCircle2 className="h-4 text-green-700" />
            {fileName || "No file selected"}
          </span>
        </div>
      )}
    </div>
  );
}
