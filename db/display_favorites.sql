select list_name
from Restaurants
join Users 
on auth_id = user_id
where Users.id = $1
group by list_name;