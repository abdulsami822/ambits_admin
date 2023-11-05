import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";

import {
  ProjectAgri,
  ProjectBasic,
  ProjectFuture,
  ProjectLegal,
  ProjectWeather,
} from "@/models/project";
import ProjectAccrodion from "./components/ProjectAccrodion";
import ProjectImages from "./components/ProjectImages";
import { Text } from "@radix-ui/themes";

async function getProjectData({ supabase, id }) {
  const { data: basicData } = await supabase
    .from("project")
    .select("*")
    .single()
    .eq("project_id", id);
  const basicDetails = ProjectBasic.from(basicData);

  const { data: agriData } = await supabase
    .from("project_agri_land")
    .select("*")
    .single()
    .eq("project_id", id);
  const agriculturalDetails = ProjectAgri.from(agriData);

  const { data: futureData } = await supabase
    .from("project_future")
    .select("*")
    .single()
    .eq("project_id", id);
  const futDevPotential = ProjectFuture.from(futureData);

  const { data: legalData } = await supabase
    .from("project_legal")
    .select("*")
    .single()
    .eq("project_id", id);
  const legalDetails = ProjectLegal.from(legalData);

  const { data: weatherData } = await supabase
    .from("project_weather")
    .select("*")
    .single()
    .eq("project_id", id);
  const weatherDetails = ProjectWeather.from(weatherData);

  return {
    basicDetails,
    agriculturalDetails,
    futDevPotential,
    legalDetails,
    weatherDetails,
  };
}

export default async function page({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { id } = params;
  const {
    basicDetails,
    agriculturalDetails,
    futDevPotential,
    legalDetails,
    weatherDetails,
  } = await getProjectData({ supabase, id });

  return (
    <div className="space-y-6">
      <div>
        <Text size="5" className="capitalize " weight={"bold"}>
          {basicDetails.name}
        </Text>
        <ProjectAccrodion
          basicDetails={basicDetails}
          agriculturalDetails={agriculturalDetails}
          futDevPotential={futDevPotential}
          legalDetails={legalDetails}
          weatherDetails={weatherDetails}
        />
      </div>
      <ProjectImages projectId={id} />
    </div>
  );
}
