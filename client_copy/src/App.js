import React, { useState, useEffect } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';
import styled from 'styled-components';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Content from './Components/Content';
import axios from 'axios';

const spotifyWeb = new SpotifyWebApi();

function App() {
	const [ loggedIn, setLoggedIn ] = useState(false);
	const [ checkedOption, setCheckedOption ] = useState();
	const [ personalData, setPersonalData ] = useState([]);
	const [ topArtists, setTopArtists ] = useState([]);
	let hashParams = {};

	const getHashParams = () => {
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		e = r.exec(q);
		while (e) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
			e = r.exec(q);
		}
		return hashParams.access_token;
	};
	useEffect(() => {
		hashParams.access_token ? setLoggedIn(true) : setLoggedIn(false);
		getMe();
		getTopArtists();
		saveUser();
	}, []);

	getHashParams();

	useEffect(() => {
		axios
			.post('http://localhost:8000/api/user', {
				username: personalData.display_name,
				artists: artistList
			})
			.then((res) => console.log('did it work?', res));
	}, []);

	const saveUser = () => {
		//console.log('CALLING SAVEUSER', topArtists);
		const artistList = [];
		let topArtist = getTopArtists();
		topArtist.then(function(result) {
			//console.log('jasdkjalkfjasølkghaksdhf', result);
			if (result) {
				for (let artist = 0; artist < result.length; artist++) {
					//console.log('ARTITS', artist);
					artistList.push(result[artist].name);
					console.log('dhfksjdhflshdf', artistList);
				} // "Some User token"
			}
		});
		//
		//topArtist.map((artist) => console.log('artistname?', artist.name));
		axios
			.post('http://localhost:8000/api/user', {
				username: personalData.display_name,
				artists: artistList
			})
			.then((res) => console.log('did it work?', res));
	};

	const getMe = async () => {
		const access_t = getHashParams();
		const result = await fetch(
			`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5`,
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + access_t
				}
			}
		);

		if (access_t) {
			spotifyWeb.setAccessToken(access_t);
			spotifyWeb
				.getMe() // note that we don't pass a user id
				.then(
					function(data) {
						setPersonalData(data);
					},
					setLoggedIn(true),
					function(err) {
						console.error(err);
					}
				);
		}
		let data = await result.json();
		console.log('DATA', data);
		return data.items;
	};

	const getTopArtists = async () => {
		const access_t = getHashParams();
		const result = await fetch(
			`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5`,
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + access_t
				}
			}
		);

		if (access_t) {
			spotifyWeb.setAccessToken(access_t);
			spotifyWeb
				.getMyTopArtists() // note that we don't pass a user id
				.then(
					function(data) {
						setTopArtists(data);
					},
					function(err) {
						console.error(err);
					}
				);
		}
		let data = await result.json();
		setTopArtists(data.items);

		console.log('DATA', data);
		return data.items;
	};

	const User = {
		name: String,
		topArtist: [ String ],
		friends: [ String ],
		img: String
	};

	const retriveUserAndMakeThemYourFriend = () => {};

	return (
		<Container>
			<Header />
			<Wrapper>
				<Sidebar
					setCheckedOption={setCheckedOption}
					checkedOption={checkedOption}
					loggedIn={loggedIn}
					personalData={personalData}
				/>
				<Wrapper>
					<body>
						<script src="https://sdk.scdn.co/spotify-player.js" />
					</body>
					<LoginContent>
						{loggedIn ? (
							<Content topArtistData={topArtists} musicData={personalData} />
						) : (
							<div style={{ padding: '10%' }}>
								<a href="http://localhost:8888">
									<button>Login with Spotify</button>
								</a>
							</div>
						)}
					</LoginContent>
				</Wrapper>
			</Wrapper>
		</Container>
	);
}

export default App;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

export const LoginContent = styled.div`
	display: flex;
	flex-direction: row;
	background-color: #e0e0e0;
	width: 80vw;
`;
