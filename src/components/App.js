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
      display_text: 'it\'s spooky out here ...',
      key: '',
      clip: '',
    };
    this.handleInteraction = this.handleInteraction.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  handleInteraction(key) {
    let newText = sounds[key].text;
    let newClip = sounds[key].url;

    this.setState({ 
      display_text: newText,
      key: key,
      clip: newClip,
    }, () => {
      const sound = document.getElementsByClassName('clip')[0];
      sound.play();
    });
  }
  handleToggle(event) {
    let newText = event ? 'back on!' : '...and we are off.'
    this.setState({
      is_on: event,
      display_text: newText,
    });
  }
  handleButtonPress(event){
    let key = event.target.id;
    this.handleInteraction(key);
  }
  handleKeyPress(event){
    let key = event.key.toUpperCase();
    if (['S','P','O','U','K','Y'].includes(key)) {
      document.getElementById(key).click();
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
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
            onClick={this.handleButtonPress}
            is_disabled={!this.state.is_on} 
            activeKey={this.state.key}
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
          id={props.activeKey}
          src={props.clip}
        />
        {
          Object.keys(sounds).map(
            ([k])=> 
              <Button 
                variant="dark" 
                disabled={props.is_disabled} 
                onClick={props.onClick}
                id={k}
                key={k}
              >{k}</Button>
              
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
