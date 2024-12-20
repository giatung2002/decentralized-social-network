import React from 'react';
import { render } from '@testing-library/react';
import ContactPage from '@/app/contact/page';
import FeaturesPage from '@/app/features/page';
import Home from '@/app/page';

describe('Performance Tests', () => {
  test('pages render within performance budget', () => {
    const components = [
      { Component: ContactPage, name: 'Contact Page' },
      { Component: FeaturesPage, name: 'Features Page' },
      { Component: Home, name: 'Home Page' }
    ];

    components.forEach(({ Component, name }) => {
      const start = performance.now();
      render(<Component />);
      const end = performance.now();
      
      const renderTime = end - start;
      expect(renderTime).toBeLessThan(200); // 200ms budget
      console.log(`${name} render time: ${renderTime}ms`);
    });
  });
});