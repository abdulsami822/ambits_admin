import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";

import {
  Project,
  ProjectAgri,
  ProjectBasic,
  ProjectFuture,
  ProjectLegal,
  ProjectWeather,
} from "@/models/project";
import ProjectBasicCard from "./components/ProjectBasicCard";
import ProjectAgriCard from "./components/ProjectAgriCard";
import ProjectFutureCard from "./components/ProjectFutureCard";
import ProjectLegalCard from "./components/ProjectLegalCard";
import ProjectWeatherCard from "./components/ProjectWeatherCard";

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
    <div className="space-y-4">
      <ProjectBasicCard data={basicDetails} />
      <ProjectAgriCard data={agriculturalDetails} />
      <ProjectFutureCard data={futDevPotential} />
      <ProjectLegalCard data={legalDetails} />
      <ProjectWeatherCard data={weatherDetails} />
    </div>
  );
}
