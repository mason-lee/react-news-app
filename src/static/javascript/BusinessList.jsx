import ReactDom from 'react-dom';
import React from 'react';

let BusinessList = React.createClass({
    getInitialState() {

    },

    render() {
		return (
            <div className="result-row">
                <div className="result-row-left">
                    <img src="" alt="Photo of the business" className="biz-main-image"/>
                </div>
                <div className="result-row-right">
                    <a href="#" className="biz-name">Hair Salon Name</a>
                </div>
            </div>
        );
    }
});

export default BusinessList;
