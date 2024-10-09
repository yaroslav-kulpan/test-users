import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { modalTitleStyles } from "./Modal.theme";
import React from "react";

type IModalTitleProps = ComponentPropsWithoutRef<"div">;

export function ModalTitle({
  children,
  className,
  ...props
}: PropsWithChildren<IModalTitleProps>) {
  return (
    <div className={modalTitleStyles({ className })} {...props}>
      {children}
    </div>
  );
}
