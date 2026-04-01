/** @typedef {'senai' | 'partner'} ThemeId */

const STRUCTURAL = {
  "--font-sans":
    '"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
  "--font-mono":
    '"JetBrains Mono", ui-monospace, "Cascadia Code", monospace',

  "--radius-sm": "6px",
  "--radius-md": "10px",
  "--radius-lg": "16px",
  "--radius-full": "9999px",

  "--shadow-sm": "0 1px 2px rgba(0, 0, 0, 0.4)",
  "--shadow-md": "0 8px 28px rgba(0, 0, 0, 0.45)",
  "--shadow-lg": "0 20px 50px rgba(0, 0, 0, 0.55)",

  "--ease-out": "cubic-bezier(0.33, 1, 0.68, 1)",
  "--duration-fast": "180ms",
  "--duration-normal": "280ms",

  "--color-success": "#34d399",
  "--color-success-bg": "rgba(52, 211, 153, 0.18)",
  "--color-error": "#f87171",
  "--color-error-bg": "rgba(248, 113, 113, 0.2)",

  "--noise-opacity": "0.035",
  "--duration-skeleton": "1.35s",
};

const SENAI = {
  ...STRUCTURAL,

  "--bg-base": "#12131a",
  "--bg-elevated": "#1a1b24",
  "--bg-surface": "#252836",
  "--bg-surface-hover": "#2f3347",

  "--bg-base-rgb": "18, 19, 26",
  "--bg-elevated-rgb": "26, 27, 36",
  "--bg-surface-rgb": "37, 40, 54",

  "--border-subtle": "rgba(255, 255, 255, 0.08)",
  "--border-strong": "rgba(255, 255, 255, 0.14)",

  "--text-primary": "#eceff4",
  "--text-muted": "#8b93a7",
  "--text-faint": "#5c6478",

  "--accent": "#e63946",
  "--accent-hover": "#ff5c6a",
  "--accent-soft": "rgba(230, 57, 70, 0.18)",
  "--accent-rgb": "230, 57, 70",
  "--accent-deep-rgb": "168, 28, 52",

  "--secundary": "#c1121f",

  "--glass-bg": "rgba(26, 27, 36, 0.72)",
  "--glass-border": "rgba(255, 255, 255, 0.1)",

  "--input-float-label-bg": "var(--bg-surface)",

  "--glow-accent": "rgba(230, 57, 70, 0.14)",
  "--glow-accent-strong": "rgba(230, 57, 70, 0.22)",
  "--glow-secondary": "rgba(99, 102, 241, 0.06)",
  "--ambient-vignette": "rgba(6, 7, 12, 0.55)",

  "--scrim-deep-rgb": "8, 9, 14",

  "--skeleton-base": "var(--bg-surface)",
  "--skeleton-highlight": "var(--bg-surface-hover)",

  "--dark": "var(--bg-elevated)",
  "--darkGray": "var(--bg-surface)",
  "--light": "var(--text-primary)",
  "--primary": "var(--accent)",
};

const PARTNER = {
  ...STRUCTURAL,

  "--font-sans":
    '"JetBrains Mono", "Plus Jakarta Sans", ui-monospace, system-ui, sans-serif',

  "--bg-base": "#0d1117",
  "--bg-elevated": "#161b22",
  "--bg-surface": "#21262d",
  "--bg-surface-hover": "#30363d",

  "--bg-base-rgb": "13, 17, 23",
  "--bg-elevated-rgb": "22, 27, 34",
  "--bg-surface-rgb": "33, 38, 45",

  "--border-subtle": "rgba(240, 246, 252, 0.08)",
  "--border-strong": "rgba(240, 246, 252, 0.14)",

  "--text-primary": "#e6edf3",
  "--text-muted": "#8b949e",
  "--text-faint": "#6e7681",

  "--accent": "#3fb950",
  "--accent-hover": "#56d364",
  "--accent-soft": "rgba(63, 185, 80, 0.18)",
  "--accent-rgb": "63, 185, 80",
  "--accent-deep-rgb": "35, 134, 54",

  "--secundary": "#238636",

  "--glass-bg": "rgba(22, 27, 34, 0.82)",
  "--glass-border": "rgba(240, 246, 252, 0.08)",

  "--input-float-label-bg": "var(--bg-surface)",

  "--glow-accent": "rgba(63, 185, 80, 0.14)",
  "--glow-accent-strong": "rgba(63, 185, 80, 0.22)",
  "--glow-secondary": "rgba(88, 166, 255, 0.09)",
  "--ambient-vignette": "rgba(1, 4, 9, 0.68)",

  "--scrim-deep-rgb": "13, 17, 23",

  "--skeleton-base": "var(--bg-surface)",
  "--skeleton-highlight": "var(--bg-surface-hover)",

  "--dark": "var(--bg-elevated)",
  "--darkGray": "var(--bg-surface)",
  "--light": "var(--text-primary)",
  "--primary": "var(--accent)",
};

/** @type {Record<ThemeId, Record<string, string>>} */
export const THEME_TOKENS = {
  senai: SENAI,
  partner: PARTNER,
};

/** @returns {ThemeId} */
export function normalizeTheme(raw) {
  const id = String(raw || "")
    .trim()
    .toLowerCase();
  if (id === "partner") return "partner";
  return "senai";
}

export function themeVarsToCss(tokens) {
  return Object.entries(tokens)
    .map(([key, val]) => `  ${key}: ${val};`)
    .join("\n");
}
