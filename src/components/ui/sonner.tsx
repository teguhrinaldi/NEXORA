"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-surface-raised! border-border-strong! text-foreground! shadow-2xl! rounded-lg!",
          description: "text-muted-foreground!",
          actionButton: "bg-accent! text-accent-foreground!",
          cancelButton: "bg-surface-soft! text-muted-foreground!",
          success: "[&_svg]:text-success!",
          error: "[&_svg]:text-danger!",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
