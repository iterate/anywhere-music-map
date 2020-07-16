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
  const [checkedOption, setCheckedOption] = useState()
  const [personalData, setPersonalData] = useState([])
  const [topArtists, setTopArtists] = useState([])
  const [addFriendPage, setAddFriendPage] = useState(false)
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
    console.log('PersonalData', personalData)
  }, [])

  getHashParams()

  const getMe = async () => {
    const access_t = getHashParams()
    const result = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + access_t
        }
      }
    ).then(console.log('logeg', loggedIn))

    if (access_t) {
      spotifyWeb.setAccessToken(access_t)
      spotifyWeb
        .getMe() // note that we don't pass a user id
        .then(
          function (data) {
            setPersonalData(data)
            console.log('data?', data)
          },
          console.log('loggedin before', loggedIn),

          setLoggedIn(true),

          console.log('loggedin after', loggedIn),
          function (err) {
            console.error(err)
          }
        )
    }
    let data = await result.json()
    console.log('DATA', data)
    return data.items
  }

  const getTopArtists = async () => {
    const access_t = getHashParams()
    const result = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + access_t
        }
      }
    ).then(console.log('logeg', loggedIn))

    if (access_t) {
      spotifyWeb.setAccessToken(access_t)
      spotifyWeb
        .getMyTopArtists() // note that we don't pass a user id
        .then(
          function (data) {
            setTopArtists(data)
          },
          function (err) {
            console.error(err)
          }
        )
    }
    let data = await result.json()
    console.log('DATA', data)
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
        />
        <Wrapper>
          <body>
            <script src='https://sdk.scdn.co/spotify-player.js' />
          </body>
          <LoginContent>
            {loggedIn ? (
              <Content
                addFriendPage={addFriendPage}
                topArtistData={topArtists}
                musicData={personalData}
              />
            ) : (
              <div style={{ padding: '10%' }}>
                <a href='http://localhost:8888'>
                  <button>Login with Spotify</button>
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
`

export const LoginContent = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #e0e0e0;
  width: 80vw;
`
