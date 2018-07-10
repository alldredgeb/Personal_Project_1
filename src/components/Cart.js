import React, { Component } from 'react';
import refresh_icon from './../images/refresh_icon.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adjustView, loadCartContents, updateCart, addCartItemCount } from './../ducks/reducer';
import axios from 'axios';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_modifying: 0,
      product_price: 0,
      quantity: 0
    }
    this.getProductsInCart = this.getProductsInCart.bind(this);
    this.getCartItemCount = this.getCartItemCount.bind(this);
    this.updateQuantityOnChange = this.updateQuantityOnChange.bind(this);
    this.deleteFromCartOnClick = this.deleteFromCartOnClick.bind(this);
  }

  componentDidMount() {
    this.getProductsInCart();
  }

  getProductsInCart() {
    axios.get('/api/get_products_in_cart').then( productsInCartResponse => {
      console.log('products from cart response', productsInCartResponse.data);
      this.props.loadCartContents(productsInCartResponse.data);
    })
  }

  getCartItemCount() {
    axios.get('/api/get_cart_item_count').then( cartItemCountResponse => {
      if(cartItemCountResponse.data < 1) {
        this.props.addCartItemCount(0);
      } else {
        this.props.addCartItemCount(cartItemCountResponse.data);
      }
    })
  }

  updateQuantityOnChange(event, product_id, product_price) {
    console.log('event data', event)
    let item_price = product_price.replace(/[^\d.]/g, '');
    let product = parseInt(item_price) * parseInt(event.target.value);
    let item_total = (product).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    axios.put(`/api/update_quantity`, {
      quantity: +event.target.value,
      total: item_total,
      product_id: product_id
    }).then( response => {
      console.log('update_quantity response', response);
    }).then( () => {
      this.getProductsInCart();
    }).catch( error => {
      console.log('update quantity error', error)
    })
  }

  deleteFromCartOnClick(delete_product_id) {
    axios.delete(
      `/api/delete_from_cart/${delete_product_id}`
    ).then( () => {
      this.getProductsInCart();
    }).then( () => {
      this.getCartItemCount();
    }).catch( error => {
      console.log('remove cart item error', error )
    })
  }

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
        
        {this.props.products_in_cart[0] ? null :
        <div>
          <p className="cart_name_header">Shopping Cart</p>
          <p>Your cart is currently empty.</p>
          <p>Continue browsing <Link to="/">here.</Link></p>
        </div>
         }

        {!this.props.products_in_cart[0] ? null :
        <div className="filled_cart_headers_container">
          <p>Product</p>
          <div className="filled_cart_price_quantity_total_headers_container">
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>
        </div>
        }

        {this.props.products_in_cart.map ( obj => {
          return (
          <div key={obj.id} className="filled_cart_actual_product_item_container">
            <Link to={`/product/${obj.product_id}`}><img className="cart_item_image" src={obj.img_url} alt="Cart Item"/></Link>
            <div className="cart_item_details_container">
              <Link to={`/product/${obj.product_id}`}><p className="cart_item_description">{obj.description}</p></Link>
              <p className="cart_item_color">{obj.colour}</p>
              <p>/</p>
              <p className="cart_item_size">{obj.size}</p>
              <p className="link_to_remove_cart_item" onClick={ () => this.deleteFromCartOnClick(obj.product_id) }>Remove</p>
            </div>
            <div className="cart_item_price_quantity_total_container">
              <p className="cart_item_price">{obj.price}</p>
              <input className="cart_item_quantity" value={obj.quantity} onChange={(event) => this.updateQuantityOnChange(event, obj.product_id, obj.price)}/>
              <p className="cart_item_total">{obj.total}</p>
            </div>
          </div>
          )
        })}

        {!this.props.products_in_cart[0] ? null :
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
        }
      
      </div>

    )
  }

}

function moveFromStoreToProps(state) {
  return {
    current_view: state.current_view,
    products_in_cart: state.products_in_cart
  }
}

var outputActions = {
  adjustView,
  loadCartContents,
  updateCart,
  addCartItemCount
}

let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Cart);