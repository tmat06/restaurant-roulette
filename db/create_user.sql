INSERT INTO Users
(auth_id, display_name, img)
VALUES
($1, $2, $3)
RETURNING *;