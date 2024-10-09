import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import { modalContentStyles } from './modal.theme';
import React from "react";

type IModalContentProps = ComponentPropsWithoutRef<'div'> & {
  dividers?: boolean;
};

export function ModalContent({
  dividers = false,
  children,
  className,
  ...props
}: PropsWithChildren<IModalContentProps>) {
  return (
    <div className={modalContentStyles({ className })} {...props}>
      {children}
    </div>
  );
}
