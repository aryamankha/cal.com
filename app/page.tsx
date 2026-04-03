"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Settings,
  Link as LinkIcon,
  Video,
  BarChart3,
  Bell,
  Plus,
  Search,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Globe,
  Zap,
} from "lucide-react";
import {
  CalButton,
  CalBadge,
  CalAvatar,
  CalSidebar,
  CalCard,
  CalCardHeader,
  CalCardTitle,
  CalCardDescription,
  CalCardContent,
  CalInput,
  CalEmptyScreen,
} from "@/components/cal";
import type { SidebarSection } from "@/components/cal";

const navSections: SidebarSection[] = [
  {
    items: [
      { name: "Event Types", href: "/event-types", icon: LinkIcon },
      { name: "Bookings", href: "/bookings", icon: Calendar, badge: "3" },
      { name: "Availability", href: "/availability", icon: Clock },
      { name: "Teams", href: "/teams", icon: Users },
    ],
  },
  {
    title: "Insights",
    items: [
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
      { name: "Workflows", href: "/workflows", icon: Zap },
    ],
  },
  {
    title: "Admin",
    items: [
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

const eventTypes = [
  {
    id: 1,
    title: "15 Min Meeting",
    slug: "/user/15min",
    duration: "15m",
    link: "cal.com/user/15min",
    active: true,
  },
  {
    id: 2,
    title: "30 Min Meeting",
    slug: "/user/30min",
    duration: "30m",
    link: "cal.com/user/30min",
    active: true,
  },
  {
    id: 3,
    title: "Discovery Call",
    slug: "/user/discovery",
    duration: "45m",
    link: "cal.com/user/discovery",
    active: false,
  },
  {
    id: 4,
    title: "Team Standup",
    slug: "/user/standup",
    duration: "15m",
    link: "cal.com/user/standup",
    active: true,
  },
];

const upcomingBookings = [
  {
    id: 1,
    title: "30 Min Meeting",
    attendee: "Sarah Chen",
    date: "Apr 4, 2026",
    time: "10:00 AM",
    status: "confirmed" as const,
  },
  {
    id: 2,
    title: "Discovery Call",
    attendee: "Alex Rivera",
    date: "Apr 4, 2026",
    time: "2:00 PM",
    status: "confirmed" as const,
  },
  {
    id: 3,
    title: "15 Min Meeting",
    attendee: "Jordan Lee",
    date: "Apr 5, 2026",
    time: "9:30 AM",
    status: "pending" as const,
  },
];

export default function DashboardPage() {
  const [activeHref, setActiveHref] = useState("/event-types");

  return (
    <div className="flex min-h-screen">
      <CalSidebar
        activeHref={activeHref}
        onNavigate={setActiveHref}
        header={
          <div className="flex items-center gap-2">
            <CalAvatar fallback="AC" size="sm" />
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-cal-text-emphasis truncate">
                Acme Corp
              </p>
              <p className="text-xs text-cal-text-muted">Pro Plan</p>
            </div>
          </div>
        }
        sections={navSections}
        footer={
          <div className="hidden lg:block px-2 pb-2">
            <p className="text-[10px] text-cal-text-muted text-center">
              Powered by Cal.com
            </p>
          </div>
        }
      />

      {/* Main content area */}
      <main className="flex-1 md:ml-14 lg:ml-56">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-cal-border-subtle bg-cal-bg px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <h1 className="font-cal text-xl font-semibold tracking-wide text-cal-text-emphasis">
              Event Types
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cal-text-muted" />
              <CalInput
                placeholder="Search..."
                className="pl-8 w-56"
              />
            </div>
            <CalButton variant="secondary" size="sm">
              <Bell className="h-4 w-4" />
            </CalButton>
            <CalButton size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New</span>
            </CalButton>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats row */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Upcoming"
              value="12"
              change="+3 this week"
              icon={Calendar}
            />
            <StatCard
              label="Completed"
              value="48"
              change="+8 from last month"
              icon={Clock}
            />
            <StatCard
              label="Attendees"
              value="156"
              change="23 new"
              icon={Users}
            />
            <StatCard
              label="Avg. Duration"
              value="26m"
              change="-2m vs last week"
              icon={Video}
            />
          </div>

          {/* Event Types list */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-cal text-lg font-semibold text-cal-text-emphasis">
                Your Event Types
              </h2>
              <CalButton variant="minimal" size="sm">
                View all
              </CalButton>
            </div>
            <div className="overflow-hidden rounded-xl border border-cal-border-subtle bg-cal-bg">
              {eventTypes.map((event, i) => (
                <div
                  key={event.id}
                  className={`flex items-center justify-between px-5 py-4 ${
                    i !== eventTypes.length - 1
                      ? "border-b border-cal-border-subtle"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        event.active ? "bg-green-500" : "bg-cal-text-muted"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-cal-text-emphasis">
                        {event.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-cal-text-subtle">
                        <Globe className="h-3 w-3" />
                        <span>{event.link}</span>
                        <span className="text-cal-text-muted">|</span>
                        <Clock className="h-3 w-3" />
                        <span>{event.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalBadge variant={event.active ? "success" : "gray"}>
                      {event.active ? "Active" : "Draft"}
                    </CalBadge>
                    <CalButton variant="minimal" size="xs">
                      <Copy className="h-3.5 w-3.5" />
                    </CalButton>
                    <CalButton variant="minimal" size="xs">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </CalButton>
                    <CalButton variant="minimal" size="xs">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </CalButton>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Upcoming Bookings */}
            <CalCard>
              <CalCardHeader>
                <div className="flex items-center justify-between">
                  <CalCardTitle>Upcoming Bookings</CalCardTitle>
                  <CalBadge variant="blue">{upcomingBookings.length} upcoming</CalBadge>
                </div>
                <CalCardDescription>
                  {"Your next scheduled meetings"}
                </CalCardDescription>
              </CalCardHeader>
              <CalCardContent>
                <div className="flex flex-col gap-3">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center gap-3 rounded-lg border border-cal-border-subtle p-3 transition hover:bg-cal-bg-subtle"
                    >
                      <CalAvatar fallback={booking.attendee} size="md" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-cal-text-emphasis truncate">
                          {booking.title}
                        </p>
                        <p className="text-xs text-cal-text-subtle">
                          {booking.attendee} &middot; {booking.date} at{" "}
                          {booking.time}
                        </p>
                      </div>
                      <CalBadge
                        variant={
                          booking.status === "confirmed" ? "success" : "warning"
                        }
                        size="sm"
                      >
                        {booking.status}
                      </CalBadge>
                    </div>
                  ))}
                </div>
              </CalCardContent>
            </CalCard>

            {/* Quick Actions / Empty State Demo */}
            <CalCard>
              <CalCardHeader>
                <CalCardTitle>Workflows</CalCardTitle>
                <CalCardDescription>
                  Automate actions before and after meetings
                </CalCardDescription>
              </CalCardHeader>
              <CalCardContent>
                <CalEmptyScreen
                  icon={Zap}
                  headline="No workflows yet"
                  description="Create automated workflows to send reminders, follow-ups, and more."
                >
                  <CalButton size="sm">
                    <Plus className="h-4 w-4" />
                    Create Workflow
                  </CalButton>
                </CalEmptyScreen>
              </CalCardContent>
            </CalCard>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <CalCard className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cal-bg-subtle">
        <Icon className="h-5 w-5 text-cal-text-subtle" />
      </div>
      <div>
        <p className="text-xs font-medium text-cal-text-subtle">{label}</p>
        <p className="mt-0.5 text-2xl font-semibold text-cal-text-emphasis">
          {value}
        </p>
        <p className="mt-0.5 text-xs text-cal-text-muted">{change}</p>
      </div>
    </CalCard>
  );
}
