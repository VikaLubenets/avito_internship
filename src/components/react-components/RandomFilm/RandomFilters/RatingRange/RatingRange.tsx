import { ChangeEvent, useCallback, useState } from 'react';
import './RatingRange.scss';

type Props = {
  onSelect: (selectedValue: string) => void;
};

const RatingRange = ({ onSelect }: Props) => {
  const [currentValue, setCurrentValue] = useState(0);
  const minRating = 0;
  const maxRating = 10;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selectedValue = event.target.value;
      setCurrentValue(Number(selectedValue));
      onSelect(selectedValue);
    },
    [onSelect]
  );

  return (
    <label htmlFor="rating-kp" className="random-filter-label">
      Минимальный рейтинг на Кинопоиске
      <div className="range-container">
        <div className="current-value">{currentValue}</div>
        <input
          id="rating-kp"
          name="rating-kp"
          type="range"
          min={minRating}
          max={maxRating}
          value={currentValue}
          onChange={handleChange}
          className="rating-kp-input"
        />
      </div>
      <div className="min-max-values">
        <span className="min-value">{minRating}</span>
        <span className="max-value">{maxRating}</span>
      </div>
    </label>
  );
};

export default RatingRange;
