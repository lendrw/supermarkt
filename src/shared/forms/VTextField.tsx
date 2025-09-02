import type { InputHTMLAttributes } from "react";
import { useField } from "@unform/core";
import clsx from "clsx";
import React, { useEffect } from "react";

interface VTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label?: string;
}

export const VTextField: React.FC<VTextFieldProps> = ({
  name,
  className,
  label,
  ...rest
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      clearValue: (ref) => {
        ref.value = "";
      },
    });
  }, [fieldName, registerField]);

  // Garante que `error` pode ser array (se sua validação mandar assim)
  const errors = Array.isArray(error) ? error : error ? [error] : [];

  return (
    <>
      {label && <span className="text-blue-800 font-bold text-sm">{label}</span>}
      <input
        {...rest}
        ref={inputRef}
        defaultValue={defaultValue}
        className={clsx(
          "text-gray-600 border w-80 border-blue-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 p-1 rounded-lg bg-white text-center",
          className
        )}
        onFocus={clearError}
      />
      {errors.length > 0 && (
        <div className="mt-1">
          {errors.map((err, index) => (
            <span key={index} className="text-red-500 text-sm block">
              {err}
            </span>
          ))}
        </div>
      )}
    </>
  );
};
