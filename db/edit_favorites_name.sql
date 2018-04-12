UPDATE Restaurants
SET list_name = $3
WHERE user_id = $1
AND
list_name = $2;