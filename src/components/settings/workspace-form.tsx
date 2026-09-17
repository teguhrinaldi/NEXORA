"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { workspaceSchema, type WorkspaceValues } from "@/lib/validators";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function WorkspaceForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkspaceValues>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      workspaceName: "Northlight",
      workspaceUrl: "northlight",
      description: "Marketing and product team workspace for Northlight Studio.",
    },
  });

  function onSubmit() {
    toast("Workspace updated", { description: "Your changes have been saved." });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace</CardTitle>
        <CardDescription>General information about this workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FormField label="Workspace name" htmlFor="workspace-name" error={errors.workspaceName?.message} required>
            <Input {...register("workspaceName")} />
          </FormField>

          <FormField
            label="Workspace URL"
            htmlFor="workspace-url"
            error={errors.workspaceUrl?.message}
            hint="nexora.app/w/your-url"
            required
          >
            <Input {...register("workspaceUrl")} />
          </FormField>

          <FormField label="Description" htmlFor="workspace-description" error={errors.description?.message}>
            <Textarea {...register("description")} className="min-h-24" />
          </FormField>

          <div>
            <Button type="submit" loading={isSubmitting}>
              Save changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
