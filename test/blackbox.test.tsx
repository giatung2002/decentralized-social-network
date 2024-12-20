import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Profile from '@/app/components/Profile';
import Home from '@/app/page';
import FeaturesPage from '@/app/features/page';
import { WalletProvider } from '@/context/WalletContext';

// Mock the WalletContext
jest.mock('@/context/WalletContext', () => ({
  useWallet: () => ({
    account: '0x123...789',
    connect: jest.fn(),
    disconnect: jest.fn()
  }),
  WalletProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock Supabase client
jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          limit: () => ({
            single: async () => ({
              data: {
                username: 'TestUser',
                bio: 'Test Bio',
                avatar: ''
              },
              error: null
            })
          })
        })
      }),
      upsert: () => ({
        select: () => ({
          single: async () => ({
            data: {
              username: 'UpdatedUser',
              bio: 'Updated Bio',
              avatar: ''
            },
            error: null
          })
        })
      })
    })
  }
}));

describe('Black Box Testing - User Flows', () => {
  describe('Profile Creation and Editing Flow', () => {
    test('complete profile creation flow', async () => {
      render(
        <WalletProvider>
          <Profile />
        </WalletProvider>
      );

      // Initial state should show create profile button
      expect(screen.getByText('Create Profile')).toBeInTheDocument();

      // Click create profile
      fireEvent.click(screen.getByText('Create Profile'));

      // Form should be visible
      expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Tell us about yourself')).toBeInTheDocument();

      // Fill out form
      fireEvent.change(screen.getByPlaceholderText('Enter your username'), {
        target: { value: 'TestUser' }
      });
      fireEvent.change(screen.getByPlaceholderText('Tell us about yourself'), {
        target: { value: 'Test Bio' }
      });

      // Submit form
      await act(async () => {
        fireEvent.click(screen.getByText('Save Changes'));
      });

      // Check success message
      await waitFor(() => {
        expect(screen.getByText('Profile saved successfully!')).toBeInTheDocument();
      });
    });

    test('profile editing validation', async () => {
      render(
        <WalletProvider>
          <Profile />
        </WalletProvider>
      );

      // Click edit profile
      fireEvent.click(screen.getByText('Edit Profile'));

      // Try to save with empty username
      fireEvent.change(screen.getByPlaceholderText('Enter your username'), {
        target: { value: '' }
      });

      await act(async () => {
        fireEvent.click(screen.getByText('Save Changes'));
      });

      // Should show validation error
      expect(screen.getByText('Username is required')).toBeInTheDocument();
    });
  });

  describe('Navigation Flow', () => {
    test('user can navigate through main sections', async () => {
      render(<Home />);

      // Check main sections are visible
      expect(screen.getByText('Your Social Life, Decentralized')).toBeInTheDocument();
      expect(screen.getByText('How It Works')).toBeInTheDocument();
      expect(screen.getByText('What Our Users Say')).toBeInTheDocument();

      // Test navigation to features
      const featuresLink = screen.getByText('Features');
      fireEvent.click(featuresLink);

      // Should show features content
      expect(screen.getByText('Our Features – Decentralized, Secure, Empowering')).toBeInTheDocument();
    });
  });

  describe('Features Page Interaction', () => {
    test('feature cards expand with details', async () => {
      render(<FeaturesPage />);

      // Click on a feature card
      fireEvent.click(screen.getByText('Decentralized Control'));

      // Dialog should appear with details
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText(/In our decentralized network/)).toBeInTheDocument();
      });

      // Close dialog
      fireEvent.click(screen.getByRole('button', { name: /close/i }));

      // Dialog should disappear
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    test('handles network errors gracefully', async () => {
      // Mock a failed API call
      jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const mockError = new Error('Network error');
      jest.mock('@/lib/supabaseClient', () => ({
        supabase: {
          from: () => ({
            select: () => ({
              eq: () => ({
                limit: () => ({
                  single: async () => ({
                    data: null,
                    error: mockError
                  })
                })
              })
            })
          })
        }
      }));

      render(
        <WalletProvider>
          <Profile />
        </WalletProvider>
      );

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText('Error loading profile. Please try again.')).toBeInTheDocument();
      });
    });
  });
});