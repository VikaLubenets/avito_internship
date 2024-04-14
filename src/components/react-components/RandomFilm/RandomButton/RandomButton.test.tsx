import { render, screen, fireEvent } from '@testing-library/react';
import RandomButton from './RandomButton';

describe('RandomButton component', () => {
  it('renders a button with correct attributes', () => {
    const handleClick = jest.fn();

    render(<RandomButton onClick={handleClick} disabled={false} />);
    const buttonElement = screen.getByRole('button', { name: 'Случайный фильм' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('type', 'submit');
    expect(buttonElement).toHaveClass('random-button');
    expect(buttonElement).not.toBeDisabled();
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders a disabled button when disabled prop is true', () => {
    render(<RandomButton onClick={jest.fn()} disabled={true} />);
    const buttonElement = screen.getByRole('button', { name: 'Случайный фильм' });
    expect(buttonElement).toBeDisabled();
  });
});