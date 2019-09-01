import React, { Component } from 'react';
import ChordName from './chordName';
import ChordNotes from './chordNotes';
import PianoKeys from './pianoKeys';
import Options from './options';
import keyData from './scripts/keyData';
import chords from './scripts/chords';
import newChord from './scripts/newChord';
import playSound from './scripts/playSound';
import './stylesheets/chordMain.scss';

class ChordMain extends Component {
  state = {
    keyData: keyData,
    bpm: 60,
    chordName: 'Chord Name',
    chordNotes: 'Notes',
    interval: null,
    options: {
      chords: chords,
      show: false,
      chordDisplayOn: true,
      notesDisplayOn: true,
      keysDisplayOn: true,
      volume: 1
    }
  }

  startCreateChordLoop = () => {
    const tempo = 60000 / this.state.bpm;
    this.setState({ interval: setInterval(() => this.setNewChord(), tempo) }); 
    this.setState({ isLooping: true });
  }

  stopCreateChordLoop = () => {
    if (this.state.interval) clearInterval(this.state.interval);
    this.setState({ isLooping: false });    
  }

  setNewChord = () => {
    const { newNotes, chordName, chordNotes } = newChord(this.state.options.chords);
    this.setState({ chordName });
    this.setState({ chordNotes });
    this.clearDisplayedNotes();
    this.addDisplayedNotes(newNotes);
  }

  incrementBpm = num => {
    let bpm = this.state.bpm;
    bpm += num;
    bpm = this.validateBpm(bpm);
    this.setState({ bpm });
  }

  changeBpm = ({ target }) => this.setState({ bpm: this.validateBpm(target.value) });

  validateBpm = bpm => {
    bpm = parseInt(bpm, 10);
    if (!bpm || isNaN(bpm)) return 0;
    if (bpm >= 500) return 499;
    if (bpm <= 1) return 1;
    return bpm;
  }

  addDisplayedNotes(notes) {
    const keyData = [...this.state.keyData];
    for (let i = 0; i < notes.keyNotes.length; i++) {
      const noteIndex = notes.keyNotes[i].index;
      keyData[noteIndex].selected = true;
      playSound(noteIndex, this.state.options.volume);
    }
    this.setState({ keyData });
  }

  clearDisplayedNotes() {
    const keyData = [...this.state.keyData];
    for (let i = 0; i < keyData.length; i++) {
      keyData[i].selected = false;
    }
    this.setState({ keyData });
  }

  toggleShowOptions = () => {
    const options = { ...this.state.options };
    options.show = !options.show; 
    this.setState({ options });
  }

  updateOptions = options => this.setState({ options })

  renderButtons = () => {
    if (this.state.isLooping) {
      return <button className="chordButton startStopButton" onClick={ this.stopCreateChordLoop }>Stop</button>;
    }
    return <button className="chordButton startStopButton" onClick={ this.startCreateChordLoop }>Start</button>;
  }

  renderOptions = () => {
    if (this.state.options.show) {
      return <Options
        options={ this.state.options }
        updateOptions={ this.updateOptions }/>;
    }
  }

  render() { 
    return (
      <div className="chord">
        <button className="chordButton" onClick={ this.toggleShowOptions }>Options</button>
        <div>{ this.renderOptions() }</div>
        <span>
          <button className="chordButton minusButton" onClick={ () => this.incrementBpm(-1) }>-</button>
          <input
            className="chordButton bpm"
            value={ this.state.bpm }
            onChange={ this.changeBpm }
            type="number"
            min="1"
            max="499"/>
          <button className="chordButton plusButton" onClick={ () => this.incrementBpm(1) }>+</button>
        </span>
        <span>{ this.renderButtons() }</span>
        <ChordName chordName={ this.state.chordName }/>
        <ChordNotes chordNotes={ this.state.chordNotes }/>
        <PianoKeys keyData={ this.state.keyData }/>
      </div>
    );
  }
}
 
export default ChordMain;