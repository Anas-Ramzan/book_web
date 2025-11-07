-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on subscriptions table
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Public can insert subscriptions (anyone can subscribe)
CREATE POLICY "Anyone can subscribe"
  ON public.subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only admins can view subscriptions
CREATE POLICY "Admins can view subscriptions"
  ON public.subscriptions
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON public.subscriptions(email);

