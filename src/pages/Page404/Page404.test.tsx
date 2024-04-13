import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page404 from './Page404';

test('404 page is displayed when navigating to an invalid route', () => {
  render(<Page404 />);

  expect(screen.getByText('Page not found')).toBeInTheDocument();
});
