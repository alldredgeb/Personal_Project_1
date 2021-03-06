import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import our_story_image_one from './../images/our_story_image_one.jpg';
import { connect } from 'react-redux';
import { adjustView } from './../ducks/reducer';

class Our_Story extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: true
    };

  }

  render() {
    return (
      <div className="overall_our_story_container">

        <header className="extra_links_header">
          <div className="extra_links_breadcrumb">
            <Link to="/"><p className="extra_links_breadcrumb_link_to_home" onClick={ () => this.props.adjustView('Home') }>Home</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="extra_links_breadcrumb_description">Our story</p>
          </div>
        </header>

        <div className="extra_links_header_title_container">
          <p className="extra_links_name_header">Our story</p>
        </div>

        {this.state.display === true ? 
        <div>
        <p className="our_story_text">
        We are a South African menswear denim lifestyle brand with a global reach. We live by the notion that simplicity is the ultimate sophistication. In everything we do, we want to make sure that we keep it simple, but significant, remove all excess and clutter and intently focus on quality, craftsmanship and design. As a brand we are about well made items imbued with history, about providing a rare combination of trend and longevity, offering the discerning customer, on trend understated garments with an extended life span due to selective styling, quality and detail!
        </p>

        <img className="our_story_image_one" src={our_story_image_one} alt="Our Story" />

        <p className="our_story_text">
        Our unceasing goal is to provide our customers with apparel and footwear that have been "marked by truth" which retails at a fair price, we are about offering the discerning customer a rare combination of well-made, on-trend items with longevity and minimalist design features. We are on a journey to restore desire, to strip back thoughts, and to preserve the past by making it work in the present.
        </p>
        </div>
        : null}

      </div>
    )
  }

}

function moveFromStoreToProps(state) {
  return {
    current_view: state.current_view
  }
}

var outputActions = {
  adjustView
}
 
let connectedApp = connect(moveFromStoreToProps, outputActions);

export default connectedApp(Our_Story);