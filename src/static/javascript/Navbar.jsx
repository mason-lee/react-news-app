import ReactDom from 'react-dom';
import React from 'react';

let NavBar = React.createClass({
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Project name</a>
                    </div>
                </div>
            </nav>
        )
    }
});

export default NavBar;
