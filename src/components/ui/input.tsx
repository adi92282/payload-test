import * as React from "react";

import { cn } from "src/utilities/cn";

export type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, className, ...props }, ref) => {
  return (
    <input
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      placeholder=" "
      className={cn(
        `text-mainColor-blue font-epilogue border-stroke-dark focus:ring-mainColor-blue focus:text-mainColor-blue invalid:text-mainColor-blue peer w-full appearance-none rounded-xl border bg-white px-3.5 py-3 text-lg outline-none transition-all focus:border-transparent focus:ring-1`,
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
