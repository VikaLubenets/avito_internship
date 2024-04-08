import { MouseEventHandler } from "react";

type Props = {
  type: 'submit' | 'reset' | 'button';
  title: string;
  className: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({ type, title, className, onClick }: Props) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {title}
    </button>
  );
};