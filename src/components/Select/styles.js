import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  > label {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  > select {
    width: 100%;
    min-height: 48px;
    padding: 10px 14px;
    font-size: 1rem;
    font-family: var(--font-sans);
    color: var(--text-primary);
    background-color: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%238b93a7' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 40px;
    transition: border-color var(--duration-fast) var(--ease-out),
      box-shadow var(--duration-fast) var(--ease-out);

    :hover {
      border-color: var(--border-strong);
    }

    :focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-soft);
      outline: none;
    }

    :focus-visible {
      outline: none;
    }
  }
`;
