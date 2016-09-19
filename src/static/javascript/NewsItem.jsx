import ReactDom from 'react-dom';
import React from 'react';

let NewsItem = React.createClass({
    propTypes: {
        author: React.PropTypes.string,
        title: React.PropTypes.string
    },

    render() {
        return(
            <div className="newsItem">
                <h4 className="news-title">{this.props.article.title}</h4>
                <span>
                    {this.props.article.author}
                </span>
            </div>

        );
    }
});

export default NewsItem;
