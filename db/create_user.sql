insert into simple_customer (sc_auth0) 
values ($1) 
returning *;