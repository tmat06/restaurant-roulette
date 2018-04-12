DELETE FROM Restaurants
WHERE list_name = $1;

DELETE FROM FavoriteLists
where name = $1;