import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
/*   const spotifyLogin = () => {
    app.get('/login', function(req, res) {
      var scopes = 'user-read-private user-read-email';
      res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + my_client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
      });
  } */

  const APIController = (function() {
    
    const clientId = 'ADD YOUR CLIENT ID';
    const clientSecret = 'ADD YOUR CLIENT SECRET';

    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }}
  
  

  return (
    <div className="App">
      
      <div className="container">
        <button onClick={spotifyLogin}>Login with Spotify</button>

      </div>

      
    </div>
  );
}

export default App;
