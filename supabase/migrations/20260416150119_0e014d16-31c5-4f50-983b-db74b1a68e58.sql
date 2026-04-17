
-- Drop the overly permissive policy
DROP POLICY "Anyone can submit consultation" ON public.consultations;

-- Recreate with specific roles
CREATE POLICY "Public can submit consultation"
  ON public.consultations FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) > 0 AND char_length(name) <= 255
    AND char_length(email) > 0 AND char_length(email) <= 255
    AND char_length(phone) > 0 AND char_length(phone) <= 50
  );
