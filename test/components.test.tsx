import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import FeaturesPage from '@/app/features/page';
import ContactPage from '@/app/contact/page';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { FeatureCard } from '@/app/components/FeatureCard';
import { Button } from '@/app/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/Dialogs';
import { Card, CardHeader, CardTitle, CardContent } from "@/app/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/app/ui/avatar";
import '@testing-library/jest-dom';

// Mock Formspree for ContactPage tests
jest.mock('@formspree/react', () => ({
  useForm: () => [{ errors: {}, submitting: false, succeeded: false }, jest.fn()],
  ValidationError: () => null
}));

describe('Home Page', () => {
  test('renders main sections and components', () => {
    render(<Home />);
    expect(screen.getByText('Your Social Life, Decentralized')).toBeInTheDocument();
    expect(screen.getByText('Privacy First')).toBeInTheDocument();
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('What Our Users Say')).toBeInTheDocument();
  });

  test('renders all feature cards', () => {
    render(<Home />);
    expect(screen.getAllByTestId('feature-card')).toHaveLength(6);
  });

  test('renders testimonials', () => {
    render(<Home />);
    expect(screen.getByText('Tung Le')).toBeInTheDocument();
    expect(screen.getByText('Le Tung')).toBeInTheDocument();
  });
});

describe('Features Page', () => {
  test('renders feature cards and dialogs', () => {
    render(<FeaturesPage />);
    expect(screen.getByText('Decentralized Control')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Decentralized Control'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('closes dialog on close button click', async () => {
    render(<FeaturesPage />);
    fireEvent.click(screen.getByText('Decentralized Control'));

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

describe('Contact Page', () => {
  test('renders contact form', () => {
    render(<ContactPage />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  test('submits form successfully', async () => {
    render(<ContactPage />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Test Message' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Thanks for reaching out!/i)).toBeInTheDocument();
    });
  });
});

describe('Header Component', () => {
  test('renders header with navigation links', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});

describe('Footer Component', () => {
  test('renders footer with copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/© \d{4} Your Company Name/i)).toBeInTheDocument();
  });
});

describe('FeatureCard Component', () => {
  test('renders card with icon, title, and description', () => {
    const icon = <svg data-testid="icon" />;
    render(
      <FeatureCard
        icon={icon}
        title="Test Feature"
        description="Test Description"
      />
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Test Feature')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});

describe('Button Component', () => {
  test('renders button and handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies correct styles based on variant prop', () => {
    const { rerender } = render(<Button variant="solid">Solid Button</Button>);
    expect(screen.getByText('Solid Button')).toHaveClass('bg-black text-white');

    rerender(<Button variant="outline">Outline Button</Button>);
    expect(screen.getByText('Outline Button')).toHaveClass('border border-black text-black');
  });
});

describe('Dialog Component', () => {
  test('renders dialog and handles close action', async () => {
    const handleClose = jest.fn();
    render(
      <Dialog isOpen={true} onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogHeader>
        <DialogContent>Test Content</DialogContent>
      </Dialog>
    );
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Card Component', () => {
  test('renders card with header and content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>Card Content</CardContent>
      </Card>
    );
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });
});

describe('Avatar Component', () => {
  test('renders avatar with image and fallback', () => {
    render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test Avatar" />
        <AvatarFallback>TA</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByAltText('Test Avatar')).toBeInTheDocument();

    // Simulate image error to show fallback
    const img = screen.getByAltText('Test Avatar');
    fireEvent.error(img);

    expect(screen.getByText('TA')).toBeInTheDocument();
  });
});