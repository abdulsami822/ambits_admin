"use client";

import { Property } from "@/models/property";
import React from "react";
import { Card, Text } from "@radix-ui/themes";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectBasic } from "@/models/project";
import { DateTime } from "luxon";
import Link from "next/link";
import { GET_PROPERTY_DETAILS_PAGE } from "@/constants/routes.constants";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import AddProperty from "./AddProperty";
import Profile from "@/models/profile";
import ExitPropertyBtn from "./ExitPropertyBtn";

export default function UserPropertyList({
  user: userData,
  properties: propertiesData,
  projects: projectsData,
}) {
  const user = Profile.from(userData);
  const properties = Property.fromAll(propertiesData);
  const projects = ProjectBasic.fromAll(projectsData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <Text>Properties</Text>
            <AddProperty projects={projects} user={user} />
          </div>
        </CardTitle>
        <CardDescription>Projects that user own</CardDescription>
        <Separator className="mt-4" />
      </CardHeader>
      <CardContent>
        {!properties?.length ? (
          <div className="flex items-center justify-center">
            <Text size="2">User is not part of any project</Text>
          </div>
        ) : (
          <div>
            {properties.map((property, i) => {
              const project = projects?.find(
                (project) => project.projectId === property.projectId
              );
              const createdAt = DateTime.fromISO(project.createdAt).toFormat(
                "ff"
              );
              return (
                <div key={i} className="flex gap-8">
                  <div className="flex flex-col gap-1">
                    <Text size="1" weight="light">
                      Name
                    </Text>
                    <Link href={GET_PROPERTY_DETAILS_PAGE(property.id)}>
                      <Text
                        color="indigo"
                        className="flex items-center gap-1"
                        size="3"
                      >
                        {project.name} <ExternalLinkIcon />
                      </Text>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Text size="1" weight="light">
                      Started on
                    </Text>
                    <Text size="3">{createdAt}</Text>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Text size="1" weight="light">
                      Status
                    </Text>
                    <Text
                      size="3"
                      color={
                        property.status === Property.STATUS.EXIT
                          ? "tomato"
                          : "green"
                      }
                    >
                      {property.getStatusDisplay()}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
