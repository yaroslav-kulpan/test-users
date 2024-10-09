import React, {ComponentPropsWithoutRef} from "react";

type SelectItemProps = ComponentPropsWithoutRef<"option">;

export function SelectItem({ children, className, ...rest }: SelectItemProps) {
  return (
    <option className={className} {...rest}>
      {children}
    </option>
  );
}
