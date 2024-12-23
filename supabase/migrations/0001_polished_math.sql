/*
  # Create items table for search functionality

  1. New Tables
    - `items`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `items` table
    - Add policy for authenticated users to read items
*/

CREATE TABLE IF NOT EXISTS items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Create policy for reading items
CREATE POLICY "Anyone can read items"
  ON items
  FOR SELECT
  TO authenticated
  USING (true);