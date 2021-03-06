import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adjustView } from './../ducks/reducer';

class Return_Policy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: true
    };

  }

  render() {
    return (
      <div className="overall_return_policy_container">
      
        <header className="extra_links_header">
          <div className="extra_links_breadcrumb">
            <Link to="/"><p className="extra_links_breadcrumb_link_to_home" onClick={ () => this.props.adjustView('Home') }>Home</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="extra_links_breadcrumb_description">Return policy</p>
          </div>
        </header>

        <div className="extra_links_header_title_container">
          <p className="extra_links_name_header">Return Policy</p>
        </div>

        {this.state.display === true ? 
        <div>
        <div className="returns_part_one_container">
          <p className="returns_subtitle_one">RETURNS</p>
          <p className="returns_text">Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.</p>
          <p className="returns_text">To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
          <p className="returns_text">Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.</p>

          <p className="returns_text">Additional non-returnable items:</p>
          <p className="returns_bullet">* Gift cards</p>
          <p className="returns_bullet">* Downloadable software products</p>
          <p className="returns_bullet">* Some health and personal care items</p>

          <p className="returns_text">To complete your return, we require a receipt or proof of purchase.</p>
          <p className="returns_text">Please do not send your purchase back to the manufacturer.</p>

          <p className="returns_text">There are certain situations where only partial refunds are granted: (if applicable)</p>
          <p className="returns_bullet">* Book with obvious signs of use</p>
          <p className="returns_bullet">* CD, DVD, VHS tape, software, video game, cassette tape, or vinyl record that has been opened.</p>
          <p className="returns_bullet">* Any item not in its original condition, is damaged or missing parts for reasons not due to our error.</p>
          <p className="returns_bullet">* Any item that is returned more than 30 days after delivery</p>
        </div>

        <div className="returns_part_two_container">
          <p className="returns_subtitle_two">Refunds (if applicable)</p>
          <p className="returns_text">Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
          <p className="returns_text">If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
        </div>

        <div className="returns_part_three_container">
          <p className="returns_subtitle_three">Late or missing refunds (if applicable)</p>
          <p className="returns_text">If you haven’t received a refund yet, first check your bank account again.</p>
          <p className="returns_text">Then contact your credit card company, it may take some time before your refund is officially posted.</p>
          <p className="returns_text">Next contact your bank. There is often some processing time before a refund is posted.</p>
          <p className="returns_text">If you’ve done all of this and you still have not received your refund yet, please contact us at contact@demoshop.com. </p>
        </div>

        <div className="returns_part_four_container">
          <p className="returns_subtitle_four">Sale items (if applicable)</p>
          <p className="returns_text">Only regular priced items may be refunded, unfortunately sale items cannot be refunded.</p>
        </div>

        <div className="returns_part_five_container">
          <p className="returns_subtitle_five">Exchanges (if applicable)</p>
          <p className="returns_text">We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at email@email.com and send your item to: 150 Elgin Street Ottawa Ontario CA K2P 1L4.</p>
        </div>

        <div className="returns_part_six_container">
          <p className="returns_subtitle_six">Gifts</p>
          <p className="returns_text">If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.</p>
          <p className="returns_text">If the item wasn’t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.</p>
        </div>

        <div className="returns_part_seven_container">
          <p className="returns_subtitle_seven">Shipping</p>
          <p className="returns_text">To return your product, you should mail your product to: 150 Elgin Street Ottawa Ontario CA K2P 1L4.</p>
          <p className="returns_text">You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
          <p className="returns_text">Depending on where you live, the time it may take for your exchanged product to reach you, may vary.</p>
          <p className="returns_text">If you are shipping an item over $75, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.</p>
        </div>
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

export default connectedApp(Return_Policy);