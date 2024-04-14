import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReturnButton from './ReturnButton';

describe('ReturnButton component', () => {
  it('renders a Link with a Button inside', () => {
    render(
      <BrowserRouter>
        <ReturnButton />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/');

    const buttonElement = screen.getByRole('button', { name: 'На главную' });
    expect(buttonElement).toBeInTheDocument();

    expect(buttonElement).toHaveClass('return-button');
  });
});