import React, { HTMLProps, Ref } from "react";

interface Props extends HTMLProps<HTMLInputElement> {
  labelText: string;
  innerRef?: Ref<HTMLInputElement>;
  className?: string;
}

export function TextInput({
  labelText,
  innerRef,
  className,
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
        className="mt-2 w-full border-2 border-dashed border-black p-2 text-lg focus:border-solid focus:border-black focus-visible:outline-none"
        ref={innerRef}
        {...inputProps}
      />
    </div>
  );
}
