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
      quantity: 0,
      subtotal: 0,
      checked_out: false
    }
    this.getProductsInCart = this.getProductsInCart.bind(this);
    this.getCartItemsSubtotal = this.getCartItemsSubtotal.bind(this);
    this.getCartItemCount = this.getCartItemCount.bind(this);
    this.updateQuantityOnChange = this.updateQuantityOnChange.bind(this);
    this.deleteFromCartOnClick = this.deleteFromCartOnClick.bind(this);
  }

  componentDidMount() {
    this.getProductsInCart();
    this.getCartItemsSubtotal();
  }

  getProductsInCart() {
    axios.get('/api/get_products_in_cart').then( productsInCartResponse => {
      this.props.loadCartContents(productsInCartResponse.data);
    })
  }

  getCartItemsSubtotal() {
    axios.get(`/api/get_cart_items_subtotal`).then( subtotalResponse => {
      this.setState({
        subtotal: subtotalResponse.data[0].sum
      })
    }).catch( error => {
      console.log('subtotal info error', error);
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
    // console.log('event data', event)
    let item_price = product_price.replace(/[^\d.]/g, '');
    let product = parseInt(item_price, 10) * parseInt(event.target.value, 10);
    let item_total = (product).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    axios.put(`/api/update_quantity`, {
      quantity: +event.target.value,
      total: item_total,
      product_id: product_id
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

  cartCheckout() {
    axios.put(`/api/checkout`).then( response => {
      this.setState({
        subtotal: 0,
        checked_out: true
      })
    }).then( () => {
      this.getProductsInCart();
      this.getCartItemCount();
    }).catch( error => {
      console.log('checkout error bob', error)
    })
  }

  render() {
    return (
      <div className="overall_cart_container">
      
        <header className="cart_header">
          <div className="cart_breadcrumb">
            <Link to="/"><p className="cart_breadcrumb_link_to_home">Home</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="cart_breadcrumb_description">Your Shopping Cart</p>
          </div>
        </header>
        
        {this.props.products_in_cart[0] || this.state.checked_out ? null :
        <div>
          <p className="cart_name_header">Shopping Cart</p>
          <p className="cart_empty_text">Your cart is currently empty.</p>
          <p className="cart_continue_browsing_text" onClick={ () => {this.props.adjustView('Home');} }>Continue browsing <Link to="/">here.</Link></p>
        </div>
         }

         {!this.state.checked_out ? null :
        <div>
          <p>Thank you for your purchase!</p>
          <p onClick={ () => {this.props.adjustView('Home');} }>If you wish to continue browsing, click <Link to="/">here.</Link></p>
        </div>
         }
        
        <div className="below_seven_hundred_and_fifty">
          {this.props.products_in_cart.map ( obj => {
            return (
            <div key={obj.id} className="filled_cart_actual_product_item_container_1">
              <div className="cart_product_box_1">
                <Link to={`/product/${obj.product_id}`}><img className="cart_product_image_1" src={obj.img_url} alt="Cart Item"/></Link>
                <Link to={`/product/${obj.product_id}`}><p className="cart_product_description_1">{obj.description}</p></Link>
                <p className="cart_product_details_1">{obj.colour} / {obj.size}</p>
                <p className="link_to_remove_cart_item_1" onClick={ () => this.deleteFromCartOnClick(obj.product_id) }>Remove</p>
              </div>
              <div className="cart_product_price_container_1">
                <p className="cart_product_price_header_1">Price</p>
                <p className="cart_product_price_1">{obj.price}</p>
              </div>
              <div className="cart_product_quantity_container_1">
                <p className="cart_product_quantity_header_1">Quantity</p>
                <input className="cart_product_quantity_1" value={obj.quantity} onChange={(event) => this.updateQuantityOnChange(event, obj.product_id, obj.price)}/>
              </div>
              <div className="cart_product_total_container_1">
                <p className="cart_product_total_header_1">Total</p>
                <p className="cart_product_total_1">{obj.total}</p>
              </div>
            </div>
            )
          })}
        </div>

        <div className="seven_hundred_fifty_and_above">
          {!this.props.products_in_cart[0] ? null : 
            <div className="cart_expanded_headers">
              <div className="product_header_2_container">
                <p className="product_header_2">Product</p>
              </div>
              <div className="price_quantity_container">
                <p className="price_header_2">Price</p>
                <p className="quantity_header_2">Quantity</p>
              </div>
              <div className="total_header_2_container_for_real">
                <p className="total_header_2">Total</p>
              </div>
            </div>
          }

          {this.props.products_in_cart.map ( obj => {
            return (
            <div key={obj.id} className="filled_cart_actual_product_item_container_2">
              <div className="cart_product_image_and_description_color_size_remove_container_2">
                <div className="cart_product_image_2_container">
                  <Link to={`/product/${obj.product_id}`}><img className="cart_product_image_2" src={obj.img_url} alt="Cart Item"/></Link>
                </div>
                <div className="cart_product_details_container_2">
                  <Link to={`/product/${obj.product_id}`}><p className="cart_product_description_2">{obj.description}</p></Link>
                  <p className="cart_product_details_2">{obj.colour} / {obj.size}</p>
                  <p className="link_to_remove_cart_item_2" onClick={ () => this.deleteFromCartOnClick(obj.product_id) }>Remove</p>
                </div>
              </div>
              <div className="actual_price_quantity_container">
                <div className="test_one">
                  <p className="cart_product_price_2">{obj.price}</p>
                </div>
                <div className="test_two">
                  <input className="cart_product_quantity_2" value={obj.quantity} onChange={(event) => this.updateQuantityOnChange(event, obj.product_id, obj.price)}/>
                </div>
              </div>
              <div className="actual_total_header_2_container_for_real">
                <p className="cart_product_total_2">{obj.total}</p>
              </div>
            </div>
            )
          })}
        </div>

        {!this.props.products_in_cart[0] ? null :
        <div className="instructions_subtotal_refresh_redirect_checkout_container">
          <div className="special_instructions_container">
            <p className="special_instructions_header">Special instructions for seller</p>
            <textarea className="special_instructions_message_textarea"></textarea>
          </div>
          <div className="subtotal_and_buttons_container">
            <p className="subtotal_header">Subtotal {this.state.subtotal}</p>
            <p className="refresh_instructions">Click 'refresh' (below) to update subtotal</p>
            <div className="refresh_and_redirect_buttons_container">
              <div className="refresh_icon_container">
                <img className="refresh_icon" src={refresh_icon} alt="Refresh Icon" onClick={ () => this.getCartItemsSubtotal() }/>
              </div>
              <Link to="/"><button className="continue_button">CONTINUE SHOPPING</button></Link>
            </div>
            <button className="checkout_button" onClick={ () => this.cartCheckout() }>CHECK OUT</button>
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