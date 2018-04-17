import React, { Component } from 'react';
import './App.css';
import MapContainer from './map/Map'
import Header from './header/Header';
import SidePanel from './side-panel/SidePanel';
import 'font-awesome/css/font-awesome.css'
import {GoogleApiWrapper} from 'google-maps-react';

class App extends Component {

  locations = [{
    name: 'Cluj-Napoca Hintz House',
    shortName: 'Hintz House',
    position: { lat: 46.7708908, lng: 23.5890579 }
  },{
    name: 'Matthias Corvinus Monument',
    shortName: 'Matthias Statue',
    position: { lat: 46.769500, lng: 23.589870 }
  },{
    name: 'Cluj-Napoca National Theatre',
    shortName: 'Cluj Theatre',
    position: { lat: 46.770313, lng: 23.597487 }
  },{
    name: 'Cluj-Napoca Botanical Garden',
    shortName: 'Botanical Garden',
    position: { lat: 46.762083, lng: 23.588634 }
  },{
    name: 'Cluj-Napoca Tailors\' Bastion',
    shortName: 'Tailors\' Tower',
    position: { lat: 46.768139, lng: 23.597507 }
  }];

  state = {
    menuCollapsed: false,
    locations: this.locations,
    selectedLocation: {}
  }

  // shows and hides the side panel
  toggleMenu = () => {
    this.setState(state => ({
      menuCollapsed: !state.menuCollapsed,
      locations: state.locations,
      selectedLocation: {}
    }))
  }

  // filters the locations based on the input query
  filter = (query) => {
    this.setState(state => ({
      locations: this.locations.filter(loc => this.search(loc, query)),
      selectedLocation: {}
    }))
  }

  // used to do the actual location search 
  search = (loc, query) => {
    if(!query) {
      return true;
    } else {
      return loc.shortName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    }
  }

  // sets the selectedLocation when one is selected from the side panel
  selectMarker = (location) => {
    this.setState(state => ({
      selectedLocation: location
    }))
  }

  render() {
    return (
      <div className="App">
        <nav className={this.state.menuCollapsed? 'collapsed': ''}>
          <SidePanel locations={this.state.locations}
                     filter={this.filter}
                     selectMarker={this.selectMarker}/>
        </nav>
        <main className={this.state.menuCollapsed? 'collapsed': ''}>
          <Header toggleMenu={this.toggleMenu}/>
          <MapContainer google={this.props.google}
                        selectedLocation={this.state.selectedLocation}
                        locations={this.state.locations}/>
        </main>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCvxAFzr_1gWXWbu6bh8ikqgFWYl2l266o"
})(App)
