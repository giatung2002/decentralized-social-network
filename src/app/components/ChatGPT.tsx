'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Bot, Send, X } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatGPTProps {
  onClose: () => void;
}

interface Position {
  x: number;
  y: number;
}

export default function ChatGPT({ onClose }: ChatGPTProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: 'Hi! I\'m your Web3 assistant. Ask me anything about blockchain, crypto, or decentralized technologies!',
          timestamp: new Date()
        }
      ]);
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      const botMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && dragRef.current) {
      setPosition({
        x: e.clientX - dragRef.current.x,
        y: e.clientY - dragRef.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    dragRef.current = null;
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="chat-container"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '400px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 1100
      }}
    >
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px',
          borderBottom: '1px solid #e0e0e0',
          cursor: 'grab'
        }}
        onMouseDown={handleMouseDown}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bot className="w-5 h-5 text-blue-500" />
          <h3 style={{ fontWeight: '600' }}>Web3 Assistant</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div 
        style={{
          height: '400px',
          overflowY: 'auto',
          padding: '12px',
          backgroundColor: '#fafafa'
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '8px'
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                borderRadius: '8px',
                padding: '8px 12px',
                backgroundColor: message.role === 'user' ? '#3b82f6' : '#e5e7eb',
                color: message.role === 'user' ? '#fff' : '#333'
              }}
            >
              <p style={{ margin: 0 }}>{message.content}</p>
              <span style={{ display: 'block', fontSize: '12px', opacity: '0.7', marginTop: '4px' }}>
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '12px', borderTop: '1px solid #e0e0e0' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Web3..."
            disabled={isLoading}
            style={{
              flex: '1',
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
