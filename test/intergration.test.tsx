import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Profile from '@/app/components/Profile';
import PostList from '@/app/posts/PostList';
import { FeatureCard } from '@/app/components/FeatureCard';
import Post from '@/app/components/Post';
import Home from '@/app/page';
import { WalletProvider } from '@/context/WalletContext';

// Mock supabase client
jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          limit: jest.fn(() => ({
            single: jest.fn(() => ({
              data: { username: 'testuser', bio: 'test bio' },
              error: null
            }))
          }))
        }))
      })),
      upsert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => ({
            data: { username: 'testuser', bio: 'updated bio' },
            error: null
          }))
        }))
      }))
    }))
  }
}));

describe('Integration Tests', () => {
  // Profile Component Integration Tests
  describe('Profile Component', () => {
    const renderProfile = () => {
      return render(
        <WalletProvider>
          <Profile />
        </WalletProvider>
      );
    };

    test('complete profile creation flow', async () => {
      renderProfile();
      
      // Initial state should show create profile button
      const createButton = screen.getByText('Create Profile');
      expect(createButton).toBeInTheDocument();
      
      // Click create profile
      fireEvent.click(createButton);
      
      // Fill in profile form
      const usernameInput = screen.getByPlaceholderText('Enter your username');
      const bioInput = screen.getByPlaceholderText('Tell us about yourself');
      
      await act(async () => {
        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(bioInput, 'This is my test bio');
      });
      
      // Submit form
      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);
      
      // Verify success message
      await waitFor(() => {
        expect(screen.getByText('Profile saved successfully!')).toBeInTheDocument();
      });
    });

    test('profile editing flow', async () => {
      renderProfile();
      
      // Click edit profile
      const editButton = await screen.findByText('Edit Profile');
      fireEvent.click(editButton);
      
      // Modify profile data
      const bioInput = screen.getByPlaceholderText('Tell us about yourself');
      await userEvent.clear(bioInput);
      await userEvent.type(bioInput, 'Updated bio text');
      
      // Save changes
      const saveButton = screen.getByText('Save Changes');
      fireEvent.click(saveButton);
      
      // Verify success message
      await waitFor(() => {
        expect(screen.getByText('Profile saved successfully!')).toBeInTheDocument();
      });
    });
  });

  // Post Component Integration Tests
  describe('Post Component', () => {
    test('post creation and interaction flow', async () => {
      render(<PostList />);
      
      // Click create post button
      const createButton = screen.getByText('Create New Post');
      fireEvent.click(createButton);
      
      // Fill post form
      const titleInput = screen.getByPlaceholderText('Post title');
      const contentInput = screen.getByPlaceholderText("What's on your mind?");
      
      await act(async () => {
        await userEvent.type(titleInput, 'Test Post');
        await userEvent.type(contentInput, 'This is a test post content');
      });
      
      // Submit post
      const postButton = screen.getByText('Post');
      fireEvent.click(postButton);
      
      // Verify post appears in list
      await waitFor(() => {
        expect(screen.getByText('Test Post')).toBeInTheDocument();
      });
    });

    test('post interaction features', () => {
      render(
        <Post
          title="Test Post"
          content="Test content"
          created_at={new Date().toISOString()}
          username="testuser"
          likes={0}
        />
      );
      
      // Test like button
      const likeButton = screen.getByText('0');
      fireEvent.click(likeButton);
      
      // Test comment button
      const commentButton = screen.getByText('Comment');
      fireEvent.click(commentButton);
      
      // Test share button
      const shareButton = screen.getByText('Share');
      fireEvent.click(shareButton);
    });
  });

  // Home Page Integration Test
  describe('Home Page', () => {
    test('renders all main sections and features', () => {
      render(<Home />);
      
      // Check main sections
      expect(screen.getByText('Your Social Life, Decentralized')).toBeInTheDocument();
      expect(screen.getByText('Privacy First')).toBeInTheDocument();
      expect(screen.getByText('End-to-End Encryption')).toBeInTheDocument();
      expect(screen.getByText('How It Works')).toBeInTheDocument();
      
      // Check navigation buttons
      expect(screen.getByText('Get Started')).toBeInTheDocument();
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });
  });
});