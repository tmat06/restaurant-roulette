INSERT INTO Restaurants
(list_name, name, rating, user_id)
VALUES
($1, $2, $3, $4)
RETURNING *;