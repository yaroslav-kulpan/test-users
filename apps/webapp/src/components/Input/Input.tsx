import React, { ComponentPropsWithoutRef, memo, useId } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    const id = useId();
    const inputClasses = `block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
      error
        ? "ring-red-500 focus:ring-red-500"
        : "ring-gray-300 focus:ring-indigo-600"
    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`;

    return (
      <>
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="relative mt-2">
          <input {...props} ref={ref} id={id} className={inputClasses} />
          {error && (
            <p className="absolute mt-1 text-sm text-red-600" id={`${id}-error`}>
              {error}
            </p>
          )}
        </div>
      </>
    );
  },
);

export default memo(Input);
