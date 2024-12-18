CREATE TABLE portfolio_projects (
    id SERIAL PRIMARY KEY,               -- Unique identifier for each project
    title VARCHAR(255) NOT NULL,         -- Title of the project
    description TEXT,                    -- Detailed description of the project
    technologies_used TEXT,              -- List of technologies used (comma-separated or JSON)
    repository_link VARCHAR(255),        -- Link to the GitHub or other repository
    live_demo_link VARCHAR(255),         -- Link to the live demo (if applicable)
    date_completed DATE,                 -- Completion date of the project
    image_url VARCHAR(255),              -- URL to an image representing the project
    created_at TIMESTAMP DEFAULT NOW()  -- Timestamp of when the project was added
    
);
