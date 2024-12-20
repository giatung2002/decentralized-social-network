import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/app/components/Header';
import { WalletProvider } from '@/context/WalletContext';

describe('Header Component', () => {
  test('renders the Header component', () => {
    render(
      <WalletProvider>
        <Header />
      </WalletProvider>
    );
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
  });
});