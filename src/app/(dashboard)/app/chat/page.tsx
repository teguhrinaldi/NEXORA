import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ChatWorkspace } from "@/components/chat/chat-workspace";

export const metadata: Metadata = {
  title: "Chat",
};

export default function ChatPage() {
  return (
    <>
      <PageHeader title="Chat" description="Have an ongoing conversation with your AI workspace." />
      <ChatWorkspace />
    </>
  );
}
