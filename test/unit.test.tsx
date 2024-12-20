import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeatureCard } from '@/app/components/FeatureCard';
import { Button } from '@/app/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/ui/textarea';
import Post from '@/app/components/Post';
import { Card, CardHeader, CardTitle } from '@/app/ui/card';

describe('Unit Tests', () => {
  // FeatureCard Component Tests
  describe('FeatureCard Component', () => {
    test('renders with all props', () => {
      const props = {
        icon: <div data-testid="test-icon" />,
        title: 'Test Feature',
        description: 'Test Description'
      };
      
      render(<FeatureCard {...props} />);
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('Test Feature')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  // Button Component Tests
  describe('Button Component', () => {
    test('renders different variants', () => {
      const { rerender } = render(<Button variant="solid">Solid</Button>);
      expect(screen.getByText('Solid')).toHaveClass('bg-black');
      
      rerender(<Button variant="outline">Outline</Button>);
      expect(screen.getByText('Outline')).toHaveClass('border-black');
    });

    test('handles click events', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      
      fireEvent.click(screen.getByText('Click Me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('supports disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByText('Disabled')).toBeDisabled();
    });
  });

  // Input Component Tests
  describe('Input Component', () => {
    test('renders with placeholder', () => {
      render(<Input placeholder="Test placeholder" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
    });

    test('handles value changes', () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      expect(handleChange).toHaveBeenCalled();
    });
  });

  // Post Component Tests
  describe('Post Component', () => {
    const defaultProps = {
      title: 'Test Post',
      content: 'Test content',
      created_at: new Date().toISOString(),
      username: 'testuser',
      likes: 0
    };

    test('renders post content correctly', () => {
      render(<Post {...defaultProps} />);
      
      expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.content)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.username)).toBeInTheDocument();
    });

    test('renders image when provided', () => {
      render(<Post {...defaultProps} image_url="test.jpg" />);
      const image = screen.getByAltText('Post image');
      expect(image).toHaveAttribute('src', 'test.jpg');
    });
  });

  // Card Component Tests
  describe('Card Components', () => {
    test('renders card with header and title', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
          </CardHeader>
        </Card>
      );
      
      expect(screen.getByText('Test Card')).toBeInTheDocument();
    });
  });
});