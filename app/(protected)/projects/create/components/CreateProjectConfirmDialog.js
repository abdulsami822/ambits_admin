import { Button } from "@/components/ui/button";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import React from "react";

const CreateProjectConfirmDialog = ({ onSubmit, loading, open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <Text color="tomato">
              This action will create a new project that can be seen by end
              users.
              <br /> So please be careful and{" "}
              <strong>double check the information provided.</strong>
            </Text>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* <DialogClose>
            <Button variant="secondary">cancel</Button>
          </DialogClose> */}
          <Button onClick={onSubmit} disabled={loading}>
            {loading && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
            Create project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectConfirmDialog;
