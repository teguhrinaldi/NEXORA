"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function DangerZoneCard() {
  const [open, setOpen] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  const { toast } = useToast();

  function handleDelete() {
    toast("Workspace deletion requested", { description: "This is a demonstration — no data was actually deleted." });
    setOpen(false);
    setConfirmText("");
  }

  return (
    <Card className="border-danger/30">
      <CardHeader>
        <CardTitle className="text-danger">Danger zone</CardTitle>
        <CardDescription>Deleting your workspace removes all documents, prompts, and automations permanently.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete workspace
        </Button>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this workspace?</DialogTitle>
            <DialogDescription>
              This action is permanent. Type <strong>delete</strong> to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirm-delete">Confirmation</Label>
            <Input id="confirm-delete" value={confirmText} onChange={(event) => setConfirmText(event.target.value)} placeholder="delete" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" disabled={confirmText.toLowerCase() !== "delete"} onClick={handleDelete}>
              Delete workspace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
