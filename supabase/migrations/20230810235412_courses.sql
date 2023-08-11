--- COURSES

CREATE TABLE courses (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    short_id text UNIQUE NOT NULL DEFAULT 'xxxxxx',
    slug text NOT NULL GENERATED ALWAYS AS (slugify(name)) STORED,
    cover_photo text,
    author uuid NOT NULL DEFAULT auth.uid() REFERENCES profiles(id) ON DELETE CASCADE ON UPDATE CASCADE,
    name text NOT NULL CHECK (char_length(name) > 2),
    description text NOT NULL CHECK (char_length(description) > 3),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()    
);

CREATE TRIGGER trigger_courses_gen_short_id BEFORE INSERT ON courses FOR EACH ROW EXECUTE PROCEDURE unique_short_id();