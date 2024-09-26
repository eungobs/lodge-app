// Import the necessary testing functions from React Testing Library
import { render, screen } from '@testing-library/react';
// Import the main App component
import App from './App';

// Import polyfills for TextEncoder and TextDecoder
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for Node environment (as Jest runs in Node)
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Define a test case to verify if the "learn react" link is rendered in the document
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
