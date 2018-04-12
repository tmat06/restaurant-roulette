SELECT *
FROM Restaurants
WHERE list_name = $1
AND
user_id = $2;