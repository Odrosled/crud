import { useQueryClient } from "@tanstack/react-query";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Button from "./Button";
import { useState } from "react";

interface UserProps {
  id: string;
  username: string;
  password: string;
  email: string;
}

interface FormInput {
  username: string;
  email: string;
  password: string;
}

const NewUserForm = ({ id, username, password, email }: UserProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // REACT HOOK FORM

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormInput>();

  // TAKE FORM DATA

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data);
    reset();
    setOpen(false);
  };

  // REACT QUERY EDIT USER DATA

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedUser) => {
      return axios.put(`http://localhost:4000/users/${id}`, updatedUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "User updated",
        description: "User has been updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "ERROR",
        description: "User has not been updated",
      });
    },
  });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button text="edit" color="bg-yellow-700" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit user</DialogTitle>
            <DialogDescription>Fill the form below and click on submit to edit the user.</DialogDescription>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
              <input placeholder={username} className="border" {...register("username", { required: true })} />
              <input placeholder={email} className="border" {...register("email", { required: true })} />
              <input placeholder={password} className="border" {...register("password", { required: true })} />
              <input disabled={isSubmitting} type="submit" />
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export default NewUserForm;
