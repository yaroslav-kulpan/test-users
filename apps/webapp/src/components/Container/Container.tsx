import React, { ElementType, PropsWithChildren } from "react";

type ContainerProps<T extends ElementType = "div" | "span"> = {
  as?: T;
  className?: string;
  clean?: boolean;
};

export function Container({
  children,
  className,
  as: Component = "div",
  clean,
}: PropsWithChildren<ContainerProps>) {
  const rootClassName = !clean
    ? `mx-auto max-w-screen-2xl px-6 w-full ${className}`
    : "";
  return <Component className={rootClassName}>{children}</Component>;
}
