import { Button } from '../../../ui/button';
import './RandomButton.scss';

const RandomButton = () => {
  return(
    <Button 
        type={'submit'} 
        title={'Случайный фильм'} 
        className={'random-button'} 
    />
  )
};

export default RandomButton;