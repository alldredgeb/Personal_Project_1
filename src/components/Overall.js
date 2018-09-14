import React, { Component } from 'react';
import search_icon from './../images/search_icon.svg';
import cart_icon from './../images/cart_icon.svg';
import simple_logo from './../images/simple_logo.png';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { userInfoToRedux, addCartItemCount, adjustView } from './../ducks/reducer';
import Home from './Home';
import Accessories from './Accessories';
import Denim from './Denim';
import Footwear from './Footwear';
import Jeans from './Jeans';
import Outerwear from './Outerwear';
import Pants from './Pants';
import Shirts from './Shirts';
import Tshirts from './Tshirts';
import Shorts from './Shorts';
import Individual_Product_Display from './Individual_Product_Display';
import Search from './Search';
import News from './News';
import Our_Story from './Our_Story';
import FAQ from './FAQ';
import Return_Policy from './Return_Policy';
import Contact_Us from './Contact_Us';
import Cart from './Cart';

class Overall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      open: false
    }
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleClickOfSubmit = this.handleClickOfSubmit.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.expandMenu = this.expandMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  //Component did mount: get the info on whether anything is in the store from redux)
  //Component did mount: set up method to update redux state to show that someone is logged in. (which will hide the 'login' button)
  //Component did mount: set up db call to find out how many items this user has in their cart, then set redux state with that information.
  componentDidMount() {
    axios.get('/api/get_all_user_info').then( userInfoResponse => {
      this.props.userInfoToRedux(userInfoResponse.data);
      axios.get('/api/get_cart_item_count').then( cartItemCountResponse => {
        if(cartItemCountResponse.data < 1) {
          this.props.addCartItemCount(0);
        } else {
          this.props.addCartItemCount(cartItemCountResponse.data);
        }
      })
    })
  }

  handleEmailInput(event) {
    this.setState({
      email: event.target.value
    })
  }

  handleClickOfSubmit() {
    this.setState({
      email: ''
    })
  }

  getProducts() {
   axios.get(`/api/get_products/${this.props.current_view}`).then( response => {
      this.props.addProducts(response.data)
    })
  }

  expandMenu() {
    this.setState({
      open: !this.state.open,
    })
  }

  closeMenu() {
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <div className="overall_container">
      
      <div className="everything_below_the_very_top">

      <header className="overall_header">
        <div className="search_container">
        <Link to="/search"><img className="search_icon" src={search_icon} alt="Search Icon" onClick={ () => {this.props.adjustView('Search'); this.closeMenu();} }/></Link>
        <Link to="/search"><p className="search_icon_text" onClick={ () => {this.props.adjustView('Search'); this.closeMenu();} }>Search</p></Link>
        </div>
        <div className="cart_and_login_logout_container">
          <div className="cart_and_item_count_container">
          <Link to="/cart"><img className="cart_icon" src={cart_icon} alt="Cart Icon" onClick={ () => {this.props.adjustView('Cart'); this.closeMenu();} }/></Link>
            <p className="item_count">({this.props.cart_item_count})</p>
          </div>
          <div className="login_and_logout_container">
            { this.props.logged_in === false ? 
            <a href={process.env.REACT_APP_LOGIN} className="login_link"><div>Login</div></a> : 
            <a href={process.env.REACT_APP_LOGOUT} className="logout_link"><div>Logout</div></a> }
          </div>
        </div>
      </header>

        <section className="brand_logo_bar">
          <Link to="/"><img className="simple_logo" src={simple_logo} alt="Simple Logo" onClick={ () => {this.props.adjustView('Home'); this.closeMenu();} }/></Link>
        </section>

        <section className="navigation_and_main_display_area">
          <div className="navigation_and_external_links_container_1">
            <div className="hamburger_wrapper">
              <div className="hamburger_container" onClick={this.expandMenu}>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
              </div>
            </div>
            {this.state.open ? 
            <div className="navigation_1">
              <Link to="/">{ this.props.current_view === 'Home' ? <p className="bold_nav">Home</p> : <p className="light_nav" onClick={ () => {this.props.adjustView('Home'); this.expandMenu();} }>Home</p> }</Link>
              <Link to="/collections/accessories">{ this.props.current_view === 'Accessories' ? <p className="bold_nav">Accessories</p> : <p className="light_nav" onClick={ () => {this.props.adjustView('Accessories'); this.expandMenu();} }>Accessories</p> }</Link>
              <Link to="/collections/denim">{ this.props.current_view === 'Denim' ? <p className="bold_nav">Denim</p> : <p className="light_nav" onClick={ () => {this.props.adjustView('Denim'); this.expandMenu();} }>Denim</p> }</Link>
              <Link to="/collections/footwear">{ this.props.current_view === 'Footwear' ? <p className="bold_nav">Footwear</p> : <p className="light_nav" onClick={ () => {this.props.adjustView('Footwear'); this.expandMenu();} }>Footwear</p> }</Link>
              <Link to="/collections/jeans">{ this.props.current_view === 'Jeans' ? <p className="bold_nav">Jeans</p> : <p className="light_nav" onClick={ () => {this.props.adjustView('Jeans'); this.expandMenu();} }>Jeans</p> }</Link>
              <Link to="/collections/outerwear">{ this.props.current_view === 'Outerwear' ? <p className="bold_nav">Outerwear</p> : <p className="light_nav" onClick={ () => {this.props.adjustView('Outerwear'); this.expandMenu();} }>Outerwear</p> }</Link>
              <Link to="/collections/pants">{ this.props.current_view === 'Pants' ? <p className="bold_nav">Pants</p> : <p className="light_nav" onClick={ () => {this.props.adjustView('Pants'); this.expandMenu();} }>Pants</p> }</Link>
              <Link to="/collections/shirts">{ this.props.current_view === 'Shirts' ? <p className="bold_nav">Shirts</p> : <p className="light_nav" onClick={ () => {this.props.adjustView('Shirts'); this.expandMenu();} }>Shirts</p> }</Link>
              <Link to="/collections/t-shirts">{ this.props.current_view === 'T-Shirts' ? <p className="bold_nav">T-Shirts</p> : <p className="light_nav" onClick={ () => {this.props.adjustView('T-Shirts'); this.expandMenu();} }>T-Shirts</p> }</Link>
              <Link to="/collections/shorts">{ this.props.current_view === 'Shorts' ? <p className="bold_nav">Shorts</p> : <p className="light_nav" onClick={ () => {this.props.adjustView('Shorts'); this.expandMenu();} }>Shorts</p> }</Link>
            </div>
            : null}
          </div>
          <div className="navigation_and_external_links_container_2">
            <div className="navigation_2">
              <Link to="/">{ this.props.current_view === 'Home' ? <p className="bold_nav">Home</p> : <p onClick={ () => {this.props.adjustView('Home');} }>Home</p> }</Link>
              <Link to="/collections/accessories">{ this.props.current_view === 'Accessories' ? <p className="bold_nav">Accessories</p> : <p onClick={ () => {this.props.adjustView('Accessories')} }>Accessories</p> }</Link>
              <Link to="/collections/denim">{ this.props.current_view === 'Denim' ? <p className="bold_nav">Denim</p> : <p onClick={ () => this.props.adjustView('Denim') }>Denim</p> }</Link>
              <Link to="/collections/footwear">{ this.props.current_view === 'Footwear' ? <p className="bold_nav">Footwear</p> : <p onClick={ () => this.props.adjustView('Footwear') }>Footwear</p> }</Link>
              <Link to="/collections/jeans">{ this.props.current_view === 'Jeans' ? <p className="bold_nav">Jeans</p> : <p onClick={ () => this.props.adjustView('Jeans') }>Jeans</p> }</Link>
              <Link to="/collections/outerwear">{ this.props.current_view === 'Outerwear' ? <p className="bold_nav">Outerwear</p> : <p onClick={ () => this.props.adjustView('Outerwear') }>Outerwear</p> }</Link>
              <Link to="/collections/pants">{ this.props.current_view === 'Pants' ? <p className="bold_nav">Pants</p> : <p onClick={ () => this.props.adjustView('Pants') }>Pants</p> }</Link>
              <Link to="/collections/shirts">{ this.props.current_view === 'Shirts' ? <p className="bold_nav">Shirts</p> : <p onClick={ () => this.props.adjustView('Shirts') }>Shirts</p> }</Link>
              <Link to="/collections/t-shirts">{ this.props.current_view === 'T-Shirts' ? <p className="bold_nav">T-Shirts</p> : <p onClick={ () => this.props.adjustView('T-Shirts') }>T-Shirts</p> }</Link>
              <Link to="/collections/shorts">{ this.props.current_view === 'Shorts' ? <p className="bold_nav">Shorts</p> : <p onClick={ () => this.props.adjustView('Shorts') }>Shorts</p> }</Link>
            </div>
          </div>
          <div className="main_display_area">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/collections/accessories' component={Accessories} />
              <Route path='/collections/denim' component={Denim} />
              <Route path='/collections/footwear' component={Footwear} />
              <Route path='/collections/jeans' component={Jeans} />
              <Route path='/collections/outerwear' component={Outerwear} />
              <Route path='/collections/pants' component={Pants} />
              <Route path='/collections/shirts' component={Shirts} />
              <Route path='/collections/t-shirts' component={Tshirts} />
              <Route path='/collections/shorts' component={Shorts} />
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
            <p className="bottom_links_header">Links</p>
            <div className="bottom_links_container">
              <Link to="/search"><p className="bottom_links">Search</p></Link>
              <Link to="/links/news"><p className="bottom_links">News</p></Link>
              <Link to="/links/our-story"><p className="bottom_links">Our story</p></Link>
              <Link to="/links/faq"><p className="bottom_links">FAQ</p></Link>
              <Link to="/links/return-policy"><p className="bottom_links">Return Policy</p></Link>
              <Link to="/links/contact-us"><p className="bottom_links">Contact us</p></Link>
            </div>
          </div>
          <div className="be_in_the_know_container">
            <p className="be_in_the_know_header">Be in the know</p>
            <p className="be_in_the_know_text">Sign up for the latest news, offers and styles</p>
            <div className="bitn_input_and_submit_button_container">
              <input value={this.state.email} onChange={this.handleEmailInput} className="your_email_input_field" placeholder="Your email"/>
              <button onClick={this.handleClickOfSubmit} className="subscribe_button">SUBSCRIBE</button>
            </div>
          </div>
        </section>

        <footer>
          <div className="footer_note_container">
            <p className="footer_note">Partial clone by Benjamin Alldredge. Original website by <a href="https://simpletheme.myshopify.com/">Shopify Shirts.</a></p>
            <p></p>
          </div>
        </footer>

      </div>
      </div>
    )
  }
}

function moveFromStoreToProps(state) {
  return {
    logged_in: state.logged_in,
    userInfo: state.userInfo,
    current_view: state.current_view,
    cart_item_count: state.cart_item_count
  }
}

var outputActions = {
  userInfoToRedux, 
  addCartItemCount, 
  adjustView
}
 
let connectedApp = connect(moveFromStoreToProps, outputActions);

export default withRouter(connectedApp(Overall));