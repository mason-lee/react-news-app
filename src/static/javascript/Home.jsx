import ReactDom from 'react-dom';
import React from 'react';
import Reqwest from 'reqwest';
import Navbar from './Navbar';

let Home = React.createClass({

    searchMap(arg) {
        if (arg === undefined) {
            return;
        }

        var map = new google.maps.Map(document.getElementById('map'), {
            center: arg,
            zoom: 15
        });
        this.setState({map: map});

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: arg,
            radius: 500,
            type: ['hair_care']
        }, this.callback);
    },

    callback(results, status) {
        console.log('fn callback');
        console.log(results);
        if (status === google.maps.places.PlacesServiceStatus.OK) {

            this.renderList(results);

            for (var i = 0; i < results.length; i++) {
                this.createMarker(results[i]);
            }
        }
    },

    renderList(results) {
        for (var i = 0; i < results.length; i++) {
            var el = document.createElement("p");
            el.textContent = results[i].name;
            document.body.appendChild(el);
        }
    },

    createMarker(place) {
        console.log('fn createMarker', place);

        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: this.state.map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    },

    getInitialState() {
        // Initial state.
        return {
            locations: null,
            map: null
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
        var searchingLocation = {lat: 34.0522, lng: -118.2437}
        this.searchMap(searchingLocation);
        // var pyrmont = {lat: -33.867, lng: 151.195};






        // Reqwest({
	    //     url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=hair_care&key=AIzaSyB2-0465Lm6kqucnBgemUvzKKr8lRjP9Tw",
	    //     crossOrigin: true,
	    //     success: function (resp) {
	    //         console.log(resp)
	    //     },
	    //     complete: function() {
        //
	    //     }
	    // });
	},

	render() {
		return (
			<div>
                <Navbar />
				<div className="location-search-box">
	                <form onSubmit={this.handleSearch}>
                        <div className="form-group">
                            <label>Where are you looking to cut your hair?</label>
                            <input className="form-control" type="text" placeholder="Normal text" value={this.state.location || ''} onChange={this.handleSearchKeyword} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-default">Search</button>
                        </div>
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
