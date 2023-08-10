-- profiles table

CREATE TYPE profiles_role AS ENUM ('USER', 'ADMIN', 'EDITOR');

CREATE TABLE profiles (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    photo_url text,
    display_name text,
    username text UNIQUE CHECK (
        username ~* '^[a-zA-Z0-9_]+$'
        AND char_length(username) > 2
        AND char_length(username) < 15
    ),
    role profiles_role NOT NULL DEFAULT 'USER',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- insert profile on signup

CREATE FUNCTION public.create_new_user_profile() 
RETURNS trigger 
LANGUAGE plpgsql 
SECURITY DEFINER SET search_path = public 
AS $$ 
BEGIN
  INSERT INTO
    public.profiles (id, photo_url, display_name)
  VALUES
    (
      NEW.id,
      NEW.raw_user_meta_data ->> 'avatar_url',
      NEW.raw_user_meta_data ->> 'full_name'
    );
  RETURN NEW;
END;
$$;

CREATE TRIGGER create_profile_on_signup
AFTER INSERT ON auth.users 
FOR EACH ROW EXECUTE PROCEDURE public.create_new_user_profile();

-- universal date functions

CREATE EXTENSION IF NOT EXISTS moddatetime;

CREATE OR REPLACE FUNCTION public.update_dates()
RETURNS trigger AS $$
BEGIN
    new.updated_at = now();
    new.created_at = old.created_at;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.insert_dates()
RETURNS trigger AS $$
BEGIN
    new.created_at = now();
    new.updated_at = now();
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- profile dates

DROP TRIGGER IF EXISTS profiles_update_dates
  ON profiles;
CREATE TRIGGER profiles_update_dates
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE PROCEDURE update_dates();

DROP TRIGGER IF EXISTS profiles_insert_dates
  ON profiles;
CREATE TRIGGER profiles_insert_dates
BEFORE INSERT ON profiles
FOR EACH ROW EXECUTE PROCEDURE insert_dates();

-- RLS Policies

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Public profiles are viewable by everyone
CREATE POLICY "rls_profiles_read_public"
  ON profiles FOR SELECT
  USING (true);

-- Users can insert their own profile
CREATE POLICY "rls_profiles_create_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "rls_profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
