delete from simple_customer_cart_and_purchase_history 
where customer_id = $1 and product_id = $2;