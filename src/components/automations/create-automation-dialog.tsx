"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createAutomationSchema, type CreateAutomationValues } from "@/lib/validators";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CreateAutomationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (values: CreateAutomationValues) => void;
}

export function CreateAutomationDialog({ open, onOpenChange, onCreate }: CreateAutomationDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateAutomationValues>({
    resolver: zodResolver(createAutomationSchema),
    defaultValues: { name: "", description: "" },
  });

  function onSubmit(values: CreateAutomationValues) {
    onCreate(values);
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New workflow</DialogTitle>
          <DialogDescription>Start from a trigger and build out your automation.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField label="Workflow name" htmlFor="new-automation-name" error={errors.name?.message} required>
            <Input {...register("name")} placeholder="e.g. Weekly digest" />
          </FormField>
          <FormField label="Description" htmlFor="new-automation-description" error={errors.description?.message} required>
            <Textarea {...register("description")} placeholder="What does this workflow do?" />
          </FormField>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Create workflow
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
