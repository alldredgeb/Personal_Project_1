import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adjustView } from './../ducks/reducer';

class Individual_Product_Display extends Component {

  //Component did mount: get the product images, current image, description, price -  set on Redux state
  //set state of the current view (Accessories, Denim, etc)
  //set state of current product to be displayed
  //Check to see if user is logged in
  //Check to see if the current product is already in the cart
  //Change the image number to be displayed (when clicked)
  
    render() {
      return (
        <div className="individual_product_overall_container">

        <header className="individual_product_header">
          <div className="individual_product_breadcrumb">
          <Link to="/"><p className="breadcrumb_individual_link_to_home">Home</p></Link>
            <div className="nav_between_symbol">›</div>
          <Link to={`/collections/${this.props.current_view.toLowerCase()}`}><p className="breadcrumb_individual_product_description">{this.props.current_view}</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="breadcrumb_individual_product_description">x</p>
          </div>
        </header>

        <section className="individual_product_image_and_details_container">

          <img className="individual_product_image" src="" alt="Individual Product"/>

          <div className="individual_product_details">
            <p className="individual_product_description">Product Description</p>
            <p className="individual_product_price">$Product Price</p>
            <div className="color_and_size_overall_container">
              <div className="color_container">
                <p className="color_title">Colour</p>
                <select className="color_drop_down_menu"></select>
                  <option>x</option>
              </div>
              <div className="size_container">
                <p className="size_title">Size</p>
                <select className="six_to_eleven_size_drop_down_menu">
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                </select>
                <select className="twenty_eight_to_thirty_eight_size_drop_down_menu">
                  <option>28</option>
                  <option>29</option>
                  <option>30</option>
                  <option>31</option>
                  <option>32</option>
                  <option>33</option>
                  <option>34</option>
                  <option>35</option>
                  <option>36</option>
                  <option>37</option>
                  <option>38</option>
                </select>
                <select className="osfa_size_drop_down_menu">
                  <option>OSFA</option>
                </select>
                <select className="s_to_xl_size_drop_down_menu">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>X-Large</option>
                </select>
                
                
              </div>
            </div>

            {this.props.current_product_in_cart === false ? 
             <button className="individual_product_add_to_cart_button">ADD TO CART</button> : 
             <div className="view_cart_and_continue_shopping_buttons_container">
              <Link to="/cart"><button className="individual_product_view_cart_button">VIEW CART</button></Link>
              <Link to="/"><button className="individual_product_view_continue_shopping_button">CONTINUE SHOPPING</button></Link>
             </div>
            }

          </div>

        </section>

        <section className="alternate_product_images_container">
          <img src="" alt="product_image_number_x" />
        </section>

        </div>
      )
    }
  
  }

  function moveFromStoreToProps(state) {
    return {
      logged_in: state.logged_in,
      current_view: state.current_view,
      current_product_displayed: state.current_product_displayed,
      current_product_image_displayed: state.current_product_image_displayed,
      current_product_in_cart: state.current_product_in_cart
    }
  }

  var outputActions = {
    adjustView
  }

  let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Individual_Product_Display);