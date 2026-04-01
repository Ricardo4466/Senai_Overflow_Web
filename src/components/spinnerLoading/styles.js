import styled, { keyframes } from "styled-components";

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 36px;
  min-height: 36px;
  border: 3px solid var(--border-subtle);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: ${spin} 0.85s linear infinite;
  box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.2);
`;
