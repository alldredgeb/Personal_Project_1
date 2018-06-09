import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adjustView } from './../ducks/reducer';

class Main_Display_Area extends Component {

//Component did mount: get the product details for the loaded view, set on redux state
//Component did mount: find out how many pages of items will be displayed, set on redux state

//Method: make the listed pagination clickable (onClick), make all pages (aside from the current page) do another call (for the next few) when clicked, and set that new information on Redux state
//Method: onClick of displayed product, route to product view and pass the details

//Method (ACCESSORIES - SHORTS): Sort products shown by change of drop-down list

  render() {
    return (
      <div>

        <header className="main_display_area_header">
          <div className="breadcrumb_main">
          <Link to="/"><p className="breadcrumb_link_to_home">Home</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="breadcrumb_collections_name">x</p>
          </div>

          <div className="header_title_and_sort_container">
            <p className="collections_name_header">x</p>
            <select className="sort_products_drop_down">
              <option>Alphabetically, A-Z</option>
              <option>Alphabetically, Z-A</option>
              <option>Price, low to high</option>
              <option>Price, high to low</option>
            </select>
          </div>
        </header>

        <section className="main_display_area_overall">
          <div className="product_box">
          <Link to="/product/:id"><img className="product_image" src="" alt="Product" /></Link>
          <Link to="/product/:id"><p className="product_description">x</p></Link>
            <p className="product_price">$x</p>
          </div>
        </section>

        <div className="pagination_overall_container">
          <p>« Previous</p>
          <p className="page_link">1</p>
          <p>Next »</p>
        </div>

      </div>
    )
  }

}

function moveFromStoreToProps(state) {
  return {
    current_view: state.current_view,
    products_in_view: state.products_in_view,
    number_of_pages: state.number_of_pages,
    current_page: state.current_page
  }
}

var outputActions = {
  adjustView
}

let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Main_Display_Area);