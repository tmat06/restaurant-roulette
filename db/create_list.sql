INSERT INTO FavoriteLists
(name, search_name)
VALUES
($1, $1)
RETURNING *;