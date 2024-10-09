import React, { ComponentPropsWithoutRef, useId } from "react";

type SelectProps = ComponentPropsWithoutRef<"select"> & {
  label: string;
  error?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, children, ...props }, ref) => {
    const id = useId();
    const selectClasses = `block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
      error
        ? "ring-red-500 focus:ring-red-500"
        : "ring-gray-300 focus:ring-indigo-600"
    } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`;

    return (
      <>
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2">
          <select id={id} ref={ref} className={selectClasses} {...props}>
            {children}
          </select>
          {error && (
            <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
              {error}
            </p>
          )}
        </div>
      </>
    );
  },
);
