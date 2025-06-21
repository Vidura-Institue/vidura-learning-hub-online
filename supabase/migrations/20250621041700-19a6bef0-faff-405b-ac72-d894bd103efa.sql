
-- Create a profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT,
  grade_level INTEGER CHECK (grade_level >= 1 AND grade_level <= 13),
  school TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create subjects table
CREATE TABLE public.subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  grade_level INTEGER NOT NULL CHECK (grade_level >= 1 AND grade_level <= 13),
  description TEXT,
  icon_emoji TEXT DEFAULT '📚',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create learning materials table
CREATE TABLE public.learning_materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT CHECK (content_type IN ('video', 'document', 'quiz', 'exercise')),
  content_url TEXT,
  grade_level INTEGER NOT NULL CHECK (grade_level >= 1 AND grade_level <= 13),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_materials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for subjects (public read access)
CREATE POLICY "Anyone can view subjects" ON public.subjects
  FOR SELECT USING (true);

-- RLS Policies for learning materials (public read access for authenticated users)
CREATE POLICY "Authenticated users can view learning materials" ON public.learning_materials
  FOR SELECT USING (auth.role() = 'authenticated');

-- Insert sample subjects for different grades
INSERT INTO public.subjects (name, grade_level, description, icon_emoji) VALUES
-- Grade 1-5 (Primary)
('Mathematics', 1, 'Basic arithmetic and number concepts', '🔢'),
('Sinhala', 1, 'Mother tongue language skills', '🇱🇰'),
('English', 1, 'Second language fundamentals', '🇬🇧'),
('Environmental Studies', 1, 'Basic science and environment', '🌱'),

('Mathematics', 6, 'Advanced arithmetic and algebra basics', '📐'),
('Sinhala', 6, 'Literature and advanced language', '📖'),
('English', 6, 'Grammar and comprehension', '📝'),
('Science', 6, 'Basic physics, chemistry, and biology', '🔬'),
('History', 6, 'Sri Lankan and world history', '🏛️'),
('Geography', 6, 'Physical and human geography', '🌍'),

-- Grade 11-13 (Advanced Level)
('Combined Mathematics', 12, 'Pure and applied mathematics', '📊'),
('Physics', 12, 'Advanced physics concepts', '⚛️'),
('Chemistry', 12, 'Organic and inorganic chemistry', '⚗️'),
('Biology', 12, 'Advanced biological sciences', '🧬'),
('ICT', 12, 'Information and Communication Technology', '💻'),
('Economics', 12, 'Micro and macroeconomics', '📈'),
('Business Studies', 12, 'Commerce and business principles', '💼');

-- Insert sample learning materials
INSERT INTO public.learning_materials (subject_id, title, description, content_type, grade_level) VALUES
((SELECT id FROM public.subjects WHERE name = 'Mathematics' AND grade_level = 1 LIMIT 1), 'Counting Numbers 1-10', 'Learn to count from 1 to 10 with fun activities', 'video', 1),
((SELECT id FROM public.subjects WHERE name = 'Mathematics' AND grade_level = 1 LIMIT 1), 'Addition Basics', 'Introduction to adding numbers', 'exercise', 1),
((SELECT id FROM public.subjects WHERE name = 'English' AND grade_level = 1 LIMIT 1), 'ABC Learning', 'Learn the English alphabet', 'video', 1),
((SELECT id FROM public.subjects WHERE name = 'Combined Mathematics' AND grade_level = 12 LIMIT 1), 'Calculus Fundamentals', 'Introduction to differential calculus', 'document', 12),
((SELECT id FROM public.subjects WHERE name = 'Physics' AND grade_level = 12 LIMIT 1), 'Mechanics', 'Newton''s laws and motion', 'video', 12);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
