-- Migration: add helpful fields to programming_languages
USE weblearning;

-- Add a URL-friendly slug for each language
ALTER TABLE programming_languages
  ADD COLUMN slug VARCHAR(150) UNIQUE AFTER name;

-- Longer description field
ALTER TABLE programming_languages
  ADD COLUMN description TEXT AFTER recommended_courses;

-- Difficulty/level (Beginner/Intermediate/Advanced)
ALTER TABLE programming_languages
  ADD COLUMN level ENUM('Beginner','Intermediate','Advanced') NOT NULL DEFAULT 'Beginner' AFTER category;

-- Estimated duration (text like "4-6 weeks")
ALTER TABLE programming_languages
  ADD COLUMN duration VARCHAR(50) DEFAULT NULL AFTER level;

-- Published flag
ALTER TABLE programming_languages
  ADD COLUMN is_published TINYINT(1) NOT NULL DEFAULT 1 AFTER created_at;

-- Updated timestamp (nullable, auto-updates on change)
ALTER TABLE programming_languages
  ADD COLUMN updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

-- Optional: populate slug for existing rows (basic, lower-case, replace spaces with dashes)
UPDATE programming_languages
SET slug = LOWER(REPLACE(name, ' ', '-'))
WHERE slug IS NULL OR slug = '';