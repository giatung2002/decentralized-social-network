import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeatureCard } from '@/app/components/FeatureCard';

describe('FeatureCard Component', () => {
    test('renders icon, title, and description', () => {
        const icon = <svg data-testid="icon" />;
        const title = "Test Feature";
        const description = "This is a test feature.";

        render(<FeatureCard icon={icon} title={title} description={description} />);

        expect(screen.getByTestId('icon')).toBeInTheDocument();
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
    });
});
