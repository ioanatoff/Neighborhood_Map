import React, { Component } from 'react';
import './Header.css';
import FontAwesome from 'react-fontawesome';

class Header extends Component {

    render() {
        return (
            <div className="header" >
                <button className="menu-button" onClick={() => this.props.toggleMenu()}>
                    <FontAwesome name='bars' size='2x'/>
                </button>
            </div>
        );
    }
}

export default Header;
