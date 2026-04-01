import styled from "styled-components";

export const GoogleSignInShell = styled.div`
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.04) 0%,
    transparent 100%
  );
  background-color: var(--bg-surface);
  box-shadow: var(--shadow-sm);
  padding: 4px;
  transition: border-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: var(--shadow-sm), 0 0 0 1px rgba(255, 255, 255, 0.06);
  }

  &:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
`;

export const GoogleButtonHost = styled.div`
  width: 100%;
  min-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & iframe {
    max-width: 100% !important;
  }
`;
