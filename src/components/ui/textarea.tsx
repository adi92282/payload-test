import * as React from "react";

import { cn } from "src/utilities/cn";

export type TextareaProps = {} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      placeholder=" "
      className={cn(
        " peer w-full rounded-xl border bg-white px-3.5 py-3 text-lg outline-none transition-all font-epilogue border-stroke-dark focus:border-transparent focus:ring-mainColor-blue focus:ring-1",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
