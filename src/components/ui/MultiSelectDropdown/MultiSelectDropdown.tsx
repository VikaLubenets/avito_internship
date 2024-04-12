import { ChevronDown } from 'lucide-react';
import { useCallback, useState } from 'react';
import './MultiSelectDropdown.scss';

type Props = {
  title: string;
  options: string[];
  onSelect: (val: string[]) => void;
};

function MultiSelectDropdown({ title, options, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleCheckboxChange = useCallback(
    (option: string) => {
      setSelectedItems((prevSelectedItems) => {
        const isSelected = prevSelectedItems.includes(option);
        const newSelectedItems = isSelected
          ? prevSelectedItems.filter((item) => item !== option)
          : [...prevSelectedItems, option];

        onSelect(newSelectedItems);

        return newSelectedItems;
      });
    },
    [onSelect]
  );

  return (
    <div className="multy-select-container">
      <button className="multy-select-button" onClick={toggleDropdown}>
        {title}
        <ChevronDown className="multy-selector-icon" />
      </button>
      {isOpen && (
        <div className="multy-select-options">
          {options.map((option) => (
            <div key={option}>
              <label htmlFor={option} className="multy-select-label">
                <input
                  name={option}
                  type="checkbox"
                  checked={selectedItems.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
