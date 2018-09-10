select * from simple_customer_cart_and_purchase_history 
where customer_id = $1 
and purchased = false 
order by product_id;