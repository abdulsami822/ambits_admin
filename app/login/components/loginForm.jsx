"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/inputField";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const formSchema = zod.object({
  email: zod.string().email("Invalid Email"),
  password: zod.string(),
});

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();

  async function onSubmit(values) {
    try {
      setLoading(true);
      const { error, data } = await supabase.auth.signInWithPassword({
        ...values,
      });
      if (error) {
        throw Error();
      }
      const { user } = data;
      if (user) {
        const { data, error } = await supabase.rpc("get_my_claims", {});
        if (!data.claims_admin === true || error) {
          await supabase.auth.signOut();
          throw new Error();
        }
      }
      toast({
        title: "Successfully Logged in",
      });
      router.replace("/");
    } catch (err) {
      toast({
        title: "Invalid credentials",
        description: "Please enter valid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          form={form}
          name="email"
          label="Email"
          placeholder="enter your email"
        />
        <InputField
          form={form}
          name="password"
          label="Password"
          placeholder="enter your password"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}
