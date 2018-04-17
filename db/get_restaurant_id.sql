select saved_id
from Restaurants
where list_name = $1
and
user_id = $2
group by saved_id;