import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactPage from '@/app/contact/page';
import FeaturesPage from '@/app/features/page';

describe('Security Tests', () => {
  test('contact form sanitizes inputs', () => {
    render(<ContactPage />);
    const inputs = [
      { field: /Name/i, value: '<script>alert("xss")</script>' },
      { field: /Email/i, value: 'javascript:alert("xss")' },
      { field: /Message/i, value: '"><img src=x onerror=alert("xss")>' }
    ];

    inputs.forEach(({ field, value }) => {
      const input = screen.getByLabelText(field);
      fireEvent.change(input, { target: { value } });
      expect(input).not.toContainHTML(value);
    });
  });

  test('features page external links have security attributes', () => {
    render(<FeaturesPage />);
    const externalLinks = screen.getAllByRole('link');
    
    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
      expect(link).toHaveAttribute('target', '_blank');
    });
  });
});