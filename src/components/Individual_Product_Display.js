import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adjustView, addCartItemCount } from './../ducks/reducer';
import axios from 'axios';

class Individual_Product_Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current_product_displayed: {},
      all_product_images: [],
      current_product_image_displayed: '',
      size_category: '',
      selected_colour: '',
      selected_size: '',
      current_product_in_cart: false
    };
    this.changeCurrentImageOnClick = this.changeCurrentImageOnClick.bind(this);
    this.updateSizeOnChange = this.updateSizeOnChange.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  //Component did mount: get the product images, current image, description, price -  set on Redux state
  componentDidMount() {
    axios.get(`/api/get_product/${this.props.match.params.id}`).then( response => {
      // console.log('get individual product response', response.data[0]);
      this.setState({
        current_product_displayed: response.data[0],
        all_product_images: [response.data[0].img_url, response.data[0].img_url_2, response.data[0].img_url_3],
        current_product_image_displayed: response.data[0].img_url,
        size_category: response.data[0].size_category,
        selected_colour: response.data[0].colour
      })
      if(this.state.size_category === '6-11') {this.setState({selected_size: '6'})}
      if(this.state.size_category === '28-38') {this.setState({selected_size: '28'})}
      if(this.state.size_category === 'OSFA') {this.setState({selected_size: 'OSFA'})}
      if(this.state.size_category === 'S-XL') {this.setState({selected_size: 'Small'})}
      console.log('individual item state', this.state);
      axios.get(`/api/check_cart_for_item/${this.props.match.params.id}`).then ( response => {
        if(response.data[0]) {this.setState({current_product_in_cart: true})}
      })
    })
  }

  changeCurrentImageOnClick(value) {
    this.setState({
      current_product_image_displayed: value
    })
  }

  updateSizeOnChange(event) {
    this.setState({
      selected_size: event.target.value
    })
  }

  addToCart(event) {
    axios.post('/api/add_item_to_cart', {
      customer_id: this.props.userInfo.id,
      product_id: this.props.match.params.id,
      img_url: this.state.all_product_images[0],
      description: this.state.current_product_displayed.description,
      price: this.state.current_product_displayed.price,
      colour: this.state.selected_colour,
      size: this.state.selected_size,
      quantity: 1,
      purchased: false
    }).then( response => {
      console.log('add to cart response', response);
      this.setState({
        current_product_in_cart: true
      })
      axios.get('/api/get_cart_item_count').then( cartItemCountResponse => {
        this.props.addCartItemCount(cartItemCountResponse.data);
      })
    }).catch( response => {
      console.log('add to cart error response', response);
    })
  }

  //set state of current product to be displayed
  //Check to see if user is logged in
  //Check to see if the current product is already in the cart
  //Change the image number to be displayed (when clicked)
  
    render() {
      return (
        <div className="individual_product_overall_container">

        <header className="individual_product_header">
          <div className="individual_product_breadcrumb">
          <Link to="/"><p className="breadcrumb_individual_link_to_home" onClick={ () => this.props.adjustView('Home') }>Home</p></Link>
          { this.props.current_view !== 'Home' ? 
          <div><div className="nav_between_symbol">›</div>
          <Link to={`/collections/${this.props.current_view.toLowerCase()}`}><p className="breadcrumb_individual_product_description">{this.props.current_view}</p></Link></div> : 
          null}
            <div className="nav_between_symbol">›</div>
            <p className="breadcrumb_individual_product_description">{this.state.current_product_displayed.description}</p>
          </div>
        </header>

        <section className="individual_product_image_and_details_container">

          <img className="individual_product_image" src={this.state.current_product_image_displayed} alt="Individual Product"/>

          <div className="individual_product_details">
            <p className="individual_product_description">{this.state.current_product_displayed.description}</p>
            <p className="individual_product_price">{this.state.current_product_displayed.price}</p>
            <div className="color_and_size_overall_container">
              <div className="color_container">
                <p className="color_title">Colour</p>
                <select className="color_drop_down_menu">
                  <option>{this.state.current_product_displayed.colour}</option>
                </select>
              </div>
              <div className="size_container">
                <p className="size_title">Size</p>
                {this.state.size_category === '6-11' ? 
                <select className="six_to_eleven_size_drop_down_menu" onChange={this.updateSizeOnChange}>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                </select>
                : null}
                {this.state.size_category === '28-38' ? 
                <select className="twenty_eight_to_thirty_eight_size_drop_down_menu" onChange={this.updateSizeOnChange}>
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
                : null}
                {this.state.size_category === 'OSFA' ? 
                <select className="osfa_size_drop_down_menu">
                  <option>OSFA</option>
                </select>
                : null}
                {this.state.size_category === 'S-XL' ? 
                <select className="s_to_xl_size_drop_down_menu" onChange={this.updateSizeOnChange}>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>X-Large</option>
                </select>
                : null}
                
                
              </div>
            </div>

            {this.state.current_product_in_cart === false ? 
             this.props.logged_in ? <button className="individual_product_add_to_cart_button" onClick={this.addToCart}>ADD TO CART</button> : <button className="not_logged_in_button">PLEASE LOG IN</button> : 
             <div className="view_cart_and_continue_shopping_buttons_container">
              <Link to="/cart"><button className="individual_product_view_cart_button">VIEW CART</button></Link>
              <Link to="/"><button className="individual_product_view_continue_shopping_button">CONTINUE SHOPPING</button></Link>
             </div>
            }

          </div>

        </section>

        <section className="alternate_product_images_container">
          <img src={this.state.all_product_images[0]} alt="product_image_number_one" onClick={ () => this.changeCurrentImageOnClick(this.state.all_product_images[0]) }/>
          <img src={this.state.all_product_images[1]} alt="product_image_number_two" onClick={ () => this.changeCurrentImageOnClick(this.state.all_product_images[1]) }/>
          <img src={this.state.all_product_images[2]} alt="product_image_number_three" onClick={ () => this.changeCurrentImageOnClick(this.state.all_product_images[2]) }/>
        </section>

        </div>
      )
    }
  
  }

  function moveFromStoreToProps(state) {
    return {
      logged_in: state.logged_in,
      userInfo: state.userInfo,
      current_view: state.current_view,
      current_product_in_cart: state.current_product_in_cart
    }
  }

  var outputActions = {
    adjustView,
    addCartItemCount
  }

  let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Individual_Product_Display);