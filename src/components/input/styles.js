import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  position: relative;
  margin-top: 18px;

  > input {
    padding: 12px 14px;
    border-radius: var(--radius-md);
    font-family: var(--font-sans);
    background-color: var(--bg-surface);
    color: var(--text-primary);
    border: 1px solid var(--border-subtle);
    transition: border-color var(--duration-fast) var(--ease-out),
      box-shadow var(--duration-fast) var(--ease-out);

    ::placeholder {
      color: transparent;
    }
  }

  > label {
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    position: absolute;
    display: flex;
    align-items: center;
    transition: top var(--duration-normal) var(--ease-out),
      transform var(--duration-normal) var(--ease-out),
      font-size var(--duration-normal) var(--ease-out),
      color var(--duration-fast) var(--ease-out);
    color: var(--text-muted);
    cursor: text;
    pointer-events: none;
    background: transparent;
    padding: 0 4px;
  }

  > input,
  > label {
    width: 100%;
    min-height: 48px;
    font-size: 1rem;
  }

  > input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
    outline: none;
  }

  > input:focus-visible {
    outline: none;
  }

  > input:not(:placeholder-shown) + label,
  > input:focus + label {
    color: var(--accent);
    font-size: 0.75rem;
    font-weight: 600;
    top: 0;
    left: 10px;
    transform: translateY(-50%);
    background-color: var(--input-float-label-bg);
    padding: 0 6px;
    border-radius: var(--radius-sm);
    line-height: 1.2;
    min-height: 0;
    height: auto;
    width: auto;
    max-width: calc(100% - 24px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
