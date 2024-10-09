import React from "react";
import { Transition } from "@headlessui/react";
import { modalStyles } from "./Modal.theme";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  disableKeyboard?: boolean;
  backdropClassName?: string;
};

export const Modal = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<ModalProps>
>(function Modal(props, ref) {
  const { children, open = false, onClose } = props;
  const modalRef = React.useRef<HTMLDivElement>(null);
  const { base, modal, overlay, modalWrapper, modalContainer } = modalStyles();

  // Close Modal if clicked outside the Modal content
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <div className={base()} onClick={handleOverlayClick}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={overlay()} />
        </Transition.Child>
        <div className={modalWrapper()}>
          <div className={modalContainer()}>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div ref={modalRef} className={modal()}>
                {children}
              </div>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Transition.Root>
  );
});
