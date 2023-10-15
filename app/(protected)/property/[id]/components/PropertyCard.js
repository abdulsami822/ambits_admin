import { Property } from "@/models/property";
import { Card, Text } from "@radix-ui/themes";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Profile from "@/models/profile";
import { ProjectBasic } from "@/models/project";
import { DateTime } from "luxon";
import ExitPropertyBtn from "@/app/(protected)/users/[id]/components/ExitPropertyBtn";

export default function PropertyCard({
  property: propertyData,
  user: userData,
  project: projectData,
}) {
  const property = Property.from(propertyData);
  const user = Profile.from(userData);
  const project = ProjectBasic.from(projectData);
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between capitalize">
            <Text size="4">
              {project.name} - {user.name}
            </Text>
            <ExitPropertyBtn project={project} property={property} user={user}>
              Exit User
            </ExitPropertyBtn>
          </div>
          <Separator className="mt-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-y-6">
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Started on
              </Text>
              <Text size="2">
                {DateTime.fromISO(property.createdAt).toFormat("ff")}
              </Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Status
              </Text>
              <Text
                size="2"
                color={
                  property.status === Property.STATUS.EXIT ? "tomato" : "green"
                }
              >
                {property.getStatusDisplay()}
              </Text>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
