import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import Button from "./Button";
import { DialogHeader } from "./ui/dialog";
import { Toaster } from "./ui/toaster";
import { useState } from "react";

const DeleteUserModal = () => {
  const [open, setOpen] = useState(false);

  // const { toast } = useToast();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button text="delete" color="bg-red-700" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete user</DialogTitle>
            <DialogDescription>Are you sure you want to delete this user?</DialogDescription>
            <div className="flex justify-between">
              <Button text="Delete" color="bg-red-700" />
              <Button text="Cancel" color="bg-red-700" />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export default DeleteUserModal;
