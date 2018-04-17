INSERT INTO Restaurants
(list_name, name, rating, user_id, saved_id, address)
VALUES
($1, $2, $3, $4, $5, $6)
RETURNING *;