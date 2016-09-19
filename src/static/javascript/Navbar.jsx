import ReactDom from 'react-dom';
import React from 'react';
import $ from 'jquery';
var newsApiKey = "2a24e8547c204bc5975d110569a6a2c5";

let NavBar = React.createClass({
    getNewsLink(value) {
        event.preventDefault();
        $.ajax({
            url: 'https://newsapi.org/v1/articles?source=' + value + '&apiKey=' + newsApiKey,
            crossOrigin: true,
            success: function (resp) {
                console.log(resp);
            },
            complete: function() {

            }
        });
    },

    render() {
        return (
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
        )
    }
});

export default NavBar;
