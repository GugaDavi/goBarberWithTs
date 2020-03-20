import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";

interface IInputProps {
  name: string;
  value?: string;
}

type InputProps = JSX.IntrinsicElements["input"] & IInputProps;

const Input: React.FC<InputProps> = ({
  name,
  value = "",
  ...props
}: IInputProps) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = value, registerField, error } = useField(
    name
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);

  return (
    <>
      <input
        name={name}
        ref={inputRef}
        type="text"
        className={error ? "has-error" : ""}
        defaultValue={defaultValue}
        {...props}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
};

export default Input;
