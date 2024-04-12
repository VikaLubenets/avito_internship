import { useState } from 'react';
import './RatingRange.scss';

const RatingRange = () => {
  const [currentValue, setCurrentValue] = useState(5);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(Number(event.target.value));
  };

  return (
      <label htmlFor="rating-kp" className='random-filter-label'>
          По рейтингу Кинопоиска
          <div className="range-container">
              <div className="current-value">{currentValue}</div>
              <input
                  id="rating-kp"
                  name="rating-kp"
                  type="range"
                  min={0}
                  max={10}
                  value={currentValue}
                  onChange={handleChange}
                  className="rating-kp-input"
              />
          </div>
      </label>
  );
};

export default RatingRange;