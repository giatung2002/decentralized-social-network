import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/app/components/Header';

describe('Header Component', () => {
  test('renders the Header component', () => {
    render(<Header />);
    
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });
});
