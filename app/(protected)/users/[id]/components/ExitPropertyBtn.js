"use client";

import { useState } from "react";

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
import { Property } from "@/models/property";

/**
 *
 * @param {Object} props
 * @param {Property} props.property
 * @param {Profile} props.user
 * @param {ProjectBasic} props.project
 * @param {Object} props.btnProps
 * @returns
 */

export default function ExitPropertyBtn({
  user,
  property,
  project,
  children,
  onSubmit,
  btnProps,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleExit = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("exit_property", {
      user_id: user.userId,
      project_id: project.projectId,
    });
    if (error) {
      toast({
        title: "Unable to add property",
        description: "Something went wrong",
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
          setOpenConfirm(true);
        }}
        {...btnProps}
        variant="destructive"
      >
        {children}
      </Button>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <Text color="tomato">
                This action make the user -{" "}
                <strong className="uppercase">
                  {user.name} exit the project - {project.name}
                </strong>
                <br /> So please be careful and{" "}
                <strong>double check the details.</strong>
              </Text>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* <DialogClose>
              <Button variant="secondary">cancel</Button>
            </DialogClose> */}
            <Button
              onClick={handleExit}
              disabled={loading}
              variant="destructive"
            >
              {loading && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
              {children}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
