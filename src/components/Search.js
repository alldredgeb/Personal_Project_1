import React, { Component } from 'react';
import search_icon_white from './../images/search_icon_white.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adjustView } from './../ducks/reducer';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search_box_text: ""
    };

  }

  //Method (onChange): keep track of the changes made in the search box
  //Method (onClick): do the actual search (redux?)


  render() {
    return (
      <div className="overall_search_container">

        <header className="search_header">
          <div className="search_breadcrumb">
            <Link to="/"><p className="search_breadcrumb_link_to_home">Home</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="search_breadcrumb_description">Search</p>
          </div>
        </header>

        <p className="search_name_header">Search our store</p>

        <div className="input_and_perform_search_button">
          <input className="search_input_field"/>
          <img classname="perform_search_clickable_image" src={search_icon_white} alt="Perform Search" />
        </div>

        <p className="found_results_sentence">Your search for "x" revealed the following:</p>
        <p className="no_results_found_sentence">Your search for "x" did not yield any results.</p>

        <section className="search_results_overall">
          <div className="product_box">
          <Link to="/product/:id"><img className="product_image" src="" alt="Product" /></Link>
          <Link to="/product/:id"><p className="product_description">x</p></Link>
            <p className="product_price">$x</p>
          </div>
        </section>

      </div>
    )
  }

}

function moveFromStoreToProps(state) {
  return {
    current_view: state.current_view,
    products_in_view: state.products_in_view,
    number_of_pages: state.number_of_pages,
    current_page: state.current_page,
    search_text: state.search_text
  }
}

var outputActions = {
  adjustView
}

let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Search);