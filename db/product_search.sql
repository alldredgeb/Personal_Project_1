select * from simple_products 
where description ilike '%' || $1 || '%' 
order by id;