import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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

export default function InputField({
  form,
  label,
  name,
  description,
  placeholder
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
