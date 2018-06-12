select sum(quantity) from simple_customer_cart_and_purchase_history 
where customer_id = $1 
and purchased = false;