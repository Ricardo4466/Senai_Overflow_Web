import styled, { keyframes } from "styled-components";

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0;
  background-color: rgba(8, 9, 14, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  user-select: none;

  > img {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    opacity: 0.95;
    border: 3px solid var(--border-subtle);
    box-shadow: var(--shadow-md);
    animation: ${spin} 0.65s linear infinite;
  }
`;
