import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Header } from '@/app/components/Header';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/Dialogs';
import { Testimonial } from '@/app/components/Testimonial';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import MetaMaskLogin from '@/app/login/MetaMaskLogin';
import ChatGPT from '@/app/components/ChatGPT';
import { Textarea } from '@/app/ui/textarea';
import { WalletProvider } from '@/context/WalletContext';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Component Tests', () => {
  // Header Tests
  describe('Header Component', () => {
    test('renders navigation links', () => {
      render(
        <WalletProvider>
          <Header />
        </WalletProvider>
      );
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Features')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    test('responsive menu button works', () => {
      render(
        <WalletProvider>
          <Header />
        </WalletProvider>
      );
      
      const menuButton = screen.getByRole('button', { name: /menu/i });
      fireEvent.click(menuButton);
      
      expect(screen.getByRole('navigation')).toBeVisible();
    });
  });

  // Dialog Tests
  describe('Dialog Components', () => {
    test('dialog opens and closes correctly', async () => {
      const handleClose = jest.fn();
      
      render(
        <Dialog isOpen={true} onClose={handleClose}>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
          <DialogContent>
            <p>Test Content</p>
          </DialogContent>
        </Dialog>
      );

      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      
      expect(handleClose).toHaveBeenCalled();
    });
  });

  // Testimonial Tests
  describe('Testimonial Component', () => {
    test('renders testimonial content', () => {
      const testimonialProps = {
        quote: 'Great platform!',
        author: 'John Doe'
      };

      render(<Testimonial {...testimonialProps} />);
      
      expect(screen.getByText('"Great platform!"')).toBeInTheDocument();
      expect(screen.getByText('- John Doe')).toBeInTheDocument();
    });
  });

  // ErrorBoundary Tests
  describe('ErrorBoundary Component', () => {
    test('renders children when no error', () => {
      render(
        <ErrorBoundary>
          <div>Test Content</div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('renders error UI when error occurs', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
      expect(screen.getByText('Try again')).toBeInTheDocument();
    });
  });

  // MetaMask Login Tests
  describe('MetaMask Login Component', () => {
    beforeEach(() => {
      (global.window as any).ethereum = {
        request: jest.fn(),
        on: jest.fn(),
        removeAllListeners: jest.fn(),
      };
    });

    test('renders connect button', () => {
      render(<MetaMaskLogin />);
      
      expect(screen.getByText('Connect with MetaMask')).toBeInTheDocument();
    });

    test('handles connection error', async () => {
      ((global.window as any).ethereum.request) = jest.fn().mockRejectedValue(new Error('User rejected'));
      
      render(<MetaMaskLogin />);
      
      const connectButton = screen.getByText('Connect with MetaMask');
      fireEvent.click(connectButton);
      
      await waitFor(() => {
        expect(screen.getByText('An error occurred while connecting to MetaMask.')).toBeInTheDocument();
      });
    });
  });

  // ChatGPT Component Tests
  describe('ChatGPT Component', () => {
    test('renders chat interface', () => {
      const handleClose = jest.fn();
      render(<ChatGPT onClose={handleClose} />);
      
      expect(screen.getByText('Web3 Assistant')).toBeInTheDocument();
    });

    test('handles message input', async () => {
      const handleClose = jest.fn();
      render(<ChatGPT onClose={handleClose} />);
      
      const input = screen.getByPlaceholderText(/Type your message/i);
      fireEvent.change(input, { target: { value: 'Hello' } });
      
      const sendButton = screen.getByRole('button', { name: /send/i });
      fireEvent.click(sendButton);
      
      await waitFor(() => {
        expect(input).toHaveValue('');
      });
    });

    test('closes chat window', () => {
      const handleClose = jest.fn();
      render(<ChatGPT onClose={handleClose} />);
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      
      expect(handleClose).toHaveBeenCalled();
    });
  });

  // Textarea Component Tests
  describe('Textarea Component', () => {
    test('renders with placeholder', () => {
      render(<Textarea placeholder="Enter text here" />);
      expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
    });

    test('handles value changes', () => {
      const handleChange = jest.fn();
      render(<Textarea onChange={handleChange} />);
      
      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, { target: { value: 'test content' } });
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
