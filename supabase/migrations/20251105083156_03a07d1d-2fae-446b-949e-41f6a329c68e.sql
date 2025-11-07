-- Create books table
CREATE TABLE public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  author TEXT NOT NULL,
  cover_image TEXT,
  amazon_link TEXT NOT NULL,
  coming_soon BOOLEAN DEFAULT false,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on books table
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Public can read all books
CREATE POLICY "Anyone can view books"
  ON public.books
  FOR SELECT
  USING (true);

-- Create user_roles table for admin management
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Only admins can manage books
CREATE POLICY "Admins can insert books"
  ON public.books
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update books"
  ON public.books
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete books"
  ON public.books
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Only admins can manage roles
CREATE POLICY "Admins can manage roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));