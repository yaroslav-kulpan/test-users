import React, { ComponentPropsWithoutRef, forwardRef, useId } from 'react';
import { checkbox, CheckboxVariants } from './Checkbox.theme';

type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> &
  CheckboxVariants & {
    label?: string;
    classNameWrapper?: string;
  };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      className,
      color = 'primary',
      classNameWrapper,
      disabled,
      ...props
    },
    ref
  ) {
    const {
      base,
      input,
      inputWrapper,
      label: labelStyles,
    } = checkbox({ color, isDisabled: disabled });

    const id = useId();
    return (
      <label className={base({ className: classNameWrapper })}>
        <div className={inputWrapper()}>
          <input
            id={id}
            aria-describedby={`${id}-description`}
            type="checkbox"
            ref={ref}
            className={input({ className })}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={id} className={labelStyles()}>
            {label}
          </label>
          <span id={`${id}-description`} className="text-gray-500">
            <span className="sr-only">{label}</span>
          </span>
        </div>
      </label>
    );
  }
);

export default Checkbox;
