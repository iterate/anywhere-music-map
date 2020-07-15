import React, { useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

	const getHashParams = () => {
		var hashParams = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		e = r.exec(q);
		while (e) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
			e = r.exec(q);
		}
		console.log(hashParams.access_token);
		return hashParams;
	};

	getHashParams();

	const spotifyLogin2 = async () => {
		//const token = _getToken();
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
						'BQBIjoSsBP4lck8wKiCp1BbaWHaELRmRrzzomQZY4rBgd8BCUslCJ373Vfoa5Wrk4bQ5_o6K4-xZ7dnx5zmltmc8fiSYedxdpVPkPJ3qRkO1mm4whdhky2flagaaXoxFilfTEY7_B4hp3IJeFctP6oLrTQ9hleHoYhBsSoVaCNUeGzLi0V8TKgTvx1NV9topqgcRuD8vgnCJ8-CFbgW8Kj-3VNPa3T8gAU4mVxgj_zrg3lu1m3KWevpvE-Dros4OG4zpDwiBY_5qqlvF'
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
				<a href="http://localhost:8888"> Login to Spotify </a>
				<button onClick={() => spotifyLogin2()}>Login with Spotify p</button>
				<input value={inputValue} onChange={(e) => updateInputValue(e)} />
				<p>{inputValue}</p>
			</div>
		</div>
	);
}

export default App;
