import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import Profile from "@/models/profile";

import UserCard from "./components/UserCard";
import { getProfileRole } from "@/utils/supabase.utils";

export default async function page({ params }) {
  const supabase = createServerComponentClient({ cookies });

  const { id } = params;
  const { data } = await supabase
    .from("profile")
    .select("*")
    .single()
    .eq("user_id", id);
  const { data: role } = await getProfileRole({
    supabase,
    userId: id,
  });
  const userData = Profile.from({ ...data, role });

  return (
    <div>
      <UserCard user={userData} />
      {/* <PropertyCard properties={properties} /> */}
    </div>
  );
}
