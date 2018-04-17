select address
from Restaurants
where list_name = $1
AND
user_id = $2
GROUP BY address;