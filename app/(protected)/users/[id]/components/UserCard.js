import React from "react";
import { Card, Text } from "@radix-ui/themes";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Profile from "@/models/profile";
import { Separator } from "@/components/ui/separator";

/**
 *
 * @param {Obj} props
 * @param {Profile} props.user
 * @returns
 */

export default function UserCard({ user }) {
  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <Text size="4">{user.name}</Text>
            <Badge>
              <Text size="2">{user.role}</Text>
            </Badge>
          </div>
          <Separator className="mt-4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-y-6">
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Email
              </Text>
              <Text size="2">{user.email || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Mobile
              </Text>
              <Text size="2">{user.mobile || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                City
              </Text>
              <Text size="2">{user.city || "N/A"}</Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Preferred Landholds
              </Text>
              {user.prefLandhold?.length ? (
                <div className="flex items-center gap-2">
                  {user.prefLandhold.map((hold, index) => (
                    <Text size="2" key={index}>
                      {hold}
                    </Text>
                  ))}
                </div>
              ) : (
                <Text size="2">N/A</Text>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Text size="3" weight="medium">
                Preferred Locations
              </Text>
              {user.prefLocation?.length ? (
                <div className="flex items-center gap-2">
                  {user.prefLocation.map((location, index) => (
                    <Text size="2" key={index}>
                      {location}
                    </Text>
                  ))}
                </div>
              ) : (
                <Text size="2">N/A</Text>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
