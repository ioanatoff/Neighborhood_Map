import React, { Component } from 'react';
import './SidePanel.css';
import FontAwesome from 'react-fontawesome';

class SidePanel extends Component {

    state = {
      query: ''
    }

    updateQuery = (query) => {
      this.setState(state => ({
        query: query
      }))

      this.props.filter(query);
    }

    render() {
        return (
            <div className="side-panel">
              <div className="side-title">Cluj Attractions</div>
              <div className="search-input">
                <input value={this.state.query} type="text" placeholder="Filter"
                       onChange={(event) => this.updateQuery(event.target.value)}/>
                 <FontAwesome
                     name='filter'
                     className='search-icon'
                 />
              </div>
              {this.props.locations.map((location) => {
                return (
                  <button key={location.shortName}
                       onClick={() => this.props.selectMarker(location)}
                       className="list-item">
                    {location.shortName}
                  </button>
                )}
              )}
            </div>
        );
    }
}

export default SidePanel;
