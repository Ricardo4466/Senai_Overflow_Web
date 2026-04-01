import { Container } from "./styles";
import { useEffect, useRef } from "react";

function Alert({ message, type, handleClose }) {

    const containeRef = useRef();

  useEffect(() => {
    const el = containeRef.current;
    if (!el) return;

    if (message) {
      el.style.width = "300px";
      const t = setTimeout(() => handleClose(undefined), 5000);
      return () => clearTimeout(t);
    }

    el.style.width = "0px";
  }, [message, handleClose]);

  return (
    <Container ref={containeRef} type={type}>
      {message && (
        <>
          <span onClick={() => handleClose(undefined)}>&times;</span>
          <h1>{message.title}</h1>
          <p>{message.description}</p>
        </>
      )}
    </Container>
  );
}

export default Alert;
