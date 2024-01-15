import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Button from "./Button";
import { Toaster } from "./ui/toaster";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";

interface DeleteUserModalProps {
  id: string;
}

const DeleteUserModal = ({ id }: DeleteUserModalProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = () => {
    mutation.mutate();
    setOpen(false);
  };

  // MUTATION FOR DELETING

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (deletedUser) => {
      return axios.delete(`http://localhost:4000/users/${id}`, deletedUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User deleted",
        description: "User has been deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "ERROR",
        description: "User has not been deleted",
      });
    },
  });

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
              <Button onClick={() => handleDelete()} text="Delete" color="bg-red-700" />
              <Button onClick={() => setOpen(false)} text="Cancel" color="bg-red-700" />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export default DeleteUserModal;
