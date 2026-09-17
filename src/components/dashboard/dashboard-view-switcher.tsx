"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardVariants } from "@/data/dashboard";
import type { DashboardVariant } from "@/types/dashboard";
import { OverviewView } from "@/components/dashboard/views/overview-view";
import { CreatorView } from "@/components/dashboard/views/creator-view";
import { TeamView } from "@/components/dashboard/views/team-view";
import { AutomationView } from "@/components/dashboard/views/automation-view";
import { AnalyticsView } from "@/components/dashboard/views/analytics-view";

const viewComponents: Record<DashboardVariant, React.ComponentType> = {
  overview: OverviewView,
  creator: CreatorView,
  team: TeamView,
  automation: AutomationView,
  analytics: AnalyticsView,
};

function isVariant(value: string | null): value is DashboardVariant {
  return dashboardVariants.some((variant) => variant.id === value);
}

export function DashboardViewSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeParam = searchParams.get("view");
  const active: DashboardVariant = isVariant(activeParam) ? activeParam : "overview";

  const ActiveView = viewComponents[active];

  return (
    <div className="flex flex-col gap-6">
      <Tabs
        value={active}
        onValueChange={(value) => {
          const params = new URLSearchParams(searchParams.toString());
          if (value === "overview") params.delete("view");
          else params.set("view", value);
          const query = params.toString();
          router.push(`/app/overview${query ? `?${query}` : ""}`, { scroll: false });
        }}
      >
        <TabsList className="w-full justify-start overflow-x-auto sm:w-fit">
          {dashboardVariants.map((variant) => (
            <TabsTrigger key={variant.id} value={variant.id}>
              {variant.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <ActiveView />
    </div>
  );
}
