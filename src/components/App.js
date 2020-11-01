// React
import React, { Component } from 'react';

// CSS
import './App.css';

// mp3 files
import sounds from './audios';

// bootstrap
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

// Main App Component
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      is_on: true,
      display_text: '',
      key: '',
      clip: '',
    };
    this.handleInteraction = this.handleInteraction.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleInteraction(event) {
    let newKey = event.target.id;
    let newText = sounds[newKey].text;
    let newClip = sounds[newKey].url;

    this.setState({ 
      display_text: newText,
      key: newKey,
      clip: newClip,
    }, () => {
      const sound = document.getElementsByClassName('clip')[0];
      sound.play();
    });
  }
  handleToggle(event) {
    this.setState({
      is_on: event
    });
  }
  render() {
    return (
      <div id="App">
        <div></div>
        <div id="drum-machine">
          <ToggleComponent 
            checked={this.state.is_on} 
            onChange={this.handleToggle}
          />
          <DisplayComponent 
            text={this.state.display_text}
          />
          <ButtonsContainer 
            onClick={this.handleInteraction}
            is_disabled={!this.state.is_on} 
            keyTrigger={this.state.key}
            clip={this.state.clip}
          />
        </div>
        <footer>
          <p>	&#169; 2020, camila.</p>
        </footer>
      </div>
    );
  }
}


// Display
const DisplayComponent = props => {
  return (
      <div id="display">
          <Alert variant="dark" id="displayAlert">
            <center>{props.text}</center>
          </Alert>
      </div>
  );
};


// Buttons for drum-pad
const ButtonsContainer = props => {
  return (
      <div id="buttons-container">
        <audio
          className='clip'
          id={props.keyTrigger}
          src={props.clip}
        />
        {
          Object.keys(sounds).map(
            ([key])=> 
              <Button 
                variant="dark" 
                disabled={props.is_disabled} 
                onClick={props.onClick}
                id={key}
              >{key}</Button>
              
          )
        }
      </div>
  );
};


// Toggle
const ToggleComponent = props => {
  return (
      <div id="toggle-container">
        <BootstrapSwitchButton
            size="sm" 
            onstyle="secondary" 
            offstyle="dark"
            onlabel='on'
            offlabel='off'
            checked={props.checked} 
            onChange={props.onChange}
        />
      </div>
  );
};


export default App;
