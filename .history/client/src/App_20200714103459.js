import React, { useState } from 'react';
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

	const clientId = 'f2c4a36edf6541c7922bbaab046328a1';
	const clientSecret = '835373c22ef349ee9c10567e75ac5ba5';
	const [ accessToken, setAccessToken ] = useState('');
	const [ inputValue, setInputValue ] = useState('');

	const spotifyLogin2 = async () => {
		let token = await _getToken();

		console.log(token.access_token);

		const limit = 10;

		const result = await fetch(
			`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5`,
			{
				method: 'GET',
				headers: {
					Authorization:
						'Bearer ' +
						'BQBwFqAzVX5AsFagbnJax0vfSztH6-LbXIl7ZTVW5gotnonRamqOA1fl_swXt3XqVl1o6PvYljPfFe6vVdSAA0JeinIYFo5kqkmcvAjESLvi1ARHU-WtcUkY83CCqHN86GVYln48BVGVihAwQVZhAtnusRcbFRPLK7E2tg34-PU1UEz9ylsmgfqT1udsePyU6DW_QB4lbRDQOeoFwG7Dw3Y_VeL5Si-sJEBhx9ZzPYgS3liRZJfDW4TTRce59nqbiFuQ5FHi1BpMdgec'
				}
			}
		);

		let data = await result.json();
		console.log(data);
		return data.items;
	};

	const spotifyLogin = () => {
		_getToken();
	};

	const _getToken = async () => {
		console.log('kommer vi hit');
		const result = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret)
			},
			body: 'grant_type=client_credentials'
		});

		const data = await result.json();
		console.log('data:', data.access_token);

		setAccessToken(data.access_token);
		return data;
	};

	_getToken();
	console.log(_getToken());

	const updateInputValue = (e) => {
		//e.preventDefault()
		setInputValue(e.target.value);
	};
	return (
		<div className="App">
			<body>
				<script src="https://sdk.scdn.co/spotify-player.js" />
			</body>
			<div className="container">
				<button onClick={() => spotifyLogin2()}>Login with Spotify</button>
				<input value={inputValue} onChange={(e) => updateInputValue(e)} />
				<p>{inputValue}</p>
			</div>
		</div>
	);
}

export default App;
