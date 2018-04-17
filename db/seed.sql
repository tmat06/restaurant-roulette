CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    auth_id TEXT,
    display_name TEXT,
    img TEXT
);

CREATE TABLE IF NOT EXISTS Restaurants (
    id SERIAL PRIMARY KEY,
    list_name TEXT,
    address TEXT,    
    name TEXT,
    rating TEXT,
    user_id TEXT,
    saved_id TEXT
);

CREATE TABLE IF NOT EXISTS FavoriteLists (
    id SERIAL PRIMARY KEY,
    name TEXT
);

INSERT INTO Restaurants
(id, list_name, name, rating, user_id, saved_id)
VALUES
(25, 'Provo', 'chocolate pie cafe', 3.8, 'google-oauth2|105268168536098828843', 15);