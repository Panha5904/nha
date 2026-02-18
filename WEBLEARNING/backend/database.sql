-- Create the database
CREATE DATABASE IF NOT EXISTS weblearning;
USE weblearning;

-- Create programming_languages table
CREATE TABLE IF NOT EXISTS programming_languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    use_cases TEXT NOT NULL,
    recommended_courses TEXT NOT NULL,
    logo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO programming_languages (name, category, use_cases, recommended_courses, logo_url) VALUES
('Python', 'Foundational', 'Data Science, Web Development (Backend), Automation, Machine Learning', 'Python for Everybody Specialization (Coursera/University of Michigan)', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'),
('JavaScript', 'Foundational', 'Web Development (Frontend & Backend), Mobile Development, Game Development', 'Full-Stack Engineer Career Path (Codecademy)', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'),
('Java', 'Foundational', 'Android Mobile App Development, Enterprise Software', 'Computer Science: Programming with a Purpose (Coursera/Princeton)', 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg');
