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

interface FormInput {
  username: string;
  email: string;
  password: string;
}

const NewUserForm = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormInput>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) => {
      return axios.post("http://localhost:4000/users", newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "User added",
        description: "User has been added successfully",
      });
    },
    onError: () => {
      toast({
        title: "ERROR",
        description: "User has not been added",
      });
    },
  });

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data);
    reset();
    setOpen(false);
  };

  const { toast } = useToast();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button text="Add user" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new user</DialogTitle>
            <DialogDescription>Fill the form below and click on submit to create a new user.</DialogDescription>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
              <input placeholder="username" className="border" {...register("username", { required: true })} />
              <input placeholder="email" className="border" {...register("email", { required: true })} />
              <input placeholder="password" className="border" {...register("password", { required: true })} />
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
