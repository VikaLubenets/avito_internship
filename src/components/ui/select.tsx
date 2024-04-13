import { ChangeEvent, useCallback } from 'react';

type Props = {
  name: string;
  options: string[];
  onSelect: (selectedValue: string) => void;
  className?: string;
  selectedValue?: string;
};

const Select: React.FC<Props> = ({
  name,
  options,
  onSelect,
  className,
  selectedValue = '',
}) => {

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      onSelect(selectedValue);
    },
    [onSelect]
  );

  return (
    <select
      defaultValue={selectedValue}
      name={name}
      onChange={handleChange}
      className={`select ${className ? className : ''}`}
    >
      <option key={'reset'} value={'reset'}>
        {name}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
