import React, { Component } from 'react';
import './stylesheets/displayContainer.scss';

class ChordName extends Component {
  render() { 
    return (
      <div className="container">
        <span className="text">{ this.props.chordName }</span>
      </div>
    );
  }
}
 
export default ChordName;