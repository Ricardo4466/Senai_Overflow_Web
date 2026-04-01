import { createGlobalStyle } from "styled-components";
import { THEME_TOKENS, themeVarsToCss } from "./theme/themes";

const senaiVars = themeVarsToCss(THEME_TOKENS.senai);
const partnerVars = themeVarsToCss(THEME_TOKENS.partner);

export const GlobalStyles = createGlobalStyle`

:root,
[data-theme="senai"] {
${senaiVars}
}

[data-theme="partner"] {
${partnerVars}
}

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scrollbar-gutter: stable;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: var(--bg-base);
}

::-webkit-scrollbar-track {
  background-color: var(--bg-base);
}

::-webkit-scrollbar-thumb {
  background-color: var(--bg-surface-hover);
  border-radius: var(--radius-full);
  border: 2px solid var(--bg-base);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--text-faint);
}

body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.5;
  color: var(--text-primary);
  background-color: var(--bg-base);
  min-height: 100vh;
}

button {
  padding: 10px 18px;
  font-weight: 600;
  font-family: inherit;
  font-size: 0.9375rem;
  color: var(--text-primary);
  background-color: var(--bg-surface);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);

  :hover:not(:disabled) {
    background-color: var(--accent-soft);
    border-color: var(--accent);
    color: var(--text-primary);
  }

  :active:not(:disabled) {
    transform: scale(0.98);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  :disabled {
    background-color: transparent;
    border-color: var(--border-subtle);
    color: var(--text-faint);
    cursor: not-allowed;
    opacity: 0.7;
  }
}

a {
  color: var(--text-primary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);

  :hover {
    color: var(--accent);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: 2px;
  }

  :active {
    transform: none;
  }
}

textarea,
select {
  resize: none;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  color: var(--text-primary);
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  transition: border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);

  :focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }

  :focus-visible {
    outline: none;
  }
}

textarea::placeholder {
  color: var(--text-muted);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

`;
