import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Text } from "@radix-ui/themes";

export default function ProjectAccrodion({
  basicDetails,
  agriculturalDetails,
  futDevPotential,
  legalDetails,
  weatherDetails,
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center justify-between capitalize">
            <Text size="4">{basicDetails.name}</Text>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-y-6">
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Project Cost
                </Text>
                <Text size="2">{basicDetails.projectCost || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  LandSize
                </Text>
                <Text size="2">{basicDetails.landSize || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Cost Per SqYd
                </Text>
                <Text size="2">{basicDetails.costPerSqyd || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  No. of Tickets
                </Text>
                <Text size="2">{basicDetails.noOfTickets || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Ticket Cost
                </Text>
                <Text size="2">{basicDetails.ticketCost || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Location
                </Text>
                <Text size="2">{basicDetails.location || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Longitude and Latitude
                </Text>
                <Text size="2">{basicDetails.lanlat || "N/A"}</Text>
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
                      {basicDetails.amenities?.length ? (
                        <div className="flex flex-col gap-2 pl-2">
                          {basicDetails.amenities.map((a, index) => (
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
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <Text size="3" weight="medium">
                        Benefits
                      </Text>
                    </AccordionTrigger>
                    <AccordionContent>
                      {basicDetails.benefits?.length ? (
                        <div className="flex flex-col gap-2 pl-2">
                          {basicDetails.benefits.map((b, index) => (
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
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div className="flex items-center justify-between capitalize">
            <Text size="4">Agricultural Details</Text>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-y-6">
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Soil Type
                </Text>
                <Text size="2">{agriculturalDetails.soilType || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Water Rights
                </Text>
                <Text size="2">{agriculturalDetails.waterRights || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Easements
                </Text>
                <Text size="2">{agriculturalDetails.easements || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Farming Infrastructure
                </Text>
                <Text size="2">
                  {agriculturalDetails.farmingInfra || "N/A"}
                </Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Land Improvement Cost
                </Text>
                <Text size="2">
                  {agriculturalDetails.landImpCosts || "N/A"}
                </Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Subsidies and Incentives
                </Text>
                <Text size="2">
                  {agriculturalDetails.subsAndIncentives || "N/A"}
                </Text>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <div className="flex items-center justify-between capitalize">
            <Text size="4">Future Prospects-Value For Money</Text>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-y-6">
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Adjacent Land Use
                </Text>
                <Text size="2">{futDevPotential.adjLandUse || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Future Development Potential
                </Text>
                <Text size="2">{futDevPotential.futDevPotential || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Political Stability
                </Text>
                <Text size="2">
                  {futDevPotential.politicalStability || "N/A"}
                </Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Resale Value
                </Text>
                <Text size="2">{futDevPotential.resaleValue || "N/A"}</Text>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          <div className="flex items-center justify-between capitalize">
            <Text size="4">Legal Details</Text>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-y-6">
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Title Deed Ownership
                </Text>
                <Text size="2">{legalDetails.titleDeedOwnership || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Legal and Title Issues
                </Text>
                <Text size="2">{legalDetails.legalTitleIssues || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Easements, Access and Roads
                </Text>
                <Text size="2">{legalDetails.easements || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Topography & Terrain
                </Text>
                <Text size="2">{legalDetails.topography || "N/A"}</Text>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          <div className="flex items-center justify-between capitalize">
            <Text size="4">Weather Details</Text>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-y-6">
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Climate
                </Text>
                <Text size="2">{weatherDetails.climate || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Noise Quality
                </Text>
                <Text size="2">{weatherDetails.noiseQuality || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Pollution Quality
                </Text>
                <Text size="2">{weatherDetails.pollutionQuality || "N/A"}</Text>
              </div>
              <div className="flex flex-col gap-1">
                <Text size="3" weight="medium">
                  Environmental Factors
                </Text>
                <Text size="2">{weatherDetails.envFactors || "N/A"}</Text>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
