import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adjustView } from './../ducks/reducer';

class FAQ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: true
    };

  }

  render() {
    return (
      <div className="overall_faq_container">
      
        <header className="faq_header">
          <div className="faq_breadcrumb">
            <Link to="/"><p className="faq_breadcrumb_link_to_home" onClick={ () => this.props.adjustView('Home') }>Home</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="faq_breadcrumb_description">FAQ</p>
          </div>
        </header>

        {this.state.display === true ? 
        <div>
        <p className="qu">Do you ship overseas?</p>
        <p className="an">Yes, we ship all over the world. Shipping costs will apply, and will be added at checkout. We run discounts and promotions all year, so stay tuned for exclusive deals.</p>

        <p className="qu">How long will it take to get my order?</p>
        <p className="an">It depends on where you are. Orders processed here will take 5-7 business days to arrive. Overseas deliveries can take anywhere from 7-16 days. Delivery details will be provided in your confirmation email.</p>

        <p className="qu">What shipping carriers do you use?</p>
        <p className="an">We use all major carriers, and local courier partners. You’ll be asked to select a delivery method during checkout.</p>

        <p className="qu">Can I return my product?</p>
        <p className="an">We always aim for make sure our customers love our products, but if you do need to return an order, we’re happy to help. Just email us directly and we’ll take you through the process.</p>

        <p className="qu">Can I get my product personalized?</p>
        <p className="an">It depends on the creator and the product. All options are outlined on the product page, so look out for customization options there.</p>

        <p className="qu">Can I sign up to your newsletter?</p>
        <p className="an">Yes! Just enter your email here, and you’ll be added to our subscription list. You’ll be sent updates, exclusive offers, and much more.</p>

        <p className="qu">Are these Q&As real?</p>
        <p className="an">No. This is demonstration content, designed to showcase how these page could look with your own content.</p>
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

export default connectedApp(FAQ);