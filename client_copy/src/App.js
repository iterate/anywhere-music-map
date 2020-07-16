import React, { useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyWeb = new SpotifyWebApi();

function App() {
	/* constructur();
	{
		var hashParams = this.getHashParams;
	} */
	const clientId = 'f2c4a36edf6541c7922bbaab046328a1';
	const clientSecret = '835373c22ef349ee9c10567e75ac5ba5';
	const [ accessToken, setAccessToken ] = useState('');
	const [ inputValue, setInputValue ] = useState('');
	const test = 'hello';
	var hashParams = {};
	const getHashParams = () => {
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		e = r.exec(q);
		while (e) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
			e = r.exec(q);
		}
		console.log('hashparams', hashParams);
		return hashParams.access_token;
	};

	getHashParams();

	const getInfo = async () => {
		//const token = _getToken();
		//let token = await _getToken();

		const access_t = getHashParams();
		console.log('getting hash params: ', access_t);

		/* const limit = 10;

		const result = await fetch(
			`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5`,
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + access_t
				}
			}
		); */

		if (access_t) {
			spotifyWeb.setAccessToken(access_t);
			console.log('test');
			spotifyWeb
				.getMe() // note that we don't pass a user id
				.then(
					function(data) {
						console.log('User playlists', data);
					},
					function(err) {
						console.error('error melding ', err);
					}
				);
		}

		/* console.log('Ann4prez', spotifyWeb.getMyTopArtists());

		console.log('result -> ', result);
		let data = await result.json();
		console.log('data; ', data);
		return data.items; */
	};

	/* const spotifyLogin = () => {
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
	}; */

	// UI Module

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
				<a href="http://localhost:8888">
					<button>Login with Spotify</button>
				</a>
				<button onClick={() => getInfo()}>get info</button>

				<input value={inputValue} onChange={(e) => updateInputValue(e)} />
				<p>{inputValue}</p>
			</div>
		</div>
	);
}

export default App;
