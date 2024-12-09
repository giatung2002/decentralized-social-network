'use client';

import React, { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { Button } from "@/app/ui/button";
import { User, Camera, Edit2 } from 'lucide-react'; // Import icons

interface UserProfile {
  username: string;
  bio: string;
  avatar: string;
  walletAddress: string;
}

export default function Profile() {
  const { account } = useWallet();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
  });

  const handleSave = async () => {
    try {
      if (!account) return;

      // Dynamically import ipfs-http-client
      const { create } = await import('ipfs-http-client');

      const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
      const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;

      if (!projectId || !projectSecret) {
        throw new Error('Infura Project ID and Secret must be defined in environment variables');
      }

      const auth = 'Basic ' + Buffer.from(`${projectId}:${projectSecret}`).toString('base64');

      const ipfsClient = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
          authorization: auth,
        },
      });

      const profileData = {
        username: formData.username,
        bio: formData.bio,
        walletAddress: account,
        avatar: '',
      };

      const added = await ipfsClient.add(JSON.stringify(profileData));
      console.log('Profile saved with CID:', added.path);
      
      setProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {isEditing ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 text-white hover:bg-blue-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  placeholder="Tell us about yourself"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="flex space-x-4 justify-end pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="px-6"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="px-6 bg-blue-500 hover:bg-blue-600"
              >
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            {profile ? (
              <div className="space-y-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                    {profile.avatar ? (
                      <img 
                        src={profile.avatar} 
                        alt={profile.username} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">{profile.username}</h2>
                  <p className="text-gray-600 max-w-md mx-auto">{profile.bio}</p>
                  <p className="text-sm text-gray-500">{account}</p>
                </div>

                <Button 
                  onClick={() => setIsEditing(true)}
                  className="mt-6 inline-flex items-center space-x-2"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </Button>
              </div>
            ) : (
              <div className="py-12">
                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No profile found</p>
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Create Profile
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}