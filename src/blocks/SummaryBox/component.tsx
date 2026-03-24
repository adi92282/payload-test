
import {
  spacingTopClasses,
  spacingBottomClasses,
  paddingTopClasses,
  paddingBottomClasses,
  positionBoxClasses,
  type SpacingTop,
  type SpacingBottom,
  type PaddingTop,
  type PaddingBottom,
  type Position,
} from "@/blocks/globals";
import RichText from "@/components/RichText";
import { cn } from "@/utilities/cn";

import type { Summary } from "@/payload-types";

type SummaryLayoutProps = {
  spacingTopBox?: SpacingTop | null;
  spacingBottomBox?: SpacingBottom | null;
  paddingTopBox?: PaddingTop | null;
  paddingBottomBox?: PaddingBottom | null;
  position?: Position | null;
};


export const SummaryBox = (props: Summary & SummaryLayoutProps) => {
  return (
    <section
      className={cn(
        "relative",
        spacingTopClasses[props.spacingTopBox ?? "none"],
        spacingBottomClasses[props.spacingBottomBox ?? "none"],
        paddingTopClasses[props.paddingTopBox ?? "none"],
        paddingBottomClasses[props.paddingBottomBox ?? "none"],
        
      )}
    >
      <div
        className={cn(
          "",
          props.maxWidth !== "full" && `max-w-${props.maxWidth}`,
          props.borderEnabled && props.borderWidth,
          props.textAlign && `text-${props.textAlign}`,
          props.textSize && `text-${props.textSize}`,
          props.radius && props.radiusAll,
          positionBoxClasses[props.position ?? "center"],
        )}
        style={{
          background: props.background ?? undefined,
        }}
      >
        <RichText data={props.text} enableProse={props.enableProse ?? true} />
      </div>
    </section>
  );
};
