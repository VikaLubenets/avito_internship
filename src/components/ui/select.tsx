import { ChangeEvent } from "react";

type Props = {
  name: string;
  options: string[];
  onSelect: (selectedValue: string) => void;
  className?: string;
  selectedValue: string;
};

const Select: React.FC<Props> = ({
  name,
  options,
  onSelect,
  className,
  selectedValue,
}) => {

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelect(selectedValue);
  };

  return (
    <select
      name={name}
      onChange={handleChange}
      className={`select ${className ? className : ''}`}
    >
        <option key={0} value={''} disabled>
          {name}
        </option>
      {options.map((option, index) => (
        <option key={index+1} value={option} selected={option === selectedValue}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;