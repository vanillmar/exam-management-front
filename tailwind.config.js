// tailwind.config.js

export const content = [
    '.src/app/**/*.{js,ts,jsx,tsx,mdx}', // For App Router
    '.src/pages/**/*.{js,ts,jsx,tsx,mdx}', // For Pages Router
    '.src/components/**/*.{js,ts,jsx,tsx,mdx}',
    // Add other paths as needed
];
export const theme = {
    extend: {},
};
export const plugins = [];