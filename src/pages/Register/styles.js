import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(24px, 5vw, 48px) 16px;
  overflow: hidden;

  ::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(${(p) => p.$heroBg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;
    filter: blur(6px) saturate(1.05);
    transform: scale(1.04);
    z-index: 0;
  }

  ::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      165deg,
      rgba(var(--bg-base-rgb), 0.88) 0%,
      rgba(var(--bg-elevated-rgb), 0.78) 45%,
      rgba(var(--bg-base-rgb), 0.92) 100%
    );
    z-index: 1;
    pointer-events: none;
  }
`;

const cardEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const FormLogin = styled.form`
  position: relative;
  z-index: 2;
  width: min(100%, 480px);
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${cardEnter} 0.55s var(--ease-out) both;

  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  text-align: center;
`;

export const Header = styled.header`
  width: 100%;
  padding: 28px 24px 22px;
  border-radius: 0;

  background: linear-gradient(
    180deg,
    rgba(var(--bg-surface-rgb), 0.95) 0%,
    rgba(var(--bg-elevated-rgb), 0.85) 100%
  );
  border-bottom: 1px solid var(--border-subtle);

  > h1 {
    font-size: clamp(1.35rem, 4vw, 1.5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    text-align: center;
    margin-bottom: 8px;
    color: var(--text-primary);
  }

  > h2 {
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    color: var(--text-muted);
  }
`;

export const Body = styled.section`
  width: 100%;
  padding: 28px 28px 24px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(var(--bg-base-rgb), 0.4);
`;

export const AuthFooter = styled.footer`
  margin-top: 8px;
  padding-top: 22px;
  border-top: 1px solid var(--border-subtle);
  width: 100%;
  text-align: center;
`;

export const AuthHint = styled.p`
  font-size: 0.8125rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 10px;
`;

export const AuthLink = styled(Link)`
  display: inline-block;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);

  :hover {
    color: var(--accent-hover);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: var(--radius-sm);
  }
`;

export const Button = styled.button`
  width: 100%;
  margin-top: 14px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--secundary) 100%);
  border-color: transparent;
  box-shadow: 0 6px 20px rgba(var(--accent-rgb), 0.35);

  :hover:not(:disabled) {
    background: linear-gradient(135deg, var(--accent-hover) 0%, var(--accent) 100%);
    border-color: transparent;
  }
`;
