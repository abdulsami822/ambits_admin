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
import { ProjectAgri } from "@/models/project";

/**
 *
 * @param {Obj} props
 * @param {ProjectAgri} props.data
 * @returns
 */

export default function ProjectAgriCard({ data }) {
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between capitalize">
            <Text size="4">Agricultural Details</Text>
          </div>
          <Separator className="mt-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-y-6">
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Soil Type
              </Text>
              <Text size="2">{data.soilType || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Water Rights
              </Text>
              <Text size="2">{data.waterRights || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Easements
              </Text>
              <Text size="2">{data.easements || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Farming Infrastructure
              </Text>
              <Text size="2">{data.farmingInfra || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Land Improvement Cost
              </Text>
              <Text size="2">{data.landImpCosts || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Subsidies and Incentives
              </Text>
              <Text size="2">{data.subsAndIncentives || "N/A"}</Text>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
