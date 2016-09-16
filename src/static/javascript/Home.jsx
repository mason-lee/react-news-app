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
            source: undefined,
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
                // console.log(data);
                this.setState({data: data.articles});
            }.bind(this),
            complete: function() {
            }
        })
    },

    selectSource(e) {
        // this.setState({source: e.target.value});
        // console.log(this.state.source);
        // $.ajax({
        //     url: 'https://newsapi.org/v1/articles?source=' + e.target.value + '&apiKey=' + newsApiKey,
        //     crossOrigin: true,
        //     success: function (resp) {
        //         this.setState({articles: response.articles}.bind(this));
        //     },
        //     complete: function() {
        //
        //     }
        // });
	},

	render() {
        let newItems = [];
        let keyCnt = 1;
        this.state.data.map(function(article) {
            newItems.push(
                <div key={keyCnt++}>
                    <NewsItem article={article} />
                </div>
            );

        });

		return (
			<div>
                <Navbar />
                <select className="form-control" value={this.state.source} onChange={this.selectSource}>
                    <option value="techcrunch">Techcrunch</option>
                    <option value="espn">Espn</option>
                    <option value="hacker-news">Hacker News</option>
                    <option value="the-verge">The Verge</option>
                </select>
                {newItems}
			</div>
		);
	}

});

export default Home;
