"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function SignoutBtn(props) {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClientComponentClient();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Successfully Logged out",
    });
    router.replace("/login");
  };
  return (
    <Button {...props} onClick={handleLogout}>
      {props.children}
    </Button>
  );
}
