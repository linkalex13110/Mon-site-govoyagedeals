/*
  # Create offers table and security policies

  1. New Tables
    - `offers`
      - `id` (uuid, primary key)
      - `title` (varchar)
      - `description` (text)
      - `price` (decimal)
      - `image_url` (varchar)
      - `category` (varchar)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `status` (varchar)
      - `featured` (boolean)

  2. Security
    - Enable RLS on `offers` table
    - Add policies for:
      - Public read access
      - Admin-only write access
      - Admin-only delete access

  3. Functions
    - Get recent offers
    - Filter offers by category
    - Update offer status
    - Toggle featured status
*/

-- Create offers table
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(255),
  category VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, now()),
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, now()),
  status VARCHAR(50) DEFAULT 'active',
  featured BOOLEAN DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Public read access
CREATE POLICY "Offers are viewable by everyone" ON offers
  FOR SELECT
  USING (true);

-- Admin write access
CREATE POLICY "Offers can be created by admins" ON offers
  FOR INSERT
  WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Offers can be updated by admins" ON offers
  FOR UPDATE
  USING (
    auth.jwt() ->> 'role' = 'admin'
  )
  WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Offers can be deleted by admins" ON offers
  FOR DELETE
  USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Create functions
-- Get recent offers
CREATE OR REPLACE FUNCTION get_recent_offers(limit_count INTEGER DEFAULT 10)
RETURNS SETOF offers
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT *
  FROM offers
  WHERE status = 'active'
  ORDER BY created_at DESC
  LIMIT limit_count;
$$;

-- Filter offers by category
CREATE OR REPLACE FUNCTION get_offers_by_category(category_name VARCHAR)
RETURNS SETOF offers
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT *
  FROM offers
  WHERE category = category_name
    AND status = 'active'
  ORDER BY created_at DESC;
$$;

-- Update offer status
CREATE OR REPLACE FUNCTION update_offer_status(offer_id UUID, new_status VARCHAR)
RETURNS offers
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  updated_offer offers;
BEGIN
  IF auth.jwt() ->> 'role' != 'admin' THEN
    RAISE EXCEPTION 'Only admins can update offer status';
  END IF;

  UPDATE offers
  SET status = new_status,
      updated_at = TIMEZONE('utc'::text, now())
  WHERE id = offer_id
  RETURNING * INTO updated_offer;

  RETURN updated_offer;
END;
$$;

-- Toggle featured status
CREATE OR REPLACE FUNCTION toggle_offer_featured(offer_id UUID)
RETURNS offers
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  updated_offer offers;
BEGIN
  IF auth.jwt() ->> 'role' != 'admin' THEN
    RAISE EXCEPTION 'Only admins can toggle featured status';
  END IF;

  UPDATE offers
  SET featured = NOT featured,
      updated_at = TIMEZONE('utc'::text, now())
  WHERE id = offer_id
  RETURNING * INTO updated_offer;

  RETURN updated_offer;
END;
$$;

-- Create trigger for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_offers_updated_at
  BEFORE UPDATE ON offers
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();