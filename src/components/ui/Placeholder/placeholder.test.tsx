import { render, screen } from '@testing-library/react';
import Placeholder from './placeholder';

describe('Check render placeholder', () => {
  test('con provided message', () => {
    render(<Placeholder message="no results" />);
    expect(screen.getByText('no results')).toBeInTheDocument();
  });
});
