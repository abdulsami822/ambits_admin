"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Text } from "@radix-ui/themes";

export default function UserBadge({ desc, role }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge>{role}</Badge>
        </TooltipTrigger>
        <TooltipContent>
          <Text>{desc}</Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
