INSERT INTO users
(display_name, auth_id, img)
VALUES
($1, $2, $3)
RETURNING *;