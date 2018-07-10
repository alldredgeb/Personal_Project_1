import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { adjustView, addProducts } from './../ducks/reducer';
import axios from 'axios';

class Outerwear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages_array: [],
      page_number: 1
    };
    this.changePages = this.changePages.bind(this);
    this.getOtherProducts = this.getOtherProducts.bind(this);
  }

//Component did mount: get the product details for the loaded view, set on redux state
//Component did mount: find out how many pages of items will be displayed, set on local state
componentDidMount() {
  axios.get(`/api/get_products/Outerwear`).then( response => {
    console.log('get products response', response.data)
    this.props.addProducts(response.data);
    axios.get('/api/check_number_of_pages/Outerwear').then( response => {
      let pagesArray = [];
      for (var i = 1; i <= Math.ceil(response.data[0].count / 9); i++) {
        pagesArray.push(i);
      }
      console.log('pageArray', pagesArray);
      this.setState({
        pages_array: pagesArray
      })
    })
  })
}

//Method: make the listed pagination clickable (onClick), make all pages (aside from the current page) do another call (for the next few) when clicked, and set that new information on Redux state

changePages(new_page_number) {
  this.setState({
    page_number: new_page_number
  }, () => {
    this.getOtherProducts();
  })
}

getOtherProducts() {
  let offset = (this.state.page_number - 1) * 9;
  axios.get(`/api/get_other_products/Outerwear/${offset}`).then( otherProductsResponse => {
    console.log('get other products results', otherProductsResponse);
    this.props.addProducts(otherProductsResponse.data);
  })
}

//Method (ACCESSORIES - SHORTS): Sort products shown by change of drop-down list
//THE LINE DIRECTLY ABOVE IS OPTIONAL


//Method: onClick of displayed product, route to product view and pass the details



  render() {
    return (
      <div>

        <header className="main_display_area_header">

        {this.props.current_view !== 'Home' ?
          <div className="breadcrumb_main">
          <Link to="/"><p className="breadcrumb_link_to_home" onClick={ () => this.props.adjustView('Home') }>Home</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="breadcrumb_collections_name">{this.props.current_view}</p>
          </div>: 
          null}

        {this.props.current_view !== 'Home' ?
          <div className="header_title_and_sort_container">
            <p className="collections_name_header">x</p>
            <select className="sort_products_drop_down">
              <option>Featured</option>
              <option>Alphabetically, A-Z</option>
              <option>Alphabetically, Z-A</option>
              <option>Price, low to high</option>
              <option>Price, high to low</option>
            </select>
          </div>:
        null}

        </header>

        <section className="main_display_area_overall">
        {this.props.products_in_view.map( obj => {
          return (
            <div key={obj.id} className="product_box">
              <Link to={`/product/${obj.id}`}><img className="product_image" src={obj.img_url} alt="Product" /></Link>
              <Link to={`/product/${obj.id}`}><p className="product_description">{obj.description}</p></Link>
            <p className="product_price">{obj.price}</p>
          </div>
          )
        })}

        </section>

        {this.state.pages_array.length > 1 ? 
        <div className="pagination_overall_container">
          {this.state.page_number !== 1 ? <p onClick={ () => this.changePages(this.state.page_number - 1 ) }>« Previous</p> : null}
          {this.state.pages_array.map( num => {
            if (num === this.state.page_number) {
              return (
                <div key={num} className="current_page_indicator">
                  <p className="page_link">{num}</p>
                </div>
              )
            } else {
              return (
                <div key={num} className="page_indicator" onClick={ () => this.changePages(num) }>
                  <p className="page_number">{num}</p>
                </div>
              )
            }
          })}
          {this.state.page_number !== this.state.pages_array[this.state.pages_array.length - 1] ? <p onClick={ () => this.changePages(this.state.page_number + 1 ) }>Next »</p> : null}
        </div>
        : null}

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
  adjustView, 
  addProducts
}

let connectedApp = connect(moveFromStoreToProps, outputActions);

export default withRouter(connectedApp(Outerwear));