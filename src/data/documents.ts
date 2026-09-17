import type { Document, DocumentFolder } from "@/types/documents";

export const documentFolders: { id: DocumentFolder; label: string }[] = [
  { id: "all", label: "All documents" },
  { id: "drafts", label: "Drafts" },
  { id: "marketing", label: "Marketing" },
  { id: "product", label: "Product" },
  { id: "research", label: "Research" },
  { id: "shared", label: "Shared with me" },
];

export const documents: Document[] = [
  {
    id: "doc-001",
    title: "Q4 Positioning Narrative",
    content:
      "NEXORA enters Q4 with a clearer story: intelligence that stays out of the way until you need it. This document lays out the narrative for the quarter, the proof points we lead with, and the objections we pre-empt.\n\nOur audience doesn't want another chatbot. They want a workspace that already understands the shape of their work.",
    folder: "marketing",
    wordCount: 812,
    lastEditedBy: "Maya Chen",
    updatedAt: "2026-09-14T09:30:00.000Z",
    createdAt: "2026-08-01T09:30:00.000Z",
    history: [
      { id: "v3", label: "Refined proof points", editedAt: "2026-09-14T09:30:00.000Z", editedBy: "Maya Chen" },
      { id: "v2", label: "Added competitive framing", editedAt: "2026-09-08T14:12:00.000Z", editedBy: "Theo Park" },
      { id: "v1", label: "Initial draft", editedAt: "2026-08-01T09:30:00.000Z", editedBy: "Maya Chen" },
    ],
  },
  {
    id: "doc-002",
    title: "Automation Builder — Spec v2",
    content:
      "This spec defines the second iteration of the automation builder, focused on mobile parity and execution history.\n\nGoals: allow any workflow authored on desktop to be reviewed and toggled from mobile without losing fidelity.",
    folder: "product",
    wordCount: 1420,
    lastEditedBy: "Theo Park",
    updatedAt: "2026-09-12T16:45:00.000Z",
    createdAt: "2026-07-19T11:00:00.000Z",
    history: [
      { id: "v2", label: "Added mobile requirements", editedAt: "2026-09-12T16:45:00.000Z", editedBy: "Theo Park" },
      { id: "v1", label: "Initial draft", editedAt: "2026-07-19T11:00:00.000Z", editedBy: "Theo Park" },
    ],
  },
  {
    id: "doc-003",
    title: "Customer Interview — Northwind",
    content:
      "Notes from a 45-minute conversation with Northwind's ops lead. They currently stitch together three tools to summarize weekly reports and want one workspace that handles drafting, review, and distribution.",
    folder: "research",
    wordCount: 640,
    lastEditedBy: "Priya Nair",
    updatedAt: "2026-09-10T08:15:00.000Z",
    createdAt: "2026-09-10T08:15:00.000Z",
    history: [{ id: "v1", label: "Initial notes", editedAt: "2026-09-10T08:15:00.000Z", editedBy: "Priya Nair" }],
  },
  {
    id: "doc-004",
    title: "Onboarding Email Sequence",
    content:
      "Draft sequence for new workspace activation. Email 1 sends immediately after signup and focuses on the first meaningful action: generating a first AI Studio output.",
    folder: "drafts",
    wordCount: 390,
    lastEditedBy: "Maya Chen",
    updatedAt: "2026-09-13T13:00:00.000Z",
    createdAt: "2026-09-11T10:00:00.000Z",
    history: [{ id: "v1", label: "Initial draft", editedAt: "2026-09-11T10:00:00.000Z", editedBy: "Maya Chen" }],
  },
  {
    id: "doc-005",
    title: "Shared Brand Voice Guide",
    content:
      "NEXORA writes with restraint. Short sentences. No exclamation points unless truly earned. We describe what the product does rather than how amazing it is.",
    folder: "shared",
    wordCount: 512,
    lastEditedBy: "Diego Alvarez",
    updatedAt: "2026-08-28T09:00:00.000Z",
    createdAt: "2026-06-02T09:00:00.000Z",
    history: [
      { id: "v2", label: "Added tone examples", editedAt: "2026-08-28T09:00:00.000Z", editedBy: "Diego Alvarez" },
      { id: "v1", label: "Initial draft", editedAt: "2026-06-02T09:00:00.000Z", editedBy: "Diego Alvarez" },
    ],
  },
  {
    id: "doc-006",
    title: "Pricing Page Copy Revision",
    content:
      "Revised copy for the three-tier pricing table. Leading with outcomes rather than feature counts, and clarifying what happens at the credit limit.",
    folder: "marketing",
    wordCount: 275,
    lastEditedBy: "Maya Chen",
    updatedAt: "2026-09-05T15:20:00.000Z",
    createdAt: "2026-09-01T15:20:00.000Z",
    history: [{ id: "v1", label: "Initial draft", editedAt: "2026-09-01T15:20:00.000Z", editedBy: "Maya Chen" }],
  },
];
