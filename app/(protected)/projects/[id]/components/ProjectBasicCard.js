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
import { ProjectBasic } from "@/models/project";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 *
 * @param {Obj} props
 * @param {ProjectBasic} props.data
 * @returns
 */

export default function ProjectBasicCard({ data }) {
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between capitalize">
            <Text size="4">{data.name}</Text>
          </div>
          <Separator className="mt-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-y-6">
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Project Cost
              </Text>
              <Text size="2">{data.projectCost || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                LandSize
              </Text>
              <Text size="2">{data.landSize || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Cost Per SqYd
              </Text>
              <Text size="2">{data.costPerSqyd || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                No. of Tickets
              </Text>
              <Text size="2">{data.noOfTickets || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Ticket Cost
              </Text>
              <Text size="2">{data.ticketCost || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Location
              </Text>
              <Text size="2">{data.location || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Longitude and Latitude
              </Text>
              <Text size="2">{data.lanlat || "N/A"}</Text>
            </div>
            <div className="flex flex-col col-span-3 gap-1">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <Text size="3" weight="medium">
                      Amenities
                    </Text>
                  </AccordionTrigger>
                  <AccordionContent>
                    {data.amenities?.length ? (
                      <div className="flex flex-col gap-2 pl-2">
                        {data.amenities.map((a, index) => (
                          <Text size="2" key={index}>
                            {a}
                          </Text>
                        ))}
                      </div>
                    ) : (
                      <Text size="2">N/A</Text>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="flex flex-col col-span-3 gap-1">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <Text size="3" weight="medium">
                      Benefits
                    </Text>
                  </AccordionTrigger>
                  <AccordionContent>
                    {data.benefits?.length ? (
                      <div className="flex flex-col gap-2 pl-2">
                        {data.benefits.map((b, index) => (
                          <Text size="2" key={index}>
                            {b}
                          </Text>
                        ))}
                      </div>
                    ) : (
                      <Text size="2">N/A</Text>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
