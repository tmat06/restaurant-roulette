select id
from restaurants
where list_name = $1 and user_id = $2;