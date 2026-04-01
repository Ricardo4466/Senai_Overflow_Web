import styled from "styled-components";

export const Container = styled.article`
  width: fit-content;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  margin: 0 8px 10px 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
  transition: border-color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);

  :hover {
    border-color: var(--border-strong);
  }

  > span {
    margin-left: 4px;
    cursor: pointer;
    font-size: 1.125rem;
    line-height: 1;
    color: var(--text-muted);
    padding: 2px;
    border-radius: var(--radius-sm);
    transition: color var(--duration-fast) var(--ease-out),
      background-color var(--duration-fast) var(--ease-out);

    :hover {
      color: var(--accent);
      background-color: var(--accent-soft);
    }
  }
`;
