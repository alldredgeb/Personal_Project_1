update simple_customer_cart_and_purchase_history 
set quantity = $1, total = $2 
where customer_id = $3 and product_id = $4;