"use client";

import { FieldLabel, useField } from "@payloadcms/ui";
import { type TextFieldClientComponent } from "payload";

import { ColorPicker } from "../ui/colorPicker";

export const AdminColorPicker: TextFieldClientComponent = ({ path, field }) => {
  const { value, setValue } = useField<{ value: string | undefined }>({ path });

  return (
    <div className="flex flex-col gap-1.25 pb-5">
      <FieldLabel label={field.label} />
      <ColorPicker color={typeof value === "string" ? value : ""} onChange={setValue} className="w-full h-15" />
    </div>
  );
};
