import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./textarea";

/**
 *
 * @param {Obj} props
 * @param {any} props.form
 * @param {String} props.label
 * @param {String} props.name
 * @param {String} props.description
 * @param {String} props.placeholder
 * @returns
 */

export default function TextField({
  form,
  label,
  name,
  description,
  placeholder,
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
