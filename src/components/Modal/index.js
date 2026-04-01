import { useLayoutEffect } from "react";
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalBody,
  CloseButton,
} from "./styles";

function Modal({ title, children, handleClose }) {
  useLayoutEffect(() => {
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarW > 0) {
      body.style.paddingRight = `${scrollbarW}px`;
    }

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, []);

  return (
    <Overlay role="presentation" onClick={handleClose}>
      <ModalContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton
          type="button"
          aria-label="Fechar"
          onClick={handleClose}
        >
          ×
        </CloseButton>
        <ModalHeader id="modal-dialog-title">{title}</ModalHeader>
        <ModalBody tabIndex={-1}>{children}</ModalBody>
      </ModalContainer>
    </Overlay>
  );
}

export default Modal;
