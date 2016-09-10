import ReactDom from 'react-dom';
import React from 'react';
import Reqwest from 'reqwest';
import Navbar from './Navbar';
import BusinessList from './BusinessList';

let Home = React.createClass({

    getInitialState() {
        // Initial state.
        return {
            locations: null,
            map: null,
            searchResults: []
        };
    },

    componentDidMount() {

    },
    /************************************************************
    Google Places API Stuff
    *************************************************************/
    searchMap(arg) {
        if (arg === undefined) {
            return;
        }

        var map = new google.maps.Map(document.getElementById('map'), {
            center: arg,
            zoom: 15
        });
        this.setState({map: map});

        var infowindow = new google.maps.InfoWindow({
            content: document.getElementById("info-window")
        });

        var autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"), {
                types: ['(cities)'],
                componentRestrictions: {'country': 'us'}
            }
        );
        var service = new google.maps.places.PlacesService(map);

        autocomplete.addListener('place_changed', onPlaceChanged);


        service.nearbySearch({
            location: arg,
            radius: 500,
            type: ['hair_care']
        }, this.callback);
    },

    callback(results, status) {
        //console.log('fn callback');
        console.log(results);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.renderList(results);
            // this.setState({searchResults: results});
            for (var i = 0; i < results.length; i++) {
                this.createMarker(results[i]);
            }
        }
    },

    renderList(results) {
        var listWrapper = document.querySelector(".business-wrapper");
        for (var i = 0; i < results.length; i++) {
            var outerDiv = document.createElement("div");
            outerDiv.className="result-row";
            var innerLeftDiv = document.createElement("div");
            innerLeftDiv.className="result-row-left";
            var innerRightDiv = document.createElement("div");
            innerRightDiv.className = "result-row-right";
            var businessName = document.createElement("a");
            businessName.className = "biz-name";
            var businessAddress = document.createElement("span");
            businessAddress.className="biz-address";

            // Set the content
            businessName.innerHTML = results[i].name;
            businessAddress.innerHTML = results[i].vicinity;

            // Append
            innerRightDiv.appendChild(businessName);
            innerRightDiv.appendChild(businessAddress);
            outerDiv.appendChild(innerLeftDiv);
            outerDiv.appendChild(innerRightDiv);

            listWrapper.appendChild(outerDiv);
        }
    },

    createMarker(place) {
        //console.log('fn createMarker', place);

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
    handleSearchKeyword(e) {
        this.setState({location: e.target.value});
    },

    handleSearch(e) {
		e.preventDefault();
        // var location = this.state.location.trim();
        // console.log(location);
        var searchingLocation = {lat: 34.0522, lng: -118.2437}
        this.searchMap(searchingLocation);
	},

	render() {
		return (
			<div>
                <Navbar />
				<div className="location-search-box">
	                <form onSubmit={this.handleSearch}>
                        <div className="form-group">
                            <label>Where are you looking to cut your hair?</label>
                            <input className="form-control" id="autocomplete" type="text" placeholder="Normal text" value={this.state.location || ''} onChange={this.handleSearchKeyword} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-default">Search</button>
                        </div>
	                </form>
	            </div>
                <div className="business-wrapper pull-left col-md-6">
                </div>
			</div>
		);
	}

});

export default Home;
