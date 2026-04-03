"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type SidebarNavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  active?: boolean;
};

export type SidebarSection = {
  title?: string;
  items: SidebarNavItem[];
};

export type CalSidebarProps = {
  header: React.ReactNode;
  sections: SidebarSection[];
  footer?: React.ReactNode;
  activeHref?: string;
  onNavigate?: (href: string) => void;
};

export function CalSidebar({
  header,
  sections,
  footer,
  activeHref,
  onNavigate,
}: CalSidebarProps) {
  return (
    <aside className="bg-cal-bg-muted border-r border-cal-border-subtle fixed left-0 top-0 hidden h-screen w-14 flex-col overflow-y-auto overflow-x-hidden md:flex lg:w-56 lg:px-3">
      <div className="flex h-full flex-col justify-between py-3 lg:pt-4">
        <div>
          <div className="mb-4 hidden px-1.5 lg:block">{header}</div>
          <div className="flex flex-col items-center px-1 lg:hidden">{header}</div>
          <nav className="flex flex-col gap-0.5">
            {sections.map((section, si) => (
              <div key={si}>
                {section.title && (
                  <p className="mb-1 mt-4 hidden px-2 text-xs font-medium uppercase tracking-wider text-cal-text-muted lg:block">
                    {section.title}
                  </p>
                )}
                {section.items.map((item) => {
                  const isActive = activeHref === item.href;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => onNavigate?.(item.href)}
                      className={cn(
                        "group flex w-full items-center rounded-md px-2 py-1.5 text-sm font-medium transition",
                        isActive
                          ? "bg-cal-bg-emphasis text-cal-text-emphasis"
                          : "text-cal-text hover:bg-cal-bg-subtle hover:text-cal-text-emphasis"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          "md:mx-auto lg:mx-0 lg:mr-2"
                        )}
                      />
                      <span className="hidden lg:inline-flex flex-1 justify-between">
                        {item.name}
                        {item.badge && (
                          <span className="ml-2 rounded-full bg-cal-brand px-1.5 py-0.5 text-[10px] font-semibold text-cal-brand-text">
                            {item.badge}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>
        {footer && <div className="mt-auto pt-4">{footer}</div>}
      </div>
    </aside>
  );
}
