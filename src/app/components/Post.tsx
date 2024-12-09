'use client';

import React from 'react';
import { formatDistance } from 'date-fns';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface PostProps {
  title: string;
  content: string;
  created_at: string;
  username: string;
  likes: number;
  image_url?: string;
}

export default function Post({ title, content, created_at, username, likes, image_url }: PostProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4">
      {/* Author info */}
      <div className="flex items-center mb-4">
        <div className="ml-3">
          <p className="font-semibold">{username}</p>
          <p className="text-gray-500 text-sm">
            {formatDistance(new Date(created_at), new Date(), { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Post content */}
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{content}</p>
      
      {/* Post image if exists */}
      {image_url && (
        <img 
          src={image_url} 
          alt="Post image" 
          className="rounded-lg mb-4 max-h-96 w-full object-cover"
        />
      )}

      {/* Interaction buttons */}
      <div className="flex items-center space-x-4 text-gray-500">
        <button className="flex items-center space-x-2 hover:text-red-500">
          <Heart size={20} />
          <span>{likes}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-blue-500">
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500">
          <Share2 size={20} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}