'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Post from '@/app/components/Post';
import { Button } from "@/app/ui/button";

interface PostData {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  likes: number;
  image_url?: string;
  profiles: {
    username: string;
  };
}

export default function PostList() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image_url: '',
  });

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            username
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async () => {
    try {
      // First, get the profile ID
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id');

      if (profileError) throw profileError;
      
      // Check if we have any profiles
      if (!profiles || profiles.length === 0) {
        alert('Please create a profile first');
        return;
      }

      // Use the first profile found
      const profileId = profiles[0].id;

      // Create the post
      const { error: postError } = await supabase
        .from('posts')
        .insert({
          title: newPost.title,
          content: newPost.content,
          image_url: newPost.image_url,
          user_id: profileId,
        });

      if (postError) throw postError;

      setIsCreating(false);
      setNewPost({ title: '', content: '', image_url: '' });
      fetchPosts();
    } catch (error) {
      console.error('Error details:', error);
      alert('Error creating post. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Button
        onClick={() => setIsCreating(true)}
        className="mb-6 w-full bg-blue-500 hover:bg-blue-600"
      >
        Create New Post
      </Button>

      {isCreating && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <input
            type="text"
            placeholder="Post title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <textarea
            placeholder="What's on your mind?"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="w-full mb-4 p-2 border rounded h-32"
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={newPost.image_url}
            onChange={(e) => setNewPost({ ...newPost, image_url: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreatePost}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Post
            </Button>
          </div>
        </div>
      )}

      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          content={post.content}
          created_at={post.created_at}
          username={post.profiles.username}
          likes={post.likes}
          image_url={post.image_url}
        />
      ))}
    </div>
  );
}