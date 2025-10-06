/** @type {import('tailwindcss').Config} */

export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
];

export const theme = {
  extend: {
    colors: {
      bg: "var(--bg)",
      panel: "var(--panel)",
      glass: "var(--glass)",
      text: "var(--text)",
      muted: "var(--muted)",
      brand: "var(--brand)",
      accent: "var(--accent)",
      danger: "var(--danger)",
      bg0: "var(--bg-0)",
      bg1: "var(--bg-1)",
      bg2: "var(--bg-2)",
    },
    boxShadow: {
      custom: "var(--shadow)",
    },
    fontFamily: {
      sans: [
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
      ],
    },

    // Add more extensions if needed, e.g., for gradients or other styles
  },
};
export const plugins = ["flowbite/plugin"];
