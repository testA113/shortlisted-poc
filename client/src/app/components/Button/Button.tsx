import clsx from "clsx";
import { Loader2 } from "lucide-react";
import React, { HTMLProps, ReactNode } from "react";

interface Props extends HTMLProps<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  color?: string;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  isLoading,
  type = "button",
  color = "bg-yellow-300",
  onClick,
  className,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      className={clsx(
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        "group relative inline-block focus:outline-none"
      )}
      onClick={onClick}
      type={type}
      {...rest}
    >
      <span
        className={clsx(
          disabled
            ? "bg-gray-300"
            : `${color} translate-x-1.5 translate-y-1.5 cursor-pointer`,
          "absolute inset-0 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
        )}
      ></span>
      <span
        className={clsx(
          className,
          "relative flex gap-2 border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
        )}
      >
        {isLoading && <Loader2 className="animate-spin" />}
        {children}
      </span>
    </button>
  );
}
