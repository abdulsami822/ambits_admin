import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";

import UserCard from "./components/UserCard";
import { getProfileRole } from "@/utils/supabase.utils";
import UserPropertyList from "./components/UserPropertyList";

const getUser = async ({ supabase, id }) => {
  const { data } = await supabase
    .from("profile")
    .select("*")
    .single()
    .eq("user_id", id);
  const { data: role } = await getProfileRole({
    supabase,
    userId: id,
  });
  const userData = { ...data, role };
  return userData;
};

const getProperties = async ({ supabase, id }) => {
  const { data } = await supabase
    .from("property")
    .select("*")
    .eq("user_id", id);
  return data;
};

const getProjects = async ({ supabase, id }) => {
  const { data } = await supabase.from("project").select("*");
  return data;
};

export default async function page({ params }) {
  const supabase = createServerComponentClient({ cookies });

  const { id } = params;
  const user = await getUser({ supabase, id });
  const properties = await getProperties({ supabase, id });
  const projects = await getProjects({ supabase, id });
  return (
    <div className="space-y-4">
      <UserCard user={user} />
      <UserPropertyList
        user={user}
        properties={properties}
        projects={projects}
      />
    </div>
  );
}
