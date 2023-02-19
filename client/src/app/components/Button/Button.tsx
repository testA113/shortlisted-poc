import clsx from "clsx";
import React, { HTMLProps, ReactNode } from "react";

interface Props extends HTMLProps<HTMLButtonElement> {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  color?: string;
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  onClick,
  type = "button",
  color = "bg-yellow-300",
  className,
  ...rest
}: Props) {
  return (
    <button
      className="group relative inline-block focus:outline-none"
      onClick={onClick}
      type={type}
      {...rest}
    >
      <span
        className={clsx(
          color,
          "absolute inset-0 translate-x-1.5 translate-y-1.5 cursor-pointer bg-yellow-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
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
    </button>
  );
}
