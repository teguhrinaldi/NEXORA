"use client";

import * as React from "react";
import { FileText } from "lucide-react";

import type { Document } from "@/types/documents";
import { DocumentList } from "@/components/documents/document-list";
import { DocumentEditor } from "@/components/documents/document-editor";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { generateId } from "@/lib/id";
import { documents as seedDocuments } from "@/data/documents";

export function DocumentsWorkspace() {
  const [documents, setDocuments] = useLocalStorage<Document[]>("nexora:documents", seedDocuments);
  const [activeId, setActiveId] = React.useState<string | null>(seedDocuments[0]?.id ?? null);
  const [mobileListOpen, setMobileListOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<Document | null>(null);
  const { toast } = useToast();

  const activeDocument = documents.find((d) => d.id === activeId) ?? null;

  function handleCreate() {
    const newDocument: Document = {
      id: generateId("doc"),
      title: "Untitled document",
      content: "",
      folder: "drafts",
      wordCount: 0,
      lastEditedBy: "Maya Chen",
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      history: [{ id: "v1", label: "Document created", editedAt: new Date().toISOString(), editedBy: "Maya Chen" }],
    };
    setDocuments((prev) => [newDocument, ...prev]);
    setActiveId(newDocument.id);
    setMobileListOpen(false);
  }

  function handleChange(updated: Document) {
    setDocuments((prev) => prev.map((doc) => (doc.id === updated.id ? updated : doc)));
  }

  function handleDuplicate(document: Document) {
    const copy: Document = {
      ...document,
      id: generateId("doc"),
      title: `${document.title} (copy)`,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      history: [{ id: "v1", label: "Duplicated document", editedAt: new Date().toISOString(), editedBy: "Maya Chen" }],
    };
    setDocuments((prev) => [copy, ...prev]);
    toast("Document duplicated");
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setDocuments((prev) => prev.filter((doc) => doc.id !== deleteTarget.id));
    if (activeId === deleteTarget.id) setActiveId(null);
    toast("Document deleted");
    setDeleteTarget(null);
  }

  const listProps = {
    documents,
    activeId,
    onSelect: (id: string) => {
      setActiveId(id);
      setMobileListOpen(false);
    },
    onCreate: handleCreate,
  };

  return (
    <div className="grid h-[calc(100dvh-11rem)] min-h-120 grid-cols-1 overflow-hidden rounded-lg border border-border md:grid-cols-[300px_1fr]">
      <div className="hidden border-r border-border md:block">
        <DocumentList {...listProps} />
      </div>

      <div className="flex items-center justify-between border-b border-border px-3 py-2 md:hidden">
        <Button variant="outline" size="sm" onClick={() => setMobileListOpen(true)} className="gap-2">
          <FileText className="size-3.5" />
          Documents
        </Button>
      </div>

      <Sheet open={mobileListOpen} onOpenChange={setMobileListOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <VisuallyHidden>
            <SheetTitle>Documents</SheetTitle>
          </VisuallyHidden>
          <DocumentList {...listProps} />
        </SheetContent>
      </Sheet>

      <div className="min-w-0">
        <DocumentEditor
          document={activeDocument}
          onChange={handleChange}
          onDuplicate={handleDuplicate}
          onDelete={setDeleteTarget}
        />
      </div>

      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete document?</DialogTitle>
            <DialogDescription>
              &quot;{deleteTarget?.title}&quot; will be permanently deleted. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
