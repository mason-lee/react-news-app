import ReactDom from 'react-dom';
import React from 'react';
import Home from './Home';

window.initMap = function() {
    ReactDom.render(
        <Home />, document.getElementById('app')
    );
}
