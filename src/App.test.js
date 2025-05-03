
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MindMentor heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/MindMentor/i);
  expect(headingElement).toBeInTheDocument();
});
