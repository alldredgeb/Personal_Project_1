import React, { Component } from 'react';
import refresh_icon from './../images/refresh_icon.svg';
import { Link } from 'react-router-dom';

class Cart extends Component {

  render() {
    return (
      <div className="overall_cart_container">
      
        <header className="cart_header">
          <div className="cart_breadcrumb">
            <Link to="/"><p className="cart_breadcrumb_link_to_home">Home</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="cart_breadcrumb_description">Cart</p>
          </div>
        </header>

        <p className="cart_name_header">Shopping Cart</p>

        <p>Your cart is currently empty.</p>

        <p>Continue browsing <Link to="/">here.</Link></p>

        <div className="filled_cart_headers_container">
          <p>Product</p>
          <div className="filled_cart_price_quantity_total_headers_container">
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>
        </div>

        <div className="filled_cart_actual_product_item_container">
          <Link to="/product/:id"><img className="cart_item_image" src="" alt="Cart Item"/></Link>
          <div className="cart_item_details_container">
            <Link to="/product/:id"><p>Product Name</p></Link>
            <p>Color / Size</p>
            <p>Remove</p>
          </div>
          <div className="cart_item_price_quantity_total_container">
            <p>$x</p>
            <p>1x</p>
            <p>$x</p>
          </div>
        </div>

        <div className="instructions_subtotal_refresh_redirect_checkout_container">
          <div className="special_instructions_container">
            <p className="special_instructions_header">Special instructions for seller</p>
            <textarea className="special_instructions_message_textarea"></textarea>
          </div>
          <div className="subtotal_and_buttons_container">
            <p>Subtotal $x</p>
            <p>Shipping & taxes calculated at checkout</p>
            <div className="refresh_and_redirect_buttons_container">
              <img className="refresh_icon" src={refresh_icon} alt="Refresh Icon"/>
              <Link to="/"><button>CONTINUE SHOPPING</button></Link>
            </div>
            <Link to="/"><button>CHECK OUT</button></Link>
          </div>
        </div>
      
      </div>

    )
  }

}

export default Cart;