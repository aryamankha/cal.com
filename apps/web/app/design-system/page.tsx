"use client";

import { useState } from "react";
import classNames from "classnames";

const colorTokens = {
  background: {
    standard: [
      { name: "--cal-bg-emphasis", light: "hsla(220, 13%, 91%, 1)", dark: "hsla(0, 0%, 25%, 1)", desc: "Emphasis backgrounds" },
      { name: "--cal-bg", light: "hsla(0, 0%, 100%, 1)", dark: "hsla(0, 0%, 6%, 1)", desc: "Default backgrounds" },
      { name: "--cal-bg-subtle", light: "hsla(220, 14%, 94%, 1)", dark: "hsla(0, 0%, 15%, 1)", desc: "Subtle backgrounds" },
      { name: "--cal-bg-muted", light: "hsla(210, 20%, 97%, 1)", dark: "hsla(0, 0%, 9%, 1)", desc: "Muted backgrounds" },
      { name: "--cal-bg-inverted", light: "hsla(210, 30%, 4%, 1)", dark: "hsla(0, 0%, 98%, 1)", desc: "Inverted backgrounds" },
    ],
    primary: [
      { name: "--cal-bg-primary", light: "hsla(214, 30%, 16%, 1)", dark: "hsla(0, 0%, 96%, 1)", desc: "Primary background" },
      { name: "--cal-bg-primary-emphasis", light: "hsla(220, 6%, 25%, 1)", dark: "hsla(0, 0%, 64%, 1)", desc: "Primary emphasis" },
      { name: "--cal-bg-primary-muted", light: "hsla(220, 14%, 94%, 1)", dark: "hsla(0, 0%, 15%, 1)", desc: "Primary muted" },
    ],
    semantic: [
      { name: "--cal-bg-semantic-info-subtle", light: "hsla(212, 88%, 97%, 1)", dark: "hsla(236, 80%, 8%, 1)", desc: "Info subtle" },
      { name: "--cal-bg-semantic-success-subtle", light: "hsla(167, 54%, 93%, 1)", dark: "hsla(148, 88%, 16%, 1)", desc: "Success subtle" },
      { name: "--cal-bg-semantic-attention-subtle", light: "hsla(34, 100%, 92%, 1)", dark: "hsla(21, 86%, 8%, 1)", desc: "Attention subtle" },
      { name: "--cal-bg-semantic-error-subtle", light: "hsla(0, 93%, 94%, 1)", dark: "hsla(0, 70%, 8%, 1)", desc: "Error subtle" },
    ],
  },
  text: {
    standard: [
      { name: "--cal-text-emphasis", light: "hsla(210, 30%, 4%, 1)", dark: "hsla(0, 0%, 98%, 1)", desc: "Emphasis text" },
      { name: "--cal-text", light: "hsla(220, 6%, 25%, 1)", dark: "hsla(0, 0%, 83%, 1)", desc: "Default text" },
      { name: "--cal-text-subtle", light: "hsla(220, 9%, 46%, 1)", dark: "hsla(0, 0%, 64%, 1)", desc: "Subtle text" },
      { name: "--cal-text-muted", light: "hsla(218, 11%, 65%, 1)", dark: "hsla(0, 0%, 64%, 1)", desc: "Muted text" },
      { name: "--cal-text-inverted", light: "hsla(0, 0%, 100%, 1)", dark: "hsla(0, 0%, 0%, 1)", desc: "Inverted text" },
    ],
    semantic: [
      { name: "--cal-text-semantic-info", light: "hsla(236, 80%, 25%, 1)", dark: "hsla(229, 90%, 74%, 1)", desc: "Info text" },
      { name: "--cal-text-semantic-success", light: "hsla(150, 84%, 22%, 1)", dark: "hsla(161, 49%, 54%, 1)", desc: "Success text" },
      { name: "--cal-text-semantic-attention", light: "hsla(15, 79%, 34%, 1)", dark: "hsla(27, 96%, 61%, 1)", desc: "Attention text" },
      { name: "--cal-text-semantic-error", light: "hsla(0, 63%, 24%, 1)", dark: "hsla(0, 91%, 71%, 1)", desc: "Error text" },
    ],
  },
  border: [
    { name: "--cal-border-emphasis", light: "hsla(218, 11%, 65%, 1)", dark: "hsla(0, 0%, 45%, 1)", desc: "Emphasis border" },
    { name: "--cal-border", light: "hsla(216, 12%, 84%, 1)", dark: "hsla(0, 0%, 30%, 1)", desc: "Default border" },
    { name: "--cal-border-subtle", light: "hsla(220, 13%, 91%, 1)", dark: "hsla(0, 0%, 15%, 1)", desc: "Subtle border" },
    { name: "--cal-border-muted", light: "hsla(220, 14%, 94%, 1)", dark: "hsla(0, 0%, 9%, 1)", desc: "Muted border" },
  ],
  brand: [
    { name: "--cal-brand", light: "hsla(221, 39%, 11%, 1)", dark: "hsla(0, 0%, 100%, 1)", desc: "Brand color" },
    { name: "--cal-brand-emphasis", light: "hsla(0, 0%, 6%, 1)", dark: "hsla(218, 11%, 65%, 1)", desc: "Brand emphasis" },
    { name: "--cal-brand-text", light: "hsla(0, 0%, 100%, 1)", dark: "hsla(0, 0%, 0%, 1)", desc: "Brand text" },
  ],
};

const radiusTokens = [
  { name: "--radius-cal-none", value: "0px" },
  { name: "--radius-cal-sm", value: "0.125rem (2px)" },
  { name: "--radius-cal", value: "0.25rem (4px)" },
  { name: "--radius-cal-md", value: "0.375rem (6px)" },
  { name: "--radius-cal-lg", value: "0.5rem (8px)" },
  { name: "--radius-cal-xl", value: "0.75rem (12px)" },
  { name: "--radius-cal-2xl", value: "1rem (16px)" },
  { name: "--radius-cal-3xl", value: "1.5rem (24px)" },
  { name: "--radius-cal-full", value: "9999px" },
];

const shadowTokens = [
  { name: "--shadow-dropdown", desc: "Dropdown menus and popovers" },
  { name: "--shadow-elevation-low", desc: "Low elevation surfaces" },
  { name: "--shadow-button-solid-brand-default", desc: "Primary button resting state" },
  { name: "--shadow-button-solid-brand-hover", desc: "Primary button hover state" },
  { name: "--shadow-outline-gray-rested", desc: "Secondary button resting state" },
  { name: "--shadow-outline-gray-focused", desc: "Secondary button focus state" },
];

const buttonVariants = [
  { name: "primary", desc: "Main CTAs, important actions" },
  { name: "secondary", desc: "Secondary actions, less emphasis" },
  { name: "minimal", desc: "Tertiary actions, subtle appearance" },
  { name: "destructive", desc: "Delete, cancel, dangerous actions" },
];

const badgeVariants = [
  { name: "default/warning/orange", color: "bg-attention text-attention" },
  { name: "success/green", color: "bg-cal-success text-success" },
  { name: "gray", color: "bg-emphasis text-emphasis" },
  { name: "blue", color: "bg-cal-info text-info" },
  { name: "red/error", color: "bg-error text-error" },
];

const alertSeverities = [
  { name: "neutral", desc: "General information" },
  { name: "info", desc: "Helpful tips and guidance" },
  { name: "warning", desc: "Caution messages" },
  { name: "error", desc: "Error states and failures" },
];

export default function DesignSystemPage() {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState<"colors" | "typography" | "spacing" | "components" | "shadows">("colors");

  return (
    <div className={classNames(isDark ? "dark" : "", "min-h-screen transition-colors duration-300")}>
      <div className="bg-default min-h-screen">
        {/* Header */}
        <header className="border-subtle sticky top-0 z-50 border-b bg-default/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-cal text-2xl text-emphasis">Cal.com Design System</h1>
                <p className="text-subtle text-sm">Design tokens, patterns, and component guidelines</p>
              </div>
              <button
                onClick={() => setIsDark(!isDark)}
                className="rounded-cal-lg border border-default bg-subtle px-4 py-2 text-sm text-default transition-colors hover:bg-emphasis"
              >
                {isDark ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="border-subtle border-b">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex gap-1">
              {(["colors", "typography", "spacing", "components", "shadows"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={classNames(
                    "px-4 py-3 text-sm font-medium capitalize transition-colors",
                    activeTab === tab
                      ? "border-b-2 border-brand-default text-emphasis"
                      : "text-subtle hover:text-default"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-7xl px-6 py-12">
          {/* Colors Section */}
          {activeTab === "colors" && (
            <div className="space-y-12">
              {/* Background Colors */}
              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Background Colors</h2>
                
                <h3 className="text-sm font-medium text-subtle mb-4">Standard</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                  {colorTokens.background.standard.map((token) => (
                    <ColorSwatch key={token.name} token={token} isDark={isDark} type="bg" />
                  ))}
                </div>

                <h3 className="text-sm font-medium text-subtle mb-4">Primary</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                  {colorTokens.background.primary.map((token) => (
                    <ColorSwatch key={token.name} token={token} isDark={isDark} type="bg" />
                  ))}
                </div>

                <h3 className="text-sm font-medium text-subtle mb-4">Semantic</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {colorTokens.background.semantic.map((token) => (
                    <ColorSwatch key={token.name} token={token} isDark={isDark} type="bg" />
                  ))}
                </div>
              </section>

              {/* Text Colors */}
              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Text Colors</h2>
                
                <h3 className="text-sm font-medium text-subtle mb-4">Standard</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                  {colorTokens.text.standard.map((token) => (
                    <ColorSwatch key={token.name} token={token} isDark={isDark} type="text" />
                  ))}
                </div>

                <h3 className="text-sm font-medium text-subtle mb-4">Semantic</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {colorTokens.text.semantic.map((token) => (
                    <ColorSwatch key={token.name} token={token} isDark={isDark} type="text" />
                  ))}
                </div>
              </section>

              {/* Border Colors */}
              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Border Colors</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {colorTokens.border.map((token) => (
                    <ColorSwatch key={token.name} token={token} isDark={isDark} type="border" />
                  ))}
                </div>
              </section>

              {/* Brand Colors */}
              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Brand Colors</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {colorTokens.brand.map((token) => (
                    <ColorSwatch key={token.name} token={token} isDark={isDark} type="bg" />
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Typography Section */}
          {activeTab === "typography" && (
            <div className="space-y-12">
              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Font Families</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="border border-subtle rounded-cal-lg p-6 bg-subtle">
                    <p className="text-sm text-muted mb-2">--font-cal (Cal Sans)</p>
                    <p className="font-cal text-3xl text-emphasis">The quick brown fox jumps over the lazy dog</p>
                    <p className="text-sm text-subtle mt-4">Used for headings and display text. Semi-bold weight (600).</p>
                  </div>
                  <div className="border border-subtle rounded-cal-lg p-6 bg-subtle">
                    <p className="text-sm text-muted mb-2">--font-sans (Inter)</p>
                    <p className="font-sans text-3xl text-emphasis">The quick brown fox jumps over the lazy dog</p>
                    <p className="text-sm text-subtle mt-4">Used for body text, UI elements, and general content.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Type Scale</h2>
                <div className="space-y-6 border border-subtle rounded-cal-lg p-6 bg-subtle">
                  <div className="flex items-baseline gap-4">
                    <code className="w-20 text-xs text-muted shrink-0">text-xs</code>
                    <p className="text-xs text-default">10px / 0.625rem - Fine print, labels</p>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <code className="w-20 text-xs text-muted shrink-0">text-sm</code>
                    <p className="text-sm text-default">14px / 0.875rem - Body text, UI elements</p>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <code className="w-20 text-xs text-muted shrink-0">text-base</code>
                    <p className="text-base text-default">16px / 1rem - Default body text</p>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <code className="w-20 text-xs text-muted shrink-0">text-lg</code>
                    <p className="text-lg text-default">18px / 1.125rem - Subtitles</p>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <code className="w-20 text-xs text-muted shrink-0">text-xl</code>
                    <p className="text-xl text-default">20px / 1.25rem - Section headings</p>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <code className="w-20 text-xs text-muted shrink-0">text-2xl</code>
                    <p className="text-2xl text-default">24px / 1.5rem - Page titles</p>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <code className="w-20 text-xs text-muted shrink-0">text-3xl</code>
                    <p className="text-3xl text-default">30px / 1.875rem - Hero headings</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Text Color Hierarchy</h2>
                <div className="space-y-4 border border-subtle rounded-cal-lg p-6 bg-subtle">
                  <p className="text-emphasis font-medium">text-emphasis - Primary content, headings</p>
                  <p className="text-default">text-default - Body text, standard content</p>
                  <p className="text-subtle">text-subtle - Secondary information, descriptions</p>
                  <p className="text-muted">text-muted - Placeholders, disabled states</p>
                </div>
              </section>
            </div>
          )}

          {/* Spacing & Radius Section */}
          {activeTab === "spacing" && (
            <div className="space-y-12">
              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Border Radius</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {radiusTokens.map((radius) => (
                    <div key={radius.name} className="border border-subtle rounded-cal-lg p-4 bg-subtle">
                      <div
                        className="h-16 w-full bg-brand-default mb-3"
                        style={{
                          borderRadius:
                            radius.name === "--radius-cal-none" ? "0px" :
                            radius.name === "--radius-cal-sm" ? "0.125rem" :
                            radius.name === "--radius-cal" ? "0.25rem" :
                            radius.name === "--radius-cal-md" ? "0.375rem" :
                            radius.name === "--radius-cal-lg" ? "0.5rem" :
                            radius.name === "--radius-cal-xl" ? "0.75rem" :
                            radius.name === "--radius-cal-2xl" ? "1rem" :
                            radius.name === "--radius-cal-3xl" ? "1.5rem" :
                            "9999px"
                        }}
                      />
                      <code className="text-xs text-muted block">{radius.name}</code>
                      <p className="text-sm text-default mt-1">{radius.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Spacing Scale</h2>
                <div className="space-y-3 border border-subtle rounded-cal-lg p-6 bg-subtle">
                  {[
                    { value: "0.5", px: "2px" },
                    { value: "1", px: "4px" },
                    { value: "1.5", px: "6px" },
                    { value: "2", px: "8px" },
                    { value: "2.5", px: "10px" },
                    { value: "3", px: "12px" },
                    { value: "4", px: "16px" },
                    { value: "5", px: "20px" },
                    { value: "6", px: "24px" },
                    { value: "8", px: "32px" },
                    { value: "10", px: "40px" },
                    { value: "12", px: "48px" },
                  ].map((space) => (
                    <div key={space.value} className="flex items-center gap-4">
                      <code className="w-12 text-xs text-muted shrink-0">{space.value}</code>
                      <div
                        className="h-4 bg-brand-default rounded-cal-sm"
                        style={{ width: space.px }}
                      />
                      <span className="text-xs text-subtle">{space.px}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Components Section */}
          {activeTab === "components" && (
            <div className="space-y-12">
              {/* Buttons */}
              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Buttons</h2>
                <div className="space-y-6">
                  <div className="border border-subtle rounded-cal-lg p-6 bg-subtle">
                    <h3 className="text-sm font-medium text-subtle mb-4">Variants</h3>
                    <div className="flex flex-wrap gap-4">
                      {buttonVariants.map((variant) => (
                        <div key={variant.name} className="text-center">
                          <div
                            className={classNames(
                              "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-[10px] transition cursor-pointer mb-2",
                              variant.name === "primary" && "bg-brand-default text-brand shadow-button-solid-brand-default border border-brand-default",
                              variant.name === "secondary" && "bg-default text-default border border-default shadow-outline-gray-rested",
                              variant.name === "minimal" && "text-subtle border border-transparent hover:bg-subtle",
                              variant.name === "destructive" && "border border-default text-error shadow-outline-red-rested"
                            )}
                          >
                            {variant.name.charAt(0).toUpperCase() + variant.name.slice(1)}
                          </div>
                          <p className="text-xs text-muted max-w-32">{variant.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border border-subtle rounded-cal-lg p-6 bg-subtle">
                    <h3 className="text-sm font-medium text-subtle mb-4">Sizes</h3>
                    <div className="flex flex-wrap items-end gap-4">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center h-6 px-2 text-xs font-medium rounded-md bg-brand-default text-brand mb-2">
                          Extra Small
                        </div>
                        <p className="text-xs text-muted">xs - h-6</p>
                      </div>
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center h-7 px-2 py-1.5 text-sm font-medium rounded-[10px] bg-brand-default text-brand mb-2">
                          Small
                        </div>
                        <p className="text-xs text-muted">sm - h-7</p>
                      </div>
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center px-2.5 py-2 text-sm font-medium rounded-[10px] bg-brand-default text-brand mb-2">
                          Base
                        </div>
                        <p className="text-xs text-muted">base (default)</p>
                      </div>
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center px-3 py-2.5 text-sm font-medium rounded-[10px] bg-brand-default text-brand mb-2">
                          Large
                        </div>
                        <p className="text-xs text-muted">lg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Badges */}
              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Badges</h2>
                <div className="border border-subtle rounded-cal-lg p-6 bg-subtle">
                  <div className="flex flex-wrap gap-4">
                    {badgeVariants.map((badge) => (
                      <div key={badge.name} className="text-center">
                        <span className={classNames(
                          "inline-flex items-center justify-center rounded-[4px] px-1.5 py-1 text-xs font-medium",
                          badge.color
                        )}>
                          {badge.name.split("/")[0]}
                        </span>
                        <p className="text-xs text-muted mt-2 max-w-24">{badge.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Alerts */}
              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Alerts</h2>
                <div className="space-y-4">
                  {alertSeverities.map((severity) => (
                    <div
                      key={severity.name}
                      className={classNames(
                        "rounded-[10px] p-3",
                        severity.name === "neutral" && "bg-default border border-subtle text-default",
                        severity.name === "info" && "bg-semantic-info-subtle text-semantic-info",
                        severity.name === "warning" && "bg-semantic-attention-subtle text-semantic-attention",
                        severity.name === "error" && "bg-semantic-error-subtle text-semantic-error"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">
                          {severity.name === "neutral" && "ℹ️"}
                          {severity.name === "info" && "💡"}
                          {severity.name === "warning" && "⚠️"}
                          {severity.name === "error" && "❌"}
                        </span>
                        <div>
                          <h4 className="font-medium text-sm capitalize">{severity.name} Alert</h4>
                          <p className="text-sm opacity-90">{severity.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Cards */}
              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Cards</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="border border-subtle bg-default rounded-md p-5">
                    <h3 className="font-bold text-emphasis text-base">Basic Card</h3>
                    <p className="text-sm text-subtle mt-1">Standard card with title and description. Uses p-5 padding with bg-default.</p>
                  </div>
                  <div className="border border-subtle bg-default rounded-md p-4 hover:bg-subtle transition-colors w-80">
                    <h3 className="font-bold text-emphasis text-base">Profile Card</h3>
                    <p className="text-sm text-subtle mt-1">Hover state card, commonly used for user profiles. Fixed width with hover effect.</p>
                  </div>
                </div>
              </section>

              {/* Inputs */}
              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Form Inputs</h2>
                <div className="border border-subtle rounded-cal-lg p-6 bg-subtle space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-emphasis mb-1.5">Text Input</label>
                    <input
                      type="text"
                      placeholder="Enter text..."
                      className="w-full rounded-md border border-default bg-default px-3 py-2 text-sm text-default placeholder:text-muted focus:border-brand-default focus:outline-none focus:ring-1 focus:ring-brand-default"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emphasis mb-1.5">Disabled Input</label>
                    <input
                      type="text"
                      placeholder="Disabled..."
                      disabled
                      className="w-full rounded-md border border-default bg-muted px-3 py-2 text-sm text-muted cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emphasis mb-1.5">Textarea</label>
                    <textarea
                      placeholder="Enter longer text..."
                      rows={3}
                      className="w-full rounded-md border border-default bg-default px-3 py-2 text-sm text-default placeholder:text-muted focus:border-brand-default focus:outline-none focus:ring-1 focus:ring-brand-default min-h-[80px]"
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Shadows Section */}
          {activeTab === "shadows" && (
            <div className="space-y-12">
              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Box Shadows</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {shadowTokens.map((shadow) => (
                    <div key={shadow.name} className="border border-subtle rounded-cal-lg p-4 bg-subtle">
                      <div
                        className={classNames(
                          "h-20 w-full rounded-cal-lg mb-3",
                          shadow.name.includes("brand") ? "bg-brand-default" : "bg-default border border-default"
                        )}
                        style={{
                          boxShadow:
                            shadow.name === "--shadow-dropdown" ? "0px 5px 20px 0px rgba(0, 0, 0, 0.10), 0px 10px 40px 0px rgba(0, 0, 0, 0.03)" :
                            shadow.name === "--shadow-elevation-low" ? "0px 1px 1px 0px rgba(0, 0, 0, 0.07), 0px 1px 2px 0px rgba(0, 0, 0, 0.08), 0px 2px 2px 0px rgba(0, 0, 0, 0.10), 0px 0px 8px 0px rgba(0, 0, 0, 0.05)" :
                            shadow.name === "--shadow-button-solid-brand-default" ? "0px 2px 3px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.08), 1px 4px 8px 0px rgba(0, 0, 0, 0.12), 0px 2px 0.4px 0px rgba(255, 255, 255, 0.12) inset, 0px -3px 2px 0px rgba(0, 0, 0, 0.04) inset" :
                            shadow.name === "--shadow-button-solid-brand-hover" ? "0px 1px 1px 0px rgba(0, 0, 0, 0.10), 0px 2px 3px 0px rgba(0, 0, 0, 0.08), 1px 4px 8px 0px rgba(0, 0, 0, 0.12), 0px -3px 2px 0px rgba(0, 0, 0, 0.10) inset, 0px 2px 0.4px 0px rgba(255, 255, 255, 0.24) inset" :
                            shadow.name === "--shadow-outline-gray-rested" ? "0px 2px 3px 0px rgba(0, 0, 0, 0.03), 0px 2px 2px -1px rgba(0, 0, 0, 0.03)" :
                            "0px 0px 0px 1px rgba(255, 255, 255, 0.20), 0px 0px 0px 2px rgba(0, 0, 0, 0.10)"
                        }}
                      />
                      <code className="text-xs text-muted block break-all">{shadow.name}</code>
                      <p className="text-sm text-default mt-1">{shadow.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-cal text-xl text-emphasis mb-6">Button Shadow States</h2>
                <div className="border border-subtle rounded-cal-lg p-6 bg-subtle">
                  <div className="flex flex-wrap gap-8">
                    <div className="text-center">
                      <div 
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-[10px] bg-brand-default text-brand border border-brand-default mb-2"
                        style={{ boxShadow: "0px 2px 3px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.08), 1px 4px 8px 0px rgba(0, 0, 0, 0.12), 0px 2px 0.4px 0px rgba(255, 255, 255, 0.12) inset, 0px -3px 2px 0px rgba(0, 0, 0, 0.04) inset" }}
                      >
                        Default
                      </div>
                      <p className="text-xs text-muted">Resting state</p>
                    </div>
                    <div className="text-center">
                      <div 
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-[10px] bg-brand-emphasis text-brand border border-brand-default mb-2"
                        style={{ boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.10), 0px 2px 3px 0px rgba(0, 0, 0, 0.08), 1px 4px 8px 0px rgba(0, 0, 0, 0.12), 0px -3px 2px 0px rgba(0, 0, 0, 0.10) inset, 0px 2px 0.4px 0px rgba(255, 255, 255, 0.24) inset" }}
                      >
                        Hover
                      </div>
                      <p className="text-xs text-muted">Hover state</p>
                    </div>
                    <div className="text-center">
                      <div 
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-[10px] bg-brand-default text-brand border border-brand-default mb-2"
                        style={{ boxShadow: "0px 3px 1px 0px rgba(0, 0, 0, 0.10) inset, 0px 0px 2px 0px rgba(0, 0, 0, 0.10) inset" }}
                      >
                        Active
                      </div>
                      <p className="text-xs text-muted">Active/pressed</p>
                    </div>
                    <div className="text-center">
                      <div 
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-[10px] bg-brand-default text-brand border border-brand-default mb-2"
                        style={{ boxShadow: "0px 0px 0px 1px rgba(255, 255, 255, 0.40), 0px 0px 0px 2px rgba(0, 0, 0, 0.20), 0px 1px 1px 0px rgba(0, 0, 0, 0.10), 0px 2px 3px 0px rgba(0, 0, 0, 0.08), 1px 4px 8px 0px rgba(0, 0, 0, 0.12), 0px -3px 2px 0px rgba(0, 0, 0, 0.10) inset, 0px 2px 0.4px 0px rgba(255, 255, 255, 0.24) inset" }}
                      >
                        Focused
                      </div>
                      <p className="text-xs text-muted">Focus state</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-subtle border-t mt-12">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <p className="text-sm text-subtle text-center">
              Cal.com Design System • Built with Tailwind CSS & CSS Variables
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function ColorSwatch({
  token,
  isDark,
  type,
}: {
  token: { name: string; light: string; dark: string; desc: string };
  isDark: boolean;
  type: "bg" | "text" | "border";
}) {
  const currentColor = isDark ? token.dark : token.light;
  
  return (
    <div className="border border-subtle rounded-cal-lg p-4 bg-subtle">
      <div className="flex items-start gap-3">
        {type === "bg" && (
          <div
            className="h-12 w-12 rounded-cal-md shrink-0 border border-default"
            style={{ backgroundColor: currentColor }}
          />
        )}
        {type === "text" && (
          <div
            className="h-12 w-12 rounded-cal-md shrink-0 border border-default bg-default flex items-center justify-center font-bold text-lg"
            style={{ color: currentColor }}
          >
            Aa
          </div>
        )}
        {type === "border" && (
          <div
            className="h-12 w-12 rounded-cal-md shrink-0 bg-default"
            style={{ border: `2px solid ${currentColor}` }}
          />
        )}
        <div className="min-w-0 flex-1">
          <code className="text-xs text-muted block truncate">{token.name}</code>
          <p className="text-sm text-default mt-1">{token.desc}</p>
          <p className="text-xs text-muted mt-1 font-mono">{currentColor}</p>
        </div>
      </div>
    </div>
  );
}
