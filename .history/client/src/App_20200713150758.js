import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const spotifyLogin = () => {
    app.get('/login', function(req, res) {
      var scopes = 'user-read-private user-read-email';
      res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + my_client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
      });
  }

  return (
    <div className="App">
      
      <div className="container">
        <button onClick={spotifyLogin}>Login with Spotify</button>

      </div>

      
    </div>
  );
}

export default App;
