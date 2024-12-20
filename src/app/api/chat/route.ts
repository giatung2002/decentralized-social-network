import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant specializing in blockchain, cryptocurrency, and Web3 technologies."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenAI API error:', data);
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      throw new Error(data.error?.message || 'Failed to get response from OpenAI');
    }

    return NextResponse.json({
      message: data.choices[0].message.content
    });

  } catch (error: any) {
    console.error('ChatGPT API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get response from ChatGPT' },
      { status: 500 }
    );
  }
}