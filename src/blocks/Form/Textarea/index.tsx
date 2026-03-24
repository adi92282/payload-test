/* eslint-disable */
import { Label } from "@/components/ui/label";
import { Textarea as TextAreaComponent } from "@/components/ui/textarea";

import { Error } from "../Error";
import { Width } from "../Width";

import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";

export const Textarea = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  rows = 3,
  width,
}: TextField & {
  errors: Partial<FieldErrorsImpl<Record<string, any>>>;
  register: UseFormRegister<FieldValues>;
  rows?: number;
}) => {
  return (
    <Width width={width} className="relative w-full">
      <TextAreaComponent
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        {...register(name, { required: requiredFromProps })}
      />
      <Label
        className="font-epilogue peer-focus:-top-7.5 text-stroke-dark peer-focus:text-mainColor-blue absolute left-2.5 cursor-text px-1 text-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-focus:text-lg"
        htmlFor={name}
      >
        {label}
      </Label>
      {requiredFromProps && errors[name] && <Error />}
    </Width>
  );
};
