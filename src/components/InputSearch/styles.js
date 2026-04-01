import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

/* Largura do slot reservada no header — evita CLS ao focar (sem animar max-width do input). */
export const Container = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  width: 100%;
  max-width: min(420px, calc(100vw - 180px));
  display: flex;
  align-items: center;
  justify-content: stretch;

  > input {
    box-sizing: border-box;
    padding-left: 42px;
    padding-right: 14px;
    border-radius: var(--radius-full);
    font-family: var(--font-sans);
    width: 100%;
    height: 42px;
    font-size: 0.9375rem;
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: background-color var(--duration-fast) var(--ease-out),
      border-color var(--duration-fast) var(--ease-out),
      box-shadow var(--duration-fast) var(--ease-out);

    ::placeholder {
      color: rgba(255, 255, 255, 0.65);
    }

    :focus {
      outline: none;
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
    }

    :focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.6);
      outline-offset: 2px;
    }
  }

  > input:focus + svg {
    color: var(--text-primary);
  }

  @media (max-width: 640px) {
    order: 3;
    max-width: 100%;
    flex-basis: 100%;
  }
`;

export const IconSearch = styled(FaSearch)`
  position: absolute;
  left: 14px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-out);

  :hover {
    color: rgba(255, 255, 255, 0.95);
  }
`;
