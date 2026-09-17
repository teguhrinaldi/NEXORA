"use client";

import { Plus } from "lucide-react";

import type { Automation, AutomationNode, AutomationNodeType } from "@/types/automations";
import { WorkflowNodeCard } from "@/components/automations/workflow-node-card";
import { nodeTypeMeta } from "@/components/automations/node-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { generateId } from "@/lib/id";

interface WorkflowCanvasProps {
  automation: Automation;
  onChange: (automation: Automation) => void;
}

const nodeTypes: AutomationNodeType[] = ["action", "condition", "output"];

export function WorkflowCanvas({ automation, onChange }: WorkflowCanvasProps) {
  function updateNode(index: number, node: AutomationNode) {
    const nodes = [...automation.nodes];
    nodes[index] = node;
    onChange({ ...automation, nodes });
  }

  function removeNode(index: number) {
    const nodes = automation.nodes.filter((_, i) => i !== index);
    onChange({ ...automation, nodes });
  }

  function addNode(type: AutomationNodeType) {
    const meta = nodeTypeMeta[type];
    const newNode: AutomationNode = {
      id: generateId("node"),
      type,
      title: `New ${meta.label.toLowerCase()}`,
      description: "Describe what this step does.",
    };
    onChange({ ...automation, nodes: [...automation.nodes, newNode] });
  }

  return (
    <div className="flex flex-col">
      {automation.nodes.map((node, index) => (
        <WorkflowNodeCard
          key={node.id}
          node={node}
          index={index}
          onChange={(updated) => updateNode(index, updated)}
          onRemove={() => removeNode(index)}
          removable={node.type !== "trigger"}
        />
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-[52px] w-fit gap-2">
            <Plus className="size-3.5" />
            Add step
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {nodeTypes.map((type) => {
            const meta = nodeTypeMeta[type];
            return (
              <DropdownMenuItem key={type} onSelect={() => addNode(type)}>
                <meta.icon className="size-3.5" />
                {meta.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
