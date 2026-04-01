import styled, { keyframes } from "styled-components";
import {
  FaSignOutAlt,
  FaGithub,
  FaComments,
  FaSearch,
  FaImage,
} from "react-icons/fa";

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  height: 100dvh;
  max-height: 100vh;
  max-height: 100dvh;
  background-color: var(--bg-base);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  overflow-x: hidden;
  isolation: isolate;

  &::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(
        ellipse 85% 55% at 15% -10%,
        var(--glow-accent-strong) 0%,
        transparent 52%
      ),
      radial-gradient(
        ellipse 70% 45% at 92% 8%,
        var(--glow-secondary) 0%,
        transparent 48%
      ),
      radial-gradient(
        ellipse 60% 50% at 50% 105%,
        var(--glow-accent) 0%,
        transparent 45%
      ),
      radial-gradient(ellipse 120% 80% at 50% 50%, transparent 35%, var(--ambient-vignette) 100%);
  }

  &::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: var(--noise-opacity);
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
  }
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  padding: 0 clamp(12px, 3vw, 28px);
  justify-content: space-between;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 100;
  background: linear-gradient(
    125deg,
    rgba(var(--accent-rgb), 0.94) 0%,
    rgba(var(--accent-deep-rgb), 0.9) 55%,
    rgba(var(--bg-elevated-rgb), 0.88) 100%
  );
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: var(--shadow-md);

  @media (max-width: 640px) {
    height: auto;
    min-height: 64px;
    flex-wrap: wrap;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  flex: 1 1 0;
  min-height: 0;
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 76px clamp(14px, 3vw, 28px) 20px;
  display: grid;
  grid-template-columns: minmax(180px, 0.95fr) minmax(0, 2.2fr) minmax(160px, 0.85fr);
  grid-template-rows: minmax(0, 1fr);
  gap: clamp(16px, 2.5vw, 28px);
  align-items: stretch;
  overflow: hidden;

  @media (max-width: 1024px) and (min-width: 901px) {
    grid-template-columns: minmax(200px, 1fr) minmax(0, 1.55fr);
    grid-template-rows: minmax(0, 1fr) auto;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, 1fr) auto;
    padding-top: 72px;
    padding-bottom: 16px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 4px;
  padding: 20px 16px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;

  @media (max-width: 1024px) and (min-width: 901px) {
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  @media (max-width: 900px) {
    overflow-y: visible;
    flex-shrink: 0;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-align: center;
  }

  input[type="file"] {
    display: none;
  }

  label {
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--accent);
    text-decoration: none;
    transition: color var(--duration-fast) var(--ease-out);

    :hover {
      color: var(--accent-hover);
    }
  }

  img {
    width: clamp(88px, 36%, 132px);
    max-width: 100%;
    aspect-ratio: 1;
    height: auto;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid var(--border-subtle);
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
    display: block;
  }

  strong {
    font-size: 0.8125rem;
    color: var(--text-muted);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  p {
    color: var(--text-primary);
    font-size: 0.9375rem;
  }
`;

export const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-height: 0;
  min-width: 0;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  padding: 20px 14px;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  -webkit-overflow-scrolling: touch;

  @media (max-width: 1024px) and (min-width: 901px) {
    grid-column: 2;
    grid-row: 1;
  }

  @media (max-width: 900px) {
    min-height: 0;
  }
`;

export const ActionsContainer = styled.div`
  margin-top: 4px;
  text-align: center;
  padding: 4px 0 0;
  flex-shrink: 0;

  @media (max-width: 1024px) and (min-width: 901px) {
    grid-column: 2;
    grid-row: 2;
    align-self: stretch;
  }

  button {
    width: 100%;
    background: linear-gradient(135deg, var(--accent) 0%, var(--secundary) 100%);
    border-color: transparent;
    font-weight: 600;
    box-shadow: 0 4px 14px rgba(var(--accent-rgb), 0.35);

    :hover:not(:disabled) {
      background: linear-gradient(135deg, var(--accent-hover) 0%, var(--accent) 100%);
      border-color: transparent;
      filter: brightness(1.05);
    }
  }
`;

const cardFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const QuestionCardWrap = styled.div`
  width: 100%;
  max-width: 640px;
  animation: ${cardFadeIn} 0.48s var(--ease-out) both;
  animation-delay: ${(p) => Math.min(p.$delayIndex ?? 0, 10) * 48}ms;
`;

export const QuestionCards = styled.article`
  width: 100%;
  max-width: 640px;
  padding: 18px 18px 16px;
  background-color: var(--bg-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-sm);
  transition: border-color var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out);

  :hover {
    border-color: var(--border-strong);
    box-shadow: var(--shadow-md), 0 0 0 1px rgba(255, 255, 255, 0.04);
  }

  > header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    column-gap: 12px;
    row-gap: 2px;
    align-items: start;

    > img {
      grid-column: 1;
      grid-row: 1 / span 2;
      align-self: center;
      width: 36px;
      height: 36px;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 50%;
      border: 2px solid var(--border-subtle);
      flex-shrink: 0;
      display: block;
    }

    > strong {
      grid-column: 2;
      grid-row: 1;
      font-size: 0.9375rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      color: var(--text-primary);
      line-height: 1.3;
      align-self: end;
    }

    > p {
      grid-column: 2;
      grid-row: 2;
      margin: 0;
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--text-muted);
      letter-spacing: 0.04em;
      font-variant-numeric: tabular-nums;
      line-height: 1.35;
      align-self: start;
    }
  }

  > section {
    margin-top: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    > strong {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: -0.03em;
      line-height: 1.25;
    }

    > p {
      font-size: 0.9375rem;
      line-height: 1.55;
      color: var(--text-primary);
      padding: 12px 14px;
      border-left: 3px solid var(--accent);
      background: var(--bg-elevated);
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    }

    > img {
      max-width: 100%;
      width: 100%;
      align-self: center;
      border-radius: var(--radius-sm);
      aspect-ratio: 16 / 9;
      object-fit: cover;
      background: var(--bg-base);
    }
  }

  > footer {
    margin-top: 14px;
    > h1 {
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      color: var(--text-muted);
      transition: color var(--duration-fast) var(--ease-out);

      :hover {
        color: var(--accent);
      }
    }

    > section {
      margin-top: 12px;
      border-radius: var(--radius-md);
      padding: 12px;
      background-color: var(--bg-elevated);
      border: 1px solid var(--border-subtle);

      > header {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto auto;
        column-gap: 10px;
        row-gap: 2px;
        align-items: start;

        > img {
          grid-column: 1;
          grid-row: 1 / span 2;
          align-self: center;
          width: 32px;
          height: 32px;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 50%;
          flex-shrink: 0;
          display: block;
        }

        > strong {
          grid-column: 2;
          grid-row: 1;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--text-primary);
          line-height: 1.3;
        }

        > p {
          grid-column: 2;
          grid-row: 2;
          margin: 0;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.04em;
          font-variant-numeric: tabular-nums;
          line-height: 1.35;
        }
      }

      > p {
        margin-top: 8px;
        width: 100%;
        padding: 10px 12px;
        border-left: 3px solid var(--accent);
        font-size: 0.9375rem;
        line-height: 1.5;
        color: var(--text-primary);
        background: var(--bg-base);
        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      }
    }

    > form {
      width: 100%;
      margin-top: 10px;
      font-family: var(--font-sans);
      display: flex;
      gap: 8px;
      align-items: flex-end;

      > textarea {
        flex: 1;
        min-height: 72px;
        font-family: var(--font-sans);
      }
    }
  }
`;

export const Logo = styled.img`
  width: 48px;
  height: 48px;
  margin: 0;
  flex-shrink: 0;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.35);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: transform var(--duration-normal) var(--ease-out),
    box-shadow var(--duration-normal) var(--ease-out);

  :hover {
    transform: scale(1.06);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  }
`;

export const IconSingOut = styled(FaSignOutAlt)`
  font-size: 26px;
  flex-shrink: 0;
  padding: 8px;
  border-radius: var(--radius-md);
  cursor: pointer;
  color: rgba(255, 255, 255, 0.95);
  transition: color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);

  :hover {
    color: var(--text-primary);
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

export const FormNewQuestion = styled.form`
  min-width: 0;
  width: 100%;
  max-width: min(520px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;

  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  button[type="submit"],
  > button:last-of-type {
    width: 100%;
    margin-top: 6px;
    padding: 12px 20px;
    background: linear-gradient(
      135deg,
      var(--accent) 0%,
      var(--secundary) 100%
    );
    border-color: transparent;
    font-weight: 600;
    box-shadow: 0 4px 14px rgba(var(--accent-rgb), 0.3);

    :hover:not(:disabled) {
      background: linear-gradient(
        135deg,
        var(--accent-hover) 0%,
        var(--accent) 100%
      );
      border-color: transparent;
      filter: brightness(1.04);
    }
  }
`;

export const FileUploadInput = styled.input.attrs(() => ({
  type: "file",
}))`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const FileUploadWrap = styled.div`
  position: relative;
  width: 100%;
  margin-top: 2px;

  &:focus-within > label {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
`;

export const FileUploadLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-height: 56px;
  padding: 14px 18px;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  color: var(--text-muted);
  font-size: 0.9375rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);

  :hover {
    border-color: var(--accent);
    color: var(--text-primary);
    background: var(--bg-elevated);
    box-shadow: 0 0 0 1px var(--accent-soft);
  }
`;

export const FileUploadIcon = styled(FaImage)`
  font-size: 1.35rem;
  flex-shrink: 0;
  opacity: 0.9;
  color: var(--accent);
`;

export const FileUploadMeta = styled.span`
  display: block;
  margin-top: 10px;
  padding: 0 4px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-muted);
  text-align: center;
  word-break: break-word;
  line-height: 1.4;
`;

export const FileUploadPreview = styled.img`
  display: none;
  align-self: center;
  max-width: 100%;
  width: auto;
  max-height: 220px;
  margin-top: 12px;
  object-fit: contain;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--bg-base);
  box-shadow: var(--shadow-sm);
`;

export const GistIcon = styled(FaGithub)`
  grid-column: 3;
  grid-row: 1 / span 2;
  align-self: center;
  justify-self: end;
  font-size: 28px;
  margin-right: 0;
  cursor: pointer;
  color: var(--text-muted);
  transition: color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);

  :hover {
    color: var(--accent);
  }

  :active {
    transform: scale(0.94);
  }
`;

export const ContainerGist = styled.section`
  margin-top: 0;
  min-height: min(320px, 45vh);

  .gist-blob-wrapper,
  .gist-meta {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
  }

  h2 {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--text-muted);
    text-align: center;
    margin-bottom: 10px;
  }
`;

export const FeedEmptyState = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 24px auto;
  padding: 32px 28px;
  text-align: center;
  background: var(--bg-elevated);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
`;

export const FeedEmptyIcon = styled(FaComments)`
  font-size: 2.5rem;
  color: var(--accent);
  opacity: 0.85;
  margin-bottom: 16px;
`;

export const FeedEmptyTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

export const FeedEmptyText = styled.p`
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-muted);
  margin-bottom: 20px;
`;

export const FeedEmptyButton = styled.button`
  width: auto;
  min-width: 200px;
`;

export const FeedSearchEmpty = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 24px auto;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
`;

export const FeedSearchIcon = styled(FaSearch)`
  font-size: 2rem;
  color: var(--text-muted);
  opacity: 0.9;
`;

export const FeedSearchTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
`;

export const FeedSearchHint = styled.p`
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.45;
`;

export const FeedEndMessage = styled.p`
  width: 100%;
  max-width: 640px;
  padding: 20px 16px 8px;
  text-align: center;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-faint);
`;
