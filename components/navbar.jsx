import { cn } from "@/lib/utils";
import { ExitIcon } from "@radix-ui/react-icons";
import React from "react";
import SignoutBtn from "./signout-btn";
import { ModeToggle } from "./mode-toggle-btn";
import { PROJECT_PAGE, USERS_PAGE } from "@/constants/routes.constants";
import Link from "next/link";
import { Text } from "@radix-ui/themes";

const routes = {
  users: `${USERS_PAGE}?page=1`,
  projects: `${PROJECT_PAGE}?page=1`,
  properties: `${PROJECT_PAGE}?page=1`,
};

export default function Navbar({ className }) {
  return (
    <div
      className={cn(
        className,
        "flex justify-between items-center shadow-[#888_0px_1px_2px]"
      )}
    >
      <div className="bg-background text-foreground"></div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-4 mr-8">
          {Object.entries(routes).map(([display, link]) => (
            <Link href={link} key={display}>
              <Text size="2" color="indigo">
                {display}
              </Text>
            </Link>
          ))}
        </div>
        <SignoutBtn>
          <ExitIcon />
        </SignoutBtn>
        <ModeToggle />
      </div>
    </div>
  );
}
