"use client";

import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectBasic } from "@/models/project";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import Profile from "@/models/profile";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 *
 * @param {Object} props
 * @param {ProjectBasic[]} props.projects
 * @param {Profile} props.user
 * @returns
 */

export default function AddProperty({ projects, user }) {
  const [openCommand, setOpenCommand] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [activeProject, setActiveProject] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleProjectSelect = (project) => {
    setOpenCommand(false);
    setActiveProject(project);
    setOpenConfirm(true);
  };

  const onSubmit = async () => {
    setLoading(true);

    const { data, error } = await supabase.rpc("add_property", {
      user_id: user.userId,
      project_id: activeProject.projectId,
    });
    if (error) {
      toast({
        title: "Unable to add property",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Property successfully added",
      });
      router.refresh();
    }
    setOpenConfirm(false);
    setLoading(false);
  };

  return (
    <div>
      <Button
        onClick={() => {
          setOpenCommand(true);
        }}
      >
        Add Property
      </Button>
      <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
        <CommandInput placeholder="Search projects..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {projects.map((pro, i) => (
              <CommandItem
                className="mb-2 !bg-transparent hover:!bg-accent cursor-pointer pl-2"
                key={i}
                onSelect={() => handleProjectSelect(pro)}
              >
                <div className="flex items-center justify-between w-full">
                  <Text className="capitalize">{pro.name}</Text>
                  <Text>{pro.location}</Text>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <Text color="tomato">
                This action make the user -{" "}
                {user && <strong className="uppercase">{user.name}</strong>} own
                the project -{" "}
                <strong className="uppercase">{activeProject.name}</strong>
                <br /> So please be careful and{" "}
                <strong>double check the details.</strong>
              </Text>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* <DialogClose>
              <Button variant="secondary">cancel</Button>
            </DialogClose> */}
            <Button onClick={onSubmit} disabled={loading}>
              {loading && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
              Add Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
