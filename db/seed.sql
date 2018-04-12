CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    auth_id TEXT,
    display_name TEXT,
    img TEXT
);

CREATE TABLE IF NOT EXISTS Restaurants (
    id SERIAL PRIMARY KEY,
    list_name TEXT,
    name TEXT,
    rating TEXT,
    user_id TEXT,
    saved_id TEXT
);

CREATE TABLE IF NOT EXISTS FavoriteLists (
    id SERIAL PRIMARY KEY,
    name TEXT
);