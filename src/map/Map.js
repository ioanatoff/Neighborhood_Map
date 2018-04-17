import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Map.css';
import * as WikiAPI from '../WikiAPI'

export class MapContainer extends Component {

  markers = [];

  componentDidMount() {
    this.createMap();
  }

  // when a item is selected from the location list the marker associatied with it is animated
  animate(location) {
    let selectedMarker = this.markers.find(marker => marker.name === location.name);
    if(selectedMarker) {
      this.markers.splice(this.markers.indexOf(selectedMarker), 1);
      selectedMarker.setMap(null);
      window.setTimeout(() => {
        let marker = this.createMarker(location, true);
        this.markers.push(marker);
        this.setInfoContent(marker)
      }, 200);
    }
  }

  // retrieves and sets the content of the infowindow
  setInfoContent = (marker) => {
    this.infowindow.setContent('');
    WikiAPI.getInfo(marker.name).then(info => {
      let data = info.query.pages[Object.keys(info.query.pages)[0]].extract
      WikiAPI.getImages(marker.name).then(info => {
        let image = info.query.pages[Object.keys(info.query.pages)[0]].thumbnail;
        this.infowindow.setContent(`
          <div class="info-cont">
            <span>
              <img alt="${marker.name}" src="${image? image.source: ''}"/>
            </span>
            <span>${data}</span>
            <div><a href="https://en.wikipedia.org/wiki/Wiki">From Wikipedia.com</a></div>
          </div>
        `);
        this.infowindow.open(this.map, marker);
      })
    })
  }

  // creates google map object infowindow and markers
  createMap = () => {
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const mapConfig = Object.assign({}, {
        center: {lat: 46.770960, lng: 23.586940},
        zoom: 14
      })

      this.map = new maps.Map(node, mapConfig);

      this.infowindow = new google.maps.InfoWindow({
        maxWidth: 400
      });

      this.props.locations.forEach(location => {
        this.markers.push(this.createMarker(location))
      })
    }
  }

  createMarker = (location, animate) => {
    let marker = new this.props.google.maps.Marker({
      name: location.name,
      position: {lat: location.position.lat, lng: location.position.lng},
      tabindex: 0,
      map: this.map,
      title: location.name,
      animation: animate? this.props.google.maps.Animation.DROP: undefined
    })

    marker.addListener('click', () => {
      this.setInfoContent(marker);
    });

    return marker;
  }

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }

    if(this.props.locations.length !== this.markers.length) {
      this.markers.forEach(marker => {
        marker.setMap(null);
      })

      this.markers = [];

      this.props.locations.forEach(location => {
        this.markers.push(this.createMarker(location))
      })
    }

    if(this.props.selectedLocation) {
      this.animate(this.props.selectedLocation);
    }

    return (
      <div className="map-cont">
        <div ref="map" style={style}></div>
      </div>
    );
  }
}

export default MapContainer
