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
    },
    boxShadow: {
      custom: "var(--shadow)",
    },
    // Add more extensions if needed, e.g., for gradients or other styles
  },
};
export const plugins = [];
