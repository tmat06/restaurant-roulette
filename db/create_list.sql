INSERT INTO FavoriteLists
(name)
VALUES
($1)
RETURNING *;