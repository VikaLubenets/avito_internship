import { MouseEventHandler } from 'react';

type Props = {
  type: 'submit' | 'reset' | 'button';
  title: string;
  className: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const Button = ({
  type,
  title,
  className,
  onClick,
  disabled,
}: Props) => {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
