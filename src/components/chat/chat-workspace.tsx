"use client";

import * as React from "react";

import type { Conversation, ConversationMessage } from "@/types/ai";
import { ConversationList } from "@/components/chat/conversation-list";
import { ChatThread } from "@/components/chat/chat-thread";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MessagesSquare } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { conversations as seedConversations } from "@/data/conversations";
import { generateAiResponse } from "@/lib/ai/mock-ai-service";
import { generateId } from "@/lib/id";

export function ChatWorkspace() {
  const [conversations, setConversations] = useLocalStorage<Conversation[]>("nexora:conversations", seedConversations);
  const [activeId, setActiveId] = React.useState<string | null>(seedConversations[0]?.id ?? null);
  const [showArchived, setShowArchived] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [renameTarget, setRenameTarget] = React.useState<Conversation | null>(null);
  const [renameValue, setRenameValue] = React.useState("");
  const [deleteTarget, setDeleteTarget] = React.useState<Conversation | null>(null);
  const [mobileListOpen, setMobileListOpen] = React.useState(false);
  const { toast } = useToast();

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;

  function handleNew() {
    const newConversation: Conversation = {
      id: generateId("conv"),
      title: "New conversation",
      preview: "",
      messages: [],
      archived: false,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveId(newConversation.id);
    setShowArchived(false);
    setError(false);
  }

  async function sendToConversation(conversationId: string, content: string) {
    const userMessage: ConversationMessage = {
      id: generateId("msg"),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: [...c.messages, userMessage],
              title: c.title === "New conversation" ? content.slice(0, 40) : c.title,
              preview: content,
              updatedAt: new Date().toISOString(),
            }
          : c
      )
    );

    setSending(true);
    setError(false);

    const willFail = Math.random() < 0.08;

    try {
      if (willFail) throw new Error("simulated failure");
      const result = await generateAiResponse({
        mode: "chat",
        prompt: content,
        model: "nexora-core",
        tone: "neutral",
        length: "medium",
        language: "english",
      });

      const assistantMessage: ConversationMessage = {
        id: generateId("msg"),
        role: "assistant",
        content: result.output,
        createdAt: new Date().toISOString(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? { ...c, messages: [...c.messages, assistantMessage], updatedAt: new Date().toISOString() }
            : c
        )
      );
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  function handleSend(content: string) {
    if (!activeConversation) return;
    void sendToConversation(activeConversation.id, content);
  }

  function handleRegenerate() {
    if (!activeConversation) return;
    const lastUser = [...activeConversation.messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? { ...c, messages: c.messages.slice(0, -1) }
          : c
      )
    );
    void sendToConversation(activeConversation.id, lastUser.content);
  }

  function handleRetry() {
    if (!activeConversation) return;
    const lastUser = [...activeConversation.messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    void sendToConversation(activeConversation.id, lastUser.content);
  }

  function openRename(id: string) {
    const target = conversations.find((c) => c.id === id);
    if (!target) return;
    setRenameTarget(target);
    setRenameValue(target.title);
  }

  function confirmRename() {
    if (!renameTarget) return;
    setConversations((prev) => prev.map((c) => (c.id === renameTarget.id ? { ...c, title: renameValue.trim() || c.title } : c)));
    toast("Conversation renamed");
    setRenameTarget(null);
  }

  function handleArchive(id: string) {
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, archived: !c.archived } : c)));
    const target = conversations.find((c) => c.id === id);
    toast(target?.archived ? "Conversation unarchived" : "Conversation archived");
  }

  function openDelete(id: string) {
    const target = conversations.find((c) => c.id === id);
    if (target) setDeleteTarget(target);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setConversations((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    if (activeId === deleteTarget.id) setActiveId(null);
    toast("Conversation deleted");
    setDeleteTarget(null);
  }

  const conversationListProps = {
    conversations,
    activeId,
    showArchived,
    onToggleArchived: setShowArchived,
    onSelect: (id: string) => {
      setActiveId(id);
      setError(false);
      setMobileListOpen(false);
    },
    onNew: () => {
      handleNew();
      setMobileListOpen(false);
    },
    onRename: openRename,
    onArchive: handleArchive,
    onDelete: openDelete,
  };

  return (
    <div className="grid h-[calc(100dvh-11rem)] min-h-120 grid-cols-1 overflow-hidden rounded-lg border border-border md:grid-cols-[300px_1fr]">
      <div className="hidden border-r border-border md:block">
        <ConversationList {...conversationListProps} />
      </div>

      <div className="flex items-center justify-between border-b border-border px-3 py-2 md:hidden">
        <Button variant="outline" size="sm" onClick={() => setMobileListOpen(true)} className="gap-2">
          <MessagesSquare className="size-3.5" />
          Conversations
        </Button>
      </div>

      <Sheet open={mobileListOpen} onOpenChange={setMobileListOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <VisuallyHidden>
            <SheetTitle>Conversations</SheetTitle>
          </VisuallyHidden>
          <ConversationList {...conversationListProps} />
        </SheetContent>
      </Sheet>

      <div className="min-w-0">
        <ChatThread
          conversation={activeConversation}
          sending={sending}
          error={error}
          onSend={handleSend}
          onRegenerate={handleRegenerate}
          onRetry={handleRetry}
        />
      </div>

      <Dialog open={!!renameTarget} onOpenChange={(open) => !open && setRenameTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename conversation</DialogTitle>
            <DialogDescription>Choose a new name for this conversation.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="rename-input">Conversation name</Label>
            <Input id="rename-input" value={renameValue} onChange={(event) => setRenameValue(event.target.value)} autoFocus />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameTarget(null)}>
              Cancel
            </Button>
            <Button onClick={confirmRename}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete conversation?</DialogTitle>
            <DialogDescription>
              This will permanently delete &quot;{deleteTarget?.title}&quot;. This action cannot be undone.
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
