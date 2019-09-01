import React, { Component } from 'react';
import './stylesheets/displayContainer.scss';

class ChordNotes extends Component {
  render() { 
    return (
      <div className="container">
        <span className="text">{ this.props.chordNotes }</span>
      </div>
    );
  }
}
 
export default ChordNotes;