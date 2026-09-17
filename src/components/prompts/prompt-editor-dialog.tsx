"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Prompt } from "@/types/prompts";
import { createPromptSchema, type CreatePromptValues } from "@/lib/validators";
import { promptCategories } from "@/data/prompts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PromptEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: Prompt | null;
  onSave: (values: CreatePromptValues) => void;
}

export function PromptEditorDialog({ open, onOpenChange, prompt, onSave }: PromptEditorDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreatePromptValues>({
    resolver: zodResolver(createPromptSchema),
    defaultValues: { title: "", description: "", category: "productivity", content: "" },
  });

  React.useEffect(() => {
    if (open) {
      reset(
        prompt
          ? { title: prompt.title, description: prompt.description, category: prompt.category, content: prompt.content }
          : { title: "", description: "", category: "productivity", content: "" }
      );
    }
  }, [open, prompt, reset]);

  function onSubmit(values: CreatePromptValues) {
    onSave(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{prompt ? "Edit prompt" : "Create prompt"}</DialogTitle>
          <DialogDescription>
            Use double curly braces like <code>{"{{variable}}"}</code> to define reusable variables.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField label="Title" htmlFor="prompt-title" error={errors.title?.message} required>
            <Input {...register("title")} placeholder="e.g. Product launch announcement" />
          </FormField>

          <FormField label="Description" htmlFor="prompt-description" error={errors.description?.message} required>
            <Input {...register("description")} placeholder="A short summary of what this prompt does" />
          </FormField>

          <FormField label="Category" htmlFor="prompt-category" error={errors.category?.message} required>
            <Select value={watch("category")} onValueChange={(value) => setValue("category", value as CreatePromptValues["category"])}>
              <SelectTrigger id="prompt-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {promptCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Prompt content" htmlFor="prompt-content" error={errors.content?.message} required>
            <Textarea {...register("content")} placeholder="Write your prompt template…" className="min-h-32" />
          </FormField>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {prompt ? "Save changes" : "Create prompt"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
