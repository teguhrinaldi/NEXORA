"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { profileSchema, type ProfileValues } from "@/lib/validators";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const timezones = ["UTC", "America/New_York", "America/Los_Angeles", "Europe/London", "Asia/Jakarta", "Asia/Tokyo"];
const languages = ["English", "Spanish", "French", "German", "Indonesian", "Japanese"];

export function ProfileForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Maya Chen",
      email: "maya@northlight.co",
      role: "Product Marketing Lead",
      timezone: "America/New_York",
      language: "English",
    },
  });

  function onSubmit() {
    toast("Profile updated", { description: "Your changes have been saved." });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your personal information.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback style={{ background: "var(--color-lime)", color: "var(--color-lime-ink)" }} className="text-lg">
                MC
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => toast("Avatar updated")}>
                Upload photo
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => toast("Avatar removed")}>
                Remove
              </Button>
            </div>
          </div>

          <FormField label="Full name" htmlFor="profile-name" error={errors.name?.message} required>
            <Input {...register("name")} />
          </FormField>

          <FormField label="Email address" htmlFor="profile-email" error={errors.email?.message} required>
            <Input {...register("email")} type="email" />
          </FormField>

          <FormField label="Role" htmlFor="profile-role" hint="Shown to your teammates">
            <Input {...register("role")} />
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Timezone" htmlFor="profile-timezone" error={errors.timezone?.message} required>
              <Select value={watch("timezone")} onValueChange={(value) => setValue("timezone", value)}>
                <SelectTrigger id="profile-timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Language" htmlFor="profile-language" error={errors.language?.message} required>
              <Select value={watch("language")} onValueChange={(value) => setValue("language", value)}>
                <SelectTrigger id="profile-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

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
