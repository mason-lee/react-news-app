import ReactDom from 'react-dom';
import React from 'react';
import $ from 'jquery';
import classNames from 'classNames';
import Navbar from './Navbar';
import NewsItem from './NewsItem';
var newsApiKey = "2a24e8547c204bc5975d110569a6a2c5";

let Home = React.createClass({

    getInitialState() {
        // Initial state.
        return {
            techcrunch: {
                data: [],
                loaded: false,
                show: false
            },
            espn: {
                data: [],
                loaded: false,
                show: false
            },
            hackernews: {
                data: [],
                loaded: false,
                show: false
            },
            theverge: {
                data: [],
                loaded: false,
                show: false
            }
        };
    },

    componentDidMount() {
        $.ajax({
            url: 'https://newsapi.org/v1/articles?source=techcrunch' + '&apiKey=' + newsApiKey,
            crossOrigin: true,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ techcrunch: { data: data.articles, loaded: true, show: true } });
            }.bind(this)
        });
    },

    getNewsLink(value) {
        event.preventDefault();
        if (value === 'espn') {
            $.ajax({
                url: 'https://newsapi.org/v1/articles?source=espn' + '&apiKey=' + newsApiKey,
                crossOrigin: true,
                success: function (data) {
                    this.setState({ espn: { data: data.articles, loaded: true } });
                }.bind(this)
            });
        }
    },

	render() {
        let techcrunchItems = [];
        let techcrunchCount = 0;
        this.state.techcrunch.data.map(function(article) {
            techcrunchItems.push(
                <NewsItem article={article} key={techcrunchCount++} className="techcrunch-item"/>
            );
        });

        let espnItems = [];
        let espnCount = 0;
        this.state.espn.data.map(function(article) {
            espnItems.push(
                <NewsItem article={article} key={espnCount++} className="espn-item"/>
            )
        });

		return (
			<div>
                <nav className="navbar">
                    <div className="nav-wrapper">
                        <a href="" className="brand-logo">Your Favorite News</a>
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <a value="techcrunch" onClick={this.getNewsLink.bind(this, "techcrunch")}>Techcrunch</a>
                            </li>
                            <li>
                                <a value="espn" onClick={this.getNewsLink.bind(this, "espn")}>Espn</a>
                            </li>
                            <li>
                                <a value="hacker-news" onClick={this.getNewsLink.bind(this, "hacker-news")}>Hacker News</a>
                            </li>
                            <li>
                                <a value="the-verge" onClick={this.getNewsLink.bind(this, "the-verge")}>The Verge</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="body-wrapper">
                    <div>
                        {techcrunchItems}
                    </div>
                    <div>
                        {espnItems}
                    </div>
                </div>
			</div>
		);
	}

});

export default Home;
