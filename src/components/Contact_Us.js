import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Contact_Us extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone_number: 0,
      message: ''
    };
    
  }

  //Method (onClick): reset state to empty;

  render() {
    return (
      <div className="overall_contact_us_container">
      
        <header className="contact_us_header">
          <div className="contact_us_breadcrumb">
            <Link to="/"><p className="contact_us_breadcrumb_link_to_home">Home</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="contact_us_breadcrumb_description">Contact us</p>
          </div>
        </header>

        <p className="contact_us_name_header">Contact us</p> 

        <input className="contact_us_name_input" />
        <input className="contact_us_email_input" />
        <input className="contact_us_phone_number_input" />
        <textarea className="contact_us_message_textarea" />
        <button className="contact_us_send_button">SEND</button>
      
      </div>
    )
  }

}

export default Contact_Us;