import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactPage from '@/app/contact/page';

// Mock formspree
jest.mock('@formspree/react', () => ({
  useForm: () => [{
    succeeded: false,
    errors: [],
    submitting: false
  }, jest.fn()]
}));

describe('Form Tests', () => {
  describe('Contact Form', () => {
    test('validates required fields', async () => {
      render(<ContactPage />);
      
      // Try to submit empty form
      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);
      
      // Check for validation messages
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/message is required/i)).toBeInTheDocument();
      });
    });

    test('handles form submission', async () => {
      render(<ContactPage />);
      
      // Fill out form
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' }
      });
      
      fireEvent.change(screen.getByLabelText(/subject/i), {
        target: { value: 'Test Subject' }
      });
      
      fireEvent.change(screen.getByLabelText(/message/i), {
        target: { value: 'Test message content' }
      });
      
      // Submit form
      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);
      
      // Check for success message
      await waitFor(() => {
        expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
      });
    });

    test('handles form errors', async () => {
      // Mock form submission error
      jest.mock('@formspree/react', () => ({
        useForm: () => [{
          succeeded: false,
          errors: [{ message: 'Failed to send message' }],
          submitting: false
        }, jest.fn()]
      }));

      render(<ContactPage />);
      
      const submitButton = screen.getByRole('button', { name: /submit/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
      });
    });
  });
});