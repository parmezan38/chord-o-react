import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import './stylesheets/options.scss';

class Options extends Component {

  updateChord = index => {
    const chords = cloneDeep(this.props.options.chords);
    chords[index].used = !chords[index].used;
    this.updateOptions({ value: chords, index: 'chords' });
  }

  updateVolume = ({ currentTarget }) => {
    const value = parseFloat(currentTarget.value, 10);
    this.updateOptions({ value, index: 'volume' });
  }

  updateOptions = ({ value, index }) => {
    const options = cloneDeep(this.props.options);
    options[index] = value || !options[index];
    this.props.updateOptions(options);
  }

  renderChordData = () => {
    return this.props.options.chords.map(({ name, used }, index) => {
      return this.renderSingleOption({
        label: name,
        value: used,
        onChange: () => this.updateChord(index),
        key: index
      });
    });
  }

  renderSingleOption = ({ label, value, onChange, key }) => {
    return (<tbody key={ key || label }>
      <tr>
        <td><label>{ label }</label></td>
        <td>
          <label className="switch">
          <input
            type="checkbox"
            defaultChecked={ value }
            onChange={ onChange }/>
            <span className="checkbox-slider"></span>
          </label>
        </td>
      </tr>
    </tbody>);
  }

  render() {
    return (
      <div className="options">
        <h4>Display options:</h4>
        <table className="display-options">
          { this.renderSingleOption({
              label: 'Chord Name',
              value: this.props.options.chordDisplayOn,
              onChange: () => this.updateOptions({ index: 'chordDisplayOn' })
            }) }
          { this.renderSingleOption({
              label: 'Notes',
              value: this.props.options.notesDisplayOn,
              onChange: () => this.updateOptions({ index: 'notesDisplayOn' })
            }) }
          { this.renderSingleOption({
              label: 'Piano',
              value: this.props.options.keysDisplayOn,
              onChange: () => this.updateOptions({ index: 'keysDisplayOn' })
            }) }
          <tbody>
            <tr>
              <td><label>Volume</label></td>
              <td>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  className="slider"
                  step="0.1"
                  value={ this.props.options.volume }
                  onChange={ this.updateVolume }/>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <h4>Chord options:</h4>
          <table className="chord-types">
            { this.renderChordData() }
          </table>
        </div>
      </div>
    );
  }
}
 
export default Options;