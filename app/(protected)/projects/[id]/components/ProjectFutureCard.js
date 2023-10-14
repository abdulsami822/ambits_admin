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
import { ProjectFuture } from "@/models/project";

/**
 *
 * @param {Obj} props
 * @param {ProjectFuture} props.data
 * @returns
 */

export default function ProjectFutureCard({ data }) {
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between capitalize">
            <Text size="4">Future Prospects-Value For Money</Text>
          </div>
          <Separator className="mt-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-y-6">
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Adjacent Land Use
              </Text>
              <Text size="2">{data.adjLandUse || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Future Development Potential
              </Text>
              <Text size="2">{data.futDevPotential || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Political Stability
              </Text>
              <Text size="2">{data.politicalStability || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Resale Value
              </Text>
              <Text size="2">{data.resaleValue || "N/A"}</Text>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
