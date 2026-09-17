import { Files, Trash2, Pencil } from "lucide-react";

import type { Automation } from "@/types/automations";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/formatters";

interface AutomationCardProps {
  automation: Automation;
  onToggle: (id: string, enabled: boolean) => void;
  onEdit: (automation: Automation) => void;
  onDuplicate: (id: string) => void;
  onDelete: (automation: Automation) => void;
}

export function AutomationCard({ automation, onToggle, onEdit, onDuplicate, onDelete }: AutomationCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <button type="button" onClick={() => onEdit(automation)} className="text-left text-sm font-semibold text-foreground hover:text-accent">
              {automation.name}
            </button>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{automation.description}</p>
          </div>
          <Switch
            checked={automation.enabled}
            onCheckedChange={(checked) => onToggle(automation.id, checked)}
            aria-label={`${automation.enabled ? "Disable" : "Enable"} ${automation.name}`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={automation.successRate >= 95 ? "success" : "warning"}>{automation.successRate}% success</Badge>
          <span className="text-xs text-muted-foreground">{automation.nodes.length} steps</span>
          <span className="text-xs text-muted-foreground">· Updated {formatRelativeTime(automation.updatedAt)}</span>
        </div>

        <div className="flex gap-2 border-t border-border pt-3">
          <Button size="sm" variant="secondary" onClick={() => onEdit(automation)} className="gap-1.5">
            <Pencil className="size-3.5" />
            Edit
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDuplicate(automation.id)} aria-label="Duplicate workflow">
            <Files className="size-3.5" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDelete(automation)} aria-label="Delete workflow">
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
