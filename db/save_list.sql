INSERT INTO Restaurants
(list_name, name, rating, user_id, saved_id)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;