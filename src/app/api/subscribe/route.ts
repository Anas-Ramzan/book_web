import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = createClient();

    // Insert subscription into database
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([
        {
          email: email.toLowerCase().trim(),
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        );
      }

      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully subscribed!', data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

