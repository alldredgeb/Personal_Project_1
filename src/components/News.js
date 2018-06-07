import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class News extends Component {

  render() {
    return (
      <div className="overall_news_container">

        <header className="news_header">
          <div className="news_breadcrumb">
            <Link to="/"><p className="news_breadcrumb_link_to_home">Home</p></Link>
            <div className="nav_between_symbol">›</div>
            <p className="news_breadcrumb_description">News</p>
          </div>
        </header>

        <p className="news_name_header">News</p>

        <div className="news_story_one">
          <p className="news_story_one_header">Reveal the process</p>
          <p className="news_story_one_author_info">Posted by Chris Long on October 30, 2017</p>
          <p className="news_story_one_brief">S.P.C.C value and celebrate the process behind the product. This video pays homage to the skilled hands that create our premium denim collection. Work hard, Stay inspired. </p>
          <p className="news_story_one_link_to_full_story">Read more →</p>
        </div>

        <div className="news_story_two">
          <p className="news_story_two_header">Reveal the process</p>
          <p className="news_story_two_author_info">Posted by Chris Long on October 30, 2017</p>
          <p className="news_story_two_brief">S.P.C.C value and celebrate the process behind the product. This video pays homage to the skilled hands that create our premium denim collection. Work hard, Stay inspired. </p>
          <p className="news_story_two_link_to_full_story">Read more →</p>
        </div>

        <div className="news_story_three">
          <p className="news_story_three_header">Reveal the process</p>
          <p className="news_story_three_author_info">Posted by Chris Long on October 30, 2017</p>
          <p className="news_story_three_brief">S.P.C.C value and celebrate the process behind the product. This video pays homage to the skilled hands that create our premium denim collection. Work hard, Stay inspired. </p>
          <p className="news_story_three_link_to_full_story">Read more →</p>
        </div>

      </div>
    )
  }

}

export default News;