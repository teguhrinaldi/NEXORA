import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  Sparkles,
  MessagesSquare,
  FileText,
  BookMarked,
  Workflow,
  History,
  BarChart3,
  CreditCard,
  Users,
  KeyRound,
  Bell,
  HelpCircle,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const workspaceNav: NavGroup = {
  label: "Workspace",
  items: [
    { label: "Overview", href: "/app/overview", icon: LayoutGrid },
    { label: "AI Studio", href: "/app/ai-studio", icon: Sparkles },
    { label: "Chat", href: "/app/chat", icon: MessagesSquare },
    { label: "Documents", href: "/app/documents", icon: FileText },
    { label: "Prompt Library", href: "/app/prompts", icon: BookMarked },
    { label: "Automations", href: "/app/automations", icon: Workflow },
    { label: "History", href: "/app/history", icon: History },
  ],
};

export const managementNav: NavGroup = {
  label: "Management",
  items: [
    { label: "Usage", href: "/app/usage", icon: BarChart3 },
    { label: "Billing", href: "/app/billing", icon: CreditCard },
    { label: "Team", href: "/app/team", icon: Users },
    { label: "API Keys", href: "/app/api-keys", icon: KeyRound },
  ],
};

export const supportNav: NavGroup = {
  label: "Support",
  items: [
    { label: "Notifications", href: "/app/notifications", icon: Bell },
    { label: "Help Center", href: "/app/help", icon: HelpCircle },
  ],
};

export const settingsNavItem: NavItem = {
  label: "Settings",
  href: "/app/settings",
  icon: Settings,
};

export const sidebarNav: NavGroup[] = [workspaceNav, managementNav, supportNav];

export interface SettingsNavItem {
  label: string;
  href: string;
}

export const settingsNav: SettingsNavItem[] = [
  { label: "Profile", href: "/app/settings/profile" },
  { label: "Workspace", href: "/app/settings/workspace" },
  { label: "Security", href: "/app/settings/security" },
  { label: "Notifications", href: "/app/settings/notifications" },
];

export interface MarketingNavItem {
  label: string;
  href: string;
}

export const marketingNav: MarketingNavItem[] = [
  { label: "Product", href: "/#product" },
  { label: "AI Studio", href: "/#ai-studio" },
  { label: "Automations", href: "/#automations" },
  { label: "Pricing", href: "/pricing" },
];
