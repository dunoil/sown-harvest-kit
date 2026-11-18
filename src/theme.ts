import { defineTheme } from "@hyper-elements/react";

/**
 * SOWN brand — written once, carried by every root.
 *
 * Design language: "field editorial".
 * Warm drafting-paper background, deep moss ink, marigold accent,
 * Georgia serif display type (email-safe) with a humanist sans for body.
 * Every Email, Page, Document and Canvas that takes this theme follows it:
 * change one token and all four outputs move together.
 */
export const sownTheme = defineTheme({
  colors: {
    background: "#f7f3ea",
    foreground: "#1c2a1e",
    primary: "#2e5a34",
    primaryForeground: "#ffffff",
    muted: "#546354",
    border: "#ddd6c2",
    paper: "#fffdf7",
    moss: "#223d27",
    marigold: "#e9a426",
    clay: "#c8432b",
  },
  fonts: {
    body: "Inter, Helvetica, Arial, sans-serif",
    heading: "Georgia, 'Times New Roman', serif",
  },
  fontSizes: {
    body: 15,
    small: 12,
    lead: 17,
  },
  lineHeights: {
    body: 1.6,
    heading: 1.2,
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radii: {
    card: 10,
    pill: 999,
  },
  elements: {
    // NOTE: no `mobile` blocks in theme defaults. Phone styles are an
    // ERROR in a Document or a Canvas (mobile/not-supported), and this
    // theme serves all four roots — so templates that live in an Email
    // or a Page set their own mobile styles, element by element.
    Heading: {
      by: {
        level: {
          1: { fontSize: 34 },
          2: { fontSize: 24 },
          3: { fontSize: 17 },
        },
      },
    },
    Button: {
      borderRadius: 8,
      padding: [12, 22],
      hover: { backgroundColor: "#223d27" },
      variants: {
        secondary: {
          backgroundColor: "{colors.paper}",
          color: "{colors.foreground}",
          border: { width: 1, style: "solid", color: "{colors.border}" },
        },
        small: { padding: [7, 14], fontSize: 13 },
      },
    },
    Divider: {
      borderTop: { width: 1, style: "solid", color: "{colors.border}" },
    },
  },
  styles: {
    card: {
      backgroundColor: "#fffdf7",
      padding: 28,
      gap: 16,
      borderRadius: 10,
      border: { width: 1, style: "solid", color: "#ddd6c2" },
    },
    quiet: { color: "#546354", fontSize: 12 },
    eyebrow: {
      color: "#2e5a34",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    stamp: {
      border: { width: 1, style: "dashed", color: "#2e5a34" },
      borderRadius: 6,
      padding: [6, 10],
      color: "#2e5a34",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1,
      textTransform: "uppercase",
    },
  },
  formats: {
    // Email clients get square, conservative buttons and system fallbacks.
    email: {
      elements: {
        Button: { borderRadius: 4 },
      },
    },
    // Print is quieter and smaller: ink is expensive, paper is A4.
    document: {
      fontSizes: { body: 11 },
      fonts: { body: "Helvetica, Arial, sans-serif" },
    },
  },
});

declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof sownTheme;
  }
}
