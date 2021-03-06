import logo from './logo.svg';
import './App.css';
import liff from '@line/liff'
import {useState,useEffect} from 'react';

function App() {

const [pictureUrl, SetPictureUrl] = useState(logo);
const [idToken, SetIdToken] = useState("");
const [statusMessage, SetStatusMessage] = useState("");
const [displayName, SetDisplayName] = useState("");
const [userId, SetUserId] = useState("");

const logout = () =>{
  liff.logout();
  window.location.reload();

}

const initLine = () => {
  liff.init({ liffId: '1656200256-Zrp28MK5' }, () => {
    if (liff.isLoggedIn()) {
      runApp();
    } else {
      liff.login();
    }
  }, err => console.error(err));
}

const runApp = () => {
  const idToken = liff.getIDToken();
  SetIdToken(idToken);
  liff.getProfile().then(profile => {
    console.log(profile);
    SetDisplayName(profile.displayName);
    SetPictureUrl(profile.pictureUrl);
    SetStatusMessage(profile.statusMessage);
    SetUserId(profile.userId);
  }).catch(err => console.error(err));
}

useEffect(() => {
  initLine();
}, []);

  return (
    <div className="App">
      <header className="App-header">
        
<div style={{ textalign: "center" }}>
  <h1>React with LINE Login</h1>
  <img src={pictureUrl} width="300px" height="300px"/>
  <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all"}}><b>ID token: </b> { idToken }</p>
  <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>Display name: </b> { displayName }</p>
  <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>Status message: </b> { statusMessage }</p>
  <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>User ID: </b> { userId }</p>

  <button onClick={() => logout()} style={{width: "100%", height:30 }}>Logout</button>
</div>
      </header>
    </div>
  );
}

export default App;
