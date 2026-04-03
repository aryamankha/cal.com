import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System | Cal.com",
  description: "Cal.com design system documentation - colors, typography, spacing, components, and shadows",
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
