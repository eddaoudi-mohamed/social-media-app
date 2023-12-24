import { FC, InputHTMLAttributes } from "react";

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label: string;
  type: string;
  id?: string;
}
//
const Input: FC<Iprops> = ({ name, label, type, id, ...rest }) => {
  return (
    <>
      <label className="shad-form_label" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="p-1.5  outline-none border bg-gray-900 border-transparent rounded-md focus:border-blue-500 "
        {...rest}
      />
    </>
  );
};

export default Input;
