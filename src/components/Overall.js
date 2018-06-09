import React, { Component } from 'react';
import search_icon from './../images/search_icon.svg';
import cart_icon from './../images/cart_icon.svg';
import simple_logo from './../images/simple_logo.png';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { adjustView } from './../ducks/reducer';
import Main_Display_Area from './Main_Display_Area';
import Individual_Product_Display from './Individual_Product_Display';
import Search from './Search';
import News from './News';
import Our_Story from './Our_Story';
import FAQ from './FAQ';
import Return_Policy from './Return_Policy';
import Contact_Us from './Contact_Us';
import Cart from './Cart';

class Overall extends Component {

  //Component did mount: get the info on whether anything is in the store from redux)
  componentDidMount() {
    axios.get('/api/check_login').then( response => {
      console.log('check login response', response.data.id);
      //this.setState({user.info: res.data})
    })
  }

  //Component did mount: check to see if user is logged in
  //Component did mount: If the user is logged in, set the cart () number  equal to the total number of items in it.

  render() {
    return (
      <div className="overall_container">

        <div className="the_very_top"></div>

        <header className="overall_header">
        <div className="search_container">
        <Link to="/search"><img className="search_icon" src={search_icon} alt="Search Icon"/></Link>
          <p>Search</p>
        </div>
        <div className="cart_and_login_logout_container">
          <div className="cart_and_item_count_container">
          <Link to="/cart"><img className="cart_icon" src={cart_icon} alt="Cart Icon"/></Link>
            <p>({this.props.number_of_products_in_cart})</p>
          </div>
          <div className="login_and_logout_container">
            <a href={process.env.REACT_APP_LOGIN} className="login_link"><div>login</div></a>
            <a href={process.env.REACT_APP_LOGOUT} className="logout_link"><div>logout</div></a>
          </div>
        </div>
        </header>

        <section className="brand_logo_bar">
          <Link to="/"><img className="simple_logo" src={simple_logo} alt="Simple Logo" /></Link>
        </section>

        <section className="navigation_and_main_display_area">
          <div className="navigation_and_external_links_container">
            <div className="navigation">
            <Link to="/">{ this.props.current_view === 'Home' ? <p className="bold_nav">Home</p> : <p>Home</p> }</Link>
            <Link to="/collections/accessories">{ this.props.current_view === 'Accessories' ? <p className="bold_nav">Accessories</p> : <p>Accessories</p> }</Link>
            <Link to="/collections/denim">{ this.props.current_view === 'Denim' ? <p className="bold_nav">Denim</p> : <p>Denim</p> }</Link>
            <Link to="/collections/footwear">{ this.props.current_view === 'Footwear' ? <p className="bold_nav">Footwear</p> : <p>Footwear</p> }</Link>
            <Link to="/collections/jeans">{ this.props.current_view === 'Jeans' ? <p className="bold_nav">Jeans</p> : <p>Jeans</p> }</Link>
            <Link to="/collections/outerwear">{ this.props.current_view === 'Outerwear' ? <p className="bold_nav">Outerwear</p> : <p>Outerwear</p> }</Link>
            <Link to="/collections/pants">{ this.props.current_view === 'Pants' ? <p className="bold_nav">Pants</p> : <p>Pants</p> }</Link>
            <Link to="/collections/shirts">{ this.props.current_view === 'Shirts' ? <p className="bold_nav">Shirts</p> : <p>Shirts</p> }</Link>
            <Link to="/collections/t-shirts">{ this.props.current_view === 'T-Shirts' ? <p className="bold_nav">T-Shirts</p> : <p>T-Shirts</p> }</Link>
            <Link to="/collections/shorts">{ this.props.current_view === 'Shorts' ? <p className="bold_nav">Shorts</p> : <p>Shorts</p> }</Link>
            </div>
          </div>
          <div className="main_display_area">
            <Switch>
              <Route exact path='/' component={Main_Display_Area} />
              <Route path='/collections/accessories' component={Main_Display_Area} />
              <Route path='/collections/denim' component={Main_Display_Area} />
              <Route path='/collections/footwear' component={Main_Display_Area} />
              <Route path='/collections/jeans' component={Main_Display_Area} />
              <Route path='/collections/outerwear' component={Main_Display_Area} />
              <Route path='/collections/pants' component={Main_Display_Area} />
              <Route path='/collections/shirts' component={Main_Display_Area} />
              <Route path='/collections/t-shirts' component={Main_Display_Area} />
              <Route path='/collections/shorts' component={Main_Display_Area} />
              <Route path='/product/:id' component={Individual_Product_Display} />
              <Route path='/search' component={Search} />
              <Route path='/links/news' component={News} />
              <Route path='/links/our-story' component={Our_Story} />
              <Route path='/links/faq' component={FAQ} />
              <Route path='/links/return-policy' component={Return_Policy} />
              <Route path='/links/contact-us' component={Contact_Us} />
              <Route path='/cart' component={Cart} />
            </Switch>
          </div>
        </section>

        <section className="links_and_be_in_the_know">
          <div className="links_container">
            <p>Links</p>
            <Link to="/search"><p>Search</p></Link>
            <Link to="/links/news"><p>News</p></Link>
            <Link to="/links/our-story"><p>Our story</p></Link>
            <Link to="/links/faq"><p>FAQ</p></Link>
            <Link to="/links/return-policy"><p>Return Policy</p></Link>
            <Link to="/links/contact-us"><p>Contact us</p></Link>
          </div>
          <div className="be_in_the_know_container">
            <p>Be in the know</p>
            <p>Sign up for the latest news, offers and styles</p>
            <div className="bitn_input_and_submit_button_container">
              <input />
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </section>

        <footer>
          <div className="footer_note_container">
            <p>Partial clone of Shopify website. Clone made by Benjamin Alldredge.</p>
            <p>Original Shopify website: https://simpletheme.myshopify.com/</p>
          </div>
        </footer>

      </div>
    )
  }
}

function moveFromStoreToProps(state) {
  return {
    logged_in: state.logged_in,
    current_view: state.current_view,
    number_of_products_in_cart: state.number_of_products_in_cart
  }
}

var outputActions = {
  adjustView
}
 
let connectedApp = connect(moveFromStoreToProps, outputActions);

export default withRouter(connectedApp(Overall));