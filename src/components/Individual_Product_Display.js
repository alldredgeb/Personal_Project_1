import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Individual_Product_Display extends Component {

  //Component did mount: get the product images, current image, description, price -  set on Redux state
  
    render() {
      return (
        <div className="individual_product_overall_container">

        <header className="individual_product_header">
          <div className="individual_product_breadcrumb">
          <Link to="/"><p className="breadcrumb_individual_link_to_home">Home</p></Link>
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
                <select className="s_to_xl_size_drop_down_menu"></select>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>X-Large</option>
                <select className="six_to_eleven_size_drop_down_menu"></select>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                <select className="osfa_size_drop_down_menu"></select>
                  <option>OSFA</option>
              </div>
            </div>
            <button className="individual_product_add_to_cart_button">ADD TO CART</button>
            <Link to="/cart"><button className="individual_product_view_cart_button">VIEW CART</button></Link>
            <Link to="/"><button className="individual_product_view_continue_shopping_button">CONTINUE SHOPPING</button></Link>
          </div>

        </section>

        <section className="alternate_product_images_container">
          <img src="" alt="product_image_number_x" />
        </section>

        </div>
      )
    }
  
  }

export default Individual_Product_Display;