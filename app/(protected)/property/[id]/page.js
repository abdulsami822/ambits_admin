import { getProfileRole } from "@/utils/supabase.utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PropertyCard from "./components/PropertyCard";
import { Card, Text } from "@radix-ui/themes";
import { CardContent } from "@/components/ui/card";

async function getProperty({ supabase, id }) {
  const { data } = await supabase
    .from("property")
    .select("*")
    .single()
    .eq("id", id);
  return data;
}

const getProject = async ({ supabase, id }) => {
  const { data } = await supabase
    .from("project")
    .select("*")
    .single()
    .eq("project_id", id);
  return data;
};

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

export default async function page({ params }) {
  const { id } = params;
  const supabase = createServerComponentClient({ cookies });
  const property = await getProperty({ supabase, id });
  const project = await getProject({ supabase, id: property.project_id });
  const user = await getUser({ supabase, id: property.user_id });

  return (
    <div>
      <PropertyCard project={project} property={property} user={user} />
      <Card className="w-full mt-6">
        <CardContent>
          <div className="mx-auto w-max">
            <Text>More Details are yet to come</Text>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
