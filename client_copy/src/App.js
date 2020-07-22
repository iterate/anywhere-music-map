import React, { useState, useEffect } from 'react'
import './App.css'
import SpotifyWebApi from 'spotify-web-api-js'
import styled from 'styled-components'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import Content from './Components/Content'
import axios from 'axios'

const spotifyWeb = new SpotifyWebApi()

function App () {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkedOption, setCheckedOption] = useState('friendsfavorites')
  const [personalData, setPersonalData] = useState([])
  const [topArtists, setTopArtists] = useState([])
  const [addFriendPage, setAddFriendPage] = useState(false)
  const [me, setMe] = useState({})
  const [users, setUsers] = useState([])
  const [friends, setFriends] = useState()

  const ColorScheme = ['#16775E', '#FF7262', '#FF5FA2', '#F2C94C', '#ffffff']

  useEffect(() => {
    if (me.friends) {
      setFriends(me.friends)
    }
  }, [me])
  let hashParams = {}

  const getHashParams = () => {
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2])
      e = r.exec(q)
    }
    return hashParams.access_token
  }
  useEffect(() => {
    hashParams.access_token ? setLoggedIn(true) : setLoggedIn(false)
    getMe()
    getTopArtists()
  }, [])

  useEffect(() => {
    checkedOption === 'friendsfavorites' && setAddFriendPage(false)
  }, [checkedOption])

  getHashParams()

  useEffect(() => {
    createUser()
  }, [personalData, topArtists])

  const createUser = () => {
    if (
      personalData.display_name &&
      (topArtists.items && topArtists.items.length) > 1
    ) {
      axios
        .post('http://localhost:8000/api/user', {
          userName: personalData.display_name,
          artists: topArtists.items.map(artist => artist),
          imageUrl:
            personalData.images &&
            personalData.images[0] &&
            personalData.images[0].url
        })
        .then(res => console.log('user result', res))
    }
  }

  const getMe = async () => {
    const access_t = getHashParams()
    const result = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=30&offset=5`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + access_t
        }
      }
    )

    if (access_t) {
      spotifyWeb.setAccessToken(access_t)
      spotifyWeb
        .getMe() // note that we don't pass a user id
        .then(
          function (data) {
            setPersonalData(data)
          },
          setLoggedIn(true),
          function (err) {
            console.error(err)
          }
        )
    }
    let data = await result.json()
    return data.items
  }

  //const artistMap = new Map()
  const [artistMap, setArtistMap] = useState(new Map())
  const [personMap, setPersonMap] = useState(new Map())
  const getTopArtists = async () => {
    const access_t = getHashParams()
    const result = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=30&offset=5`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + access_t
        }
      }
    )

    if (access_t) {
      spotifyWeb.setAccessToken(access_t)
      spotifyWeb
        .getMyTopArtists() // note that we don't pass a user id
        .then(
          function (data) {
            //setTopArtists(data)
          },
          function (err) {
            console.error(err)
          }
        )
    }
    let data = await result.json()
    setTopArtists(data)
    return data.items
  }

  return (
    <Container>
      <Header />
      <Wrapper>
        <Sidebar
          setCheckedOption={setCheckedOption}
          checkedOption={checkedOption}
          loggedIn={loggedIn}
          personalData={personalData}
          setAddFriendPage={setAddFriendPage}
          me={me}
          setMe={setMe}
          users={users}
          setUsers={setUsers}
          friends={friends}
          setFriends={setFriends}
          artistMap={artistMap}
          personMap={personMap}
        />
        <Wrapper>
          <script src='https://sdk.scdn.co/spotify-player.js' />
          <LoginContent>
            {loggedIn ? (
              <Content
                addFriendPage={addFriendPage}
                topArtistData={topArtists}
                musicData={personalData}
                personalData={personalData}
                users={users}
                me={me}
                friends={friends}
                artistMap={artistMap}
                personMap={personMap}
              />
            ) : (
              <div style={{ padding: '10%' }}>
                <a href='http://localhost:8888'>
                  <LoginButton>Login with Spotify</LoginButton>
                </a>
              </div>
            )}
          </LoginContent>
        </Wrapper>
      </Wrapper>
    </Container>
  )
}

export default App

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const LoginContent = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #e0e0e0;
  width: 100%;
`

export const LoginButton = styled.button`
  width: 300px;
  height: 60px;
  border-radius: 10px;
  background-color: #ff5fa2;
  box-shadow: 5px 5px 15px #888888;
  border-color: #ff5fa2;
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 3px;
  color: white;
`
