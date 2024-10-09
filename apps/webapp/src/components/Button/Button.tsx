import React, { useMemo } from "react";

import button, { ButtonVariants } from "./Button.theme";

type ButtonProps = React.ComponentPropsWithRef<"button"> &
  Omit<ButtonVariants, "isPressed" | "isDisabled"> & {
    isLoading?: boolean;
  };

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>(function Button(
  {
    type = "button",
    children,
    className,
    variant = "contained",
    color = "primary",
    disabled: isDisabled = false,
    fullWidth,
    isLoading,
    ...rest
  },
  ref,
) {
  const classNames = useMemo(
    () =>
      button({
        variant,
        color,
        disabled: isDisabled,
        fullWidth,
        className,
      }),
    [className, color, fullWidth, isDisabled, variant],
  );

  return (
    <button
      ref={ref}
      type={type}
      className={classNames}
      disabled={isDisabled}
      {...rest}
    >
      <div className="flex items-center gap-x-1">
        {children}
      </div>
    </button>
  );
});

Button.displayName = "CMuSyUI.Button";

export default React.memo(Button);
