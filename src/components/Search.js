import React, { Component } from 'react';
import search_icon_white from './../images/search_icon_white.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adjustView } from './../ducks/reducer';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search_name_header: 'Search our store',
      search_box_text: '',
      search_results: [],
      search_performed: false
    };
    this.adjustSearchTextOnChange = this.adjustSearchTextOnChange.bind(this);
    this.getSearchedProducts = this.getSearchedProducts.bind(this);
  }

  //Method (onChange): keep track of the changes made in the search box
  adjustSearchTextOnChange(event) {
    this.setState({
      search_box_text: event.target.value
    })
  }

  //Method (onClick): do the actual search
  getSearchedProducts() {
    axios.get(`/api/search?search_box_text=${this.state.search_box_text}`).then( response => {
      if(!response.data[0]) {
        this.setState({
          search_name_header: `Your search for "${this.state.search_box_text}" did not yield any results.`,
          search_performed: true
        })
      }
      if(response.data[0]) {
        this.setState({
          search_name_header: `Your search for "${this.state.search_box_text}" revealed the following:`,
          search_results: response.data,
          search_performed: true
        })
      }
    })
  }

  render() {
    return (
      <div className="overall_search_container">

        <header className="search_header">
          <div className="search_breadcrumb">
            <Link to="/"><p className="search_breadcrumb_link_to_home" onClick={ () => this.props.adjustView('Home') }>Home</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="search_breadcrumb_description">Search</p>
          </div>
        </header>

        <p className="search_name_header">{this.state.search_name_header}</p>

        {this.state.search_performed ? null : 
        <div className="input_and_perform_search_button">
          <input value={this.state.search_box_text} onChange={this.adjustSearchTextOnChange} className="search_input_field" placeholder="Search"/>
          <img onClick={this.getSearchedProducts} className="perform_search_clickable_image" src={search_icon_white} alt="Perform Search" />
        </div>
        }

        <section className="search_results_overall">
          {this.state.search_results.map( obj => {
            return(
              <div key={obj.id} className="product_box">
                <Link to={`/product/${obj.id}`}><img className="product_image" src={obj.img_url} alt="Product" /></Link>
                <Link to={`/product/${obj.id}`}><p className="product_description">{obj.description}</p></Link>
                <p className="product_price">{obj.price}</p>
              </div>
            )
          })}
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