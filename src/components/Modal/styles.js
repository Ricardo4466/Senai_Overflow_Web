import styled, { keyframes } from "styled-components";

const overlayIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const modalIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: radial-gradient(
      ellipse 120% 80% at 50% 0%,
      rgba(var(--accent-rgb), 0.12) 0%,
      transparent 55%
    ),
    rgba(var(--scrim-deep-rgb), 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: max(20px, env(safe-area-inset-top))
    max(16px, env(safe-area-inset-right))
    max(24px, env(safe-area-inset-bottom))
    max(16px, env(safe-area-inset-left));
  overflow-y: auto;
  overscroll-behavior: contain;
  animation: ${overlayIn} 0.22s var(--ease-out) both;
`;

export const ModalContainer = styled.div`
  position: relative;
  width: min(96vw, 760px);
  min-width: min(100%, 320px);
  max-width: min(96vw, 760px);
  min-height: 160px;
  max-height: min(calc(100vh - 48px), calc(100dvh - 48px), 92vh);
  margin-top: 0;
  padding: 0;
  flex-shrink: 0;
  background: linear-gradient(
    165deg,
    rgba(var(--bg-surface-rgb), 0.94) 0%,
    rgba(var(--bg-elevated-rgb), 0.92) 100%
  );
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-lg), 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  border-radius: var(--radius-lg);
  z-index: 1101;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${modalIn} 0.32s var(--ease-out) both;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent) 0%, var(--accent-hover) 50%, transparent 100%);
    opacity: 0.95;
    pointer-events: none;
  }
`;

export const ModalHeader = styled.header`
  flex-shrink: 0;
  font-weight: 700;
  font-size: clamp(1.0625rem, 2.5vw, 1.35rem);
  letter-spacing: -0.02em;
  text-align: center;
  margin: 0;
  padding: 24px 52px 16px 24px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-subtle);
  background: rgba(0, 0, 0, 0.1);
`;

export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px clamp(16px, 3.5vw, 28px) 28px;
  min-height: 0;
  scrollbar-gutter: stable;
  font-size: 0.9375rem;
  line-height: 1.55;

  &:focus {
    outline: none;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: 1.5rem;
  line-height: 1;
  font-weight: 400;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
  z-index: 2;

  :hover {
    color: var(--accent-hover);
    background-color: var(--accent-soft);
    border-color: var(--border-subtle);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;
