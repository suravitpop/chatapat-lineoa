import React, { Component } from 'react';

const liff = window.liff;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      userLineID: '',
      pictureUrl: ''
    };
  }

  componentDidMount = async() => {
    await liff.init({ liffId: '1656200256-Zrp28MK5' }).catch(err=>{throw err});
    if (liff.isLoggedIn()) {
      let getProfile = await liff.getProfile();
      this.setState({
        name: getProfile.displayName,
        userLineID: getProfile.userId,
        pictureUrl: getProfile.pictureUrl,
      });
    }else{
      liff.login();
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="support">
            <p>ชื่อ {this.state.name}</p>
            <p>Line ID {this.state.userLineID}</p>
            <img width="250" alt='pic' src={this.state.pictureUrl} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;