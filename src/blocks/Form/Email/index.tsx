/* eslint-disable */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Error } from "../Error";
import { Width } from "../Width";

import type { EmailField } from "@payloadcms/plugin-form-builder/types";
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";

export const Email = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  width,
}: EmailField & {
  errors: Partial<FieldErrorsImpl<Record<string, any>>>;
  register: UseFormRegister<FieldValues>;
}) => {
  return (
    <Width width={width} className="relative w-full">
      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required: requiredFromProps })}
      />
      <Label htmlFor={name}>{label}</Label>
      {requiredFromProps && errors[name] && <Error />}
    </Width>
  );
};
