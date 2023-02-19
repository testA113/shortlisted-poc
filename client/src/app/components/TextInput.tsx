import clsx from "clsx";
import React, { HTMLProps, Ref } from "react";

import { FormError } from "./FormError";

interface Props extends HTMLProps<HTMLInputElement> {
  labelText: string;
  innerRef?: Ref<HTMLInputElement>;
  className?: string;
  error?: string;
}

export function TextInput({
  labelText,
  innerRef,
  className,
  error,
  ...inputProps
}: Props) {
  return (
    <div className={className}>
      <label
        htmlFor={inputProps.id}
        className="block text-lg font-medium text-gray-700"
      >
        {labelText}
      </label>

      <input
        className={clsx(
          error ? "bg-red-100" : "bg-gray-100",
          "mt-2 w-full border-2 border-dashed border-black p-2 text-lg transition duration-200 ease-out focus:border-solid focus:border-black focus-visible:outline-none"
        )}
        ref={innerRef}
        {...inputProps}
      />
      <FormError error={error} />
    </div>
  );
}
