"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "src/utilities/cn";

const labelVariants = cva(
  "absolute left-2.5 -top-7.5 px-1 text-lg transition-all cursor-text font-epilogue peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-focus:-top-7.5 peer-focus:text-lg text-stroke-dark peer-focus:text-mainColor-blue ",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root className={cn(labelVariants(), className)} ref={ref} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
