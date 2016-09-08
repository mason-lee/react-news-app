import ReactDom from 'react-dom';
import React from 'react';
import Reqwest = 'reqwest';

let Home = React.createClass({
    // var map;
    // var infowindow;

    setUpMap() {
        // if (arg === undefined) {
        //     return;
        // }
        //
        // var map = new google.maps.Map(document.getElementById('map'), {
        //     center: arg,
        //     zoom: 15
        // });

    },

    searchMap(arg) {
        // var infowindow = new google.maps.InfoWindow();
        // var service = new google.maps.places.PlacesService(map);
        // service.nearbySearch({
        //     location: arg,
        //     radius: 500,
        //     type: ['hair_care']
        //     }, callback);
    },

    callback(results, status) {
        // if (status === google.maps.places.PlacesServiceStatus.OK) {
        //     // debugger;
        //     for (var i = 0; i < results.length; i++) {
        //         createMarker(results[i]);
        //     }
        // }
    },

    createMarker(place) {
        // var placeLoc = place.geometry.location;
        // var marker = new google.maps.Marker({
        //     map: map,
        //     position: place.geometry.location
        // });
        //
        // google.maps.event.addListener(marker, 'click', function() {
        //     infowindow.setContent(place.name);
        //     infowindow.open(map, this);
        // });
    },

    getInitialState() {
        // Initial state.
        return {
            locations: null
        };
    },

    componentDidMount() {

    },

    handleSearchKeyword(e) {
        this.setState({location: e.target.value});
    },

    handleSearch(e) {
		e.preventDefault();
        // var location = this.state.location.trim();
        // console.log(location);
        // var searchingLocation = {lat: 34.0522, lng: -118.2437}
        // searchMap(searchingLocation);
	},

	render() {
		return (
			<div>
				<div className="location-search-box">
	                <form onSubmit={this.handleSearch}>
                            <input type="text" placeholder="Normal text" value={this.state.location || ''} onChange={this.handleSearchKeyword} />
                            <button type="submit">Search</button>
	                </form>
	            </div>
				<div className="result-row">
					<div className="result-row-left">
						<img src="http://s3-media2.fl.yelpcdn.com/bphoto/VhZVrD2K8oksYB4iIGLmog/90s.jpg" alt="Photo of the business" className="biz-main-image"/>
					</div>
					<div className="result-row-right">
						<a href="#" className="biz-name">Hair Salon Name</a>
					</div>
				</div>
			</div>
		);
	}

});

export default Home;
