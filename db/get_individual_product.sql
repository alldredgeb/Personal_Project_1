select * from simple_products 
join alternate_simple_product_images 
on simple_products.id = alternate_simple_product_images.original_product_id 
where simple_products.id = $1;