export type DocumentFolder =
  | "all"
  | "drafts"
  | "marketing"
  | "product"
  | "research"
  | "shared";

export interface DocumentVersion {
  id: string;
  label: string;
  editedAt: string;
  editedBy: string;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  folder: DocumentFolder;
  wordCount: number;
  lastEditedBy: string;
  updatedAt: string;
  createdAt: string;
  history: DocumentVersion[];
}
