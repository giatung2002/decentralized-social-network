import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/app/ui/button';
import '@testing-library/jest-dom';



describe('Button Component', () => {
    test('renders button with correct text', () => {
        render(<Button>Click Me</Button>);
        const buttonElement = screen.getByText(/Click Me/i);
        expect(buttonElement).toBeInTheDocument();
    });

    test('handles click event', () => {
        const handleClick = jest.fn(); 
        render(<Button onClick={handleClick}>Click Me</Button>);
        fireEvent.click(screen.getByText(/Click Me/i));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('applies correct styles based on variant prop', () => {
        const { rerender } = render(<Button variant="solid">Solid Button</Button>);
        const solidButton = screen.getByText(/Solid Button/i);
        expect(solidButton).toHaveClass('bg-black text-white'); 

        rerender(<Button variant="outline">Outline Button</Button>);
        const outlineButton = screen.getByText(/Outline Button/i);
        expect(outlineButton).toHaveClass('border border-black text-black'); 
    });
});