import ReactDom from 'react-dom';
import React from 'react';
import $ from 'jquery';
import Navbar from './Navbar';
import NewsItem from './NewsItem';
var newsApiKey = "2a24e8547c204bc5975d110569a6a2c5";

let Home = React.createClass({

    getInitialState() {
        // Initial state.
        return {
            data: []
        };
    },

    componentDidMount() {
        $.ajax({
            url: 'https://newsapi.org/v1/articles?source=techcrunch' + '&apiKey=' + newsApiKey,
            crossOrigin: true,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data.articles});
            }.bind(this)
        });
    },

	render() {
        let newItems = [];
        let articleCount = 0;
        this.state.data.map(function(article) {
            newItems.push(
                <NewsItem article={article} key={articleCount++} />
            );
        });

		return (
			<div>
                <Navbar />
                <div className="body-wrapper">
                    {newItems}
                </div>
			</div>
		);
	}

});

export default Home;
