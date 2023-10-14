import React from "react";
import { Card, Text } from "@radix-ui/themes";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectLegal } from "@/models/project";

/**
 *
 * @param {Obj} props
 * @param {ProjectLegal} props.data
 * @returns
 */

export default function ProjectLegalCard({ data }) {
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between capitalize">
            <Text size="4">Legal Details</Text>
          </div>
          <Separator className="mt-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-y-6">
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Title Deed Ownership
              </Text>
              <Text size="2">{data.titleDeedOwnership || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Legal and Title Issues
              </Text>
              <Text size="2">{data.legalTitleIssues || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Easements, Access and Roads
              </Text>
              <Text size="2">{data.easements || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Topography & Terrain
              </Text>
              <Text size="2">{data.topography || "N/A"}</Text>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
