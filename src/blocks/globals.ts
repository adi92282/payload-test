import { cn } from "@/utilities/cn";

export const spacingTopClasses = {
  none: "mt-0",
  small: "mt-8",
  medium: "mt-16",
  large: "mt-24",
} as const;

export const spacingBottomClasses = {
  none: "mb-0",
  small: "mb-8",
  medium: "mb-16",
  large: "mb-24",
} as const;

export const paddingTopClasses = {
  none: "pt-0",
  small: "pt-8",
  medium: "pt-16",
  large: "pt-24",
} as const;

export const paddingBottomClasses = {
  none: "pb-0",
  small: "pb-8",
  medium: "pb-16",
  large: "pb-24",
} as const;

export const positionBoxClasses = {
left: "mr-auto",
right: "ml-auto",
center: "mx-auto",
} as const;

export type SpacingTop = keyof typeof spacingTopClasses;
export type SpacingBottom = keyof typeof spacingBottomClasses;
export type PaddingTop = keyof typeof paddingTopClasses;
export type PaddingBottom = keyof typeof paddingBottomClasses;
export type Position = keyof typeof positionBoxClasses;

export const getCenteringClasses = (alignment: "left" | "right" | "full" | "center" = "center") => {
  return cn(
    alignment === "left" || alignment === "right"
      ? "max-w-sm-half md:max-w-md-half lg:max-w-lg-half xl:max-w-xl-half 2xl:max-w-2xl-half"
      : "",
    alignment === "left" ? "ml-0 pl-0" : "",
    alignment === "right" ? "mr-0 pr-0" : "",
    alignment === "full" ? "max-w-none mx-0 px-0" : "",
  );
};


