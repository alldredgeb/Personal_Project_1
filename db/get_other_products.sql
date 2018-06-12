select * from simple_products 
where collection = $1 
order by id 
limit 9 offset $2;