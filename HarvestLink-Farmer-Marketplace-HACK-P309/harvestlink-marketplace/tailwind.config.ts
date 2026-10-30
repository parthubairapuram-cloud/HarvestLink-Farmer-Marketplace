import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], theme: { extend: { colors: { leaf: "#1f6b4a", ink: "#17231d", cream: "#f7f7f1" }, boxShadow: { soft: "0 12px 35px rgba(23,35,29,.08)" } } }, plugins: [] };
export default config;