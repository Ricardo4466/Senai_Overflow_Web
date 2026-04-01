import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 200;
  width: 0;
  min-height: 72px;
  margin: 0;
  transition: width var(--duration-normal) var(--ease-out),
    opacity var(--duration-fast) var(--ease-out);
  overflow: hidden;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-md);

  background-color: ${(props) =>
    props.type === "error" ? "var(--color-error-bg)" : "var(--color-success-bg)"};
  color: var(--text-primary);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  > h1 {
    font-size: 1rem;
    font-weight: 700;
    margin: 12px 44px 4px 14px;
    letter-spacing: -0.02em;
  }

  > p {
    font-size: 0.875rem;
    margin: 0 44px 12px 14px;
    color: var(--text-muted);
    white-space: normal;
  }

  > span {
    position: absolute;
    top: 8px;
    right: 8px;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
    color: var(--text-muted);
    border-radius: var(--radius-md);
    transition: color var(--duration-fast) var(--ease-out),
      background-color var(--duration-fast) var(--ease-out);

    :hover {
      color: var(--text-primary);
      background-color: rgba(0, 0, 0, 0.12);
    }
  }
`;
