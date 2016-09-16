import ReactDom from 'react-dom';
import React from 'react';

let NewsItem = React.createClass({
    propTypes: {
        author: React.PropTypes.string,
        title: React.PropTypes.string
    },

    render() {
        return(
            <div>
                {this.props.article.title}
                <h1>
                    {this.props.article.author}
                </h1>
            </div>

        );
    }
});

export default NewsItem;
