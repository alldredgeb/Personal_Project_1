import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adjustView } from './../ducks/reducer';

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: true
    };

  }

  render() {
    return (
      <div className="overall_news_container">

        <header className="extra_links_header">
          <div className="extra_links_breadcrumb">
            <Link to="/"><p className="extra_links_breadcrumb_link_to_home" onClick={ () => this.props.adjustView('Home') }>Home</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="extra_links_breadcrumb_description">News</p>
          </div>
        </header>

        <div className="news_header_title_container">
          <p className="news_name_header">News</p>
        </div>

        {this.state.display === true ? 
          <div className="news_story_one">
            <p className="news_story_one_header">Keeping you in the know</p>
            <p className="news_story_one_author_info">Posted by <b>Benjamin Alldredge</b> on September 14, 2018</p>
            <p className="news_story_one_brief">We do not have any news as of yet! However, we will post new stories here as they become available. Check back later for stories as they develop!</p>
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

export default connectedApp(News);