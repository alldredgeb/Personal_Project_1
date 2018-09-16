import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adjustView } from './../ducks/reducer';

class Contact_Us extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      message: '',
      display: true
    };
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePhoneInput = this.handlePhoneInput.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.handleClickOfSubmit = this.handleClickOfSubmit.bind(this);
  }

  //Method (onClick): reset state to empty;
  handleNameInput(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleEmailInput(event) {
    this.setState({
      email: event.target.value
    })
  }

  handlePhoneInput(event) {
    this.setState({
      phone: event.target.value
    })
  }

  handleMessageInput(event) {
    this.setState({
      message: event.target.value
    })
  }

  handleClickOfSubmit() {
    this.setState({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
  }

  render() {
    return (
      <div className="overall_contact_us_container">
      
        <header className="extra_links_header">
          <div className="extra_links_breadcrumb">
            <Link to="/"><p className="extra_links_breadcrumb_link_to_home" onClick={ () => this.props.adjustView('Home') }>Home</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="extra_links_breadcrumb_description">Contact Us</p>
          </div>
        </header>

        <div className="extra_links_header_title_container">
          <p className="extra_links_name_header">Contact Us</p>
        </div>

        {this.state.display === true ? 
        <div className="contact_us_inputs_and_send_container">
          <input className="contact_us_input" value={this.state.name} onChange={this.handleNameInput} placeholder="Name"/>
          <input className="contact_us_input" value={this.state.email} onChange={this.handleEmailInput} placeholder="Email"/>
          <input className="contact_us_input" value={this.state.phone} onChange={this.handlePhoneInput} placeholder="Phone Number"/>
          <textarea className="contact_us_textarea" value={this.state.message} onChange={this.handleMessageInput} placeholder="Message"/>
          <button className="contact_us_send_button" onClick={this.handleClickOfSubmit}>SEND</button>
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

export default connectedApp(Contact_Us);