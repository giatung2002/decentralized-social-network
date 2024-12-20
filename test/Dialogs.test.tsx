import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/Dialogs';

describe('Dialog Component', () => {
  test('calls onClose when close button is clicked', async () => {
    const handleClose = jest.fn();
    render(
      <Dialog isOpen={true} onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Test Dialog</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <p>Dialog Content</p>
        </DialogContent>
      </Dialog>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });
});