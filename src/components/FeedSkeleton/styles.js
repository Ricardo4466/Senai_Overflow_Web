import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

export const List = styled.div`
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
`;

export const Card = styled.div`
  position: relative;
  width: 100%;
  padding: 18px 18px 16px;
  background-color: var(--bg-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
`;

export const Shimmer = styled.span`
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.06),
    transparent
  );
  animation: ${shimmer} var(--duration-skeleton) ease-in-out infinite;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
`;

export const Avatar = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--skeleton-base);
`;

export const Lines = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

export const Line = styled.span`
  display: block;
  height: 12px;
  border-radius: var(--radius-sm);
  background: var(--skeleton-base);
  width: ${(p) => p.$width || "100%"};
`;

export const Block = styled.span`
  display: block;
  height: 72px;
  border-radius: var(--radius-sm);
  background: var(--skeleton-base);
  width: 100%;
`;
