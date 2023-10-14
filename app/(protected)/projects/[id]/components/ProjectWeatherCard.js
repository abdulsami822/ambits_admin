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
import { ProjectWeather } from "@/models/project";

/**
 *
 * @param {Obj} props
 * @param {ProjectWeather} props.data
 * @returns
 */

export default function ProjectWeatherCard({ data }) {
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between capitalize">
            <Text size="4">Weather Details</Text>
          </div>
          <Separator className="mt-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-y-6">
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Climate
              </Text>
              <Text size="2">{data.climate || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Noise Quality
              </Text>
              <Text size="2">{data.noiseQuality || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Pollution Quality
              </Text>
              <Text size="2">{data.pollutionQuality || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Environmental Factors
              </Text>
              <Text size="2">{data.envFactors || "N/A"}</Text>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
