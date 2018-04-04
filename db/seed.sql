CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    auth_id TEXT,
    display_name TEXT,
    img TEXT
);