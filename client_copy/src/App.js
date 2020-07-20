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
  const [friends, setFriends] = useState([])

  useEffect(() => {
    console.log('me ', me)
    if (me.friends) {
      me.friends.forEach(friend => {
        users.forEach(user => {
          if (user.userName === friend) {
            const newFriends = [...friends, user]
            setFriends(newFriends)
            friends.push(user)
          }
        })
      })
    }
    console.log('FRIENDS', friends)
    console.log('ME', me)
    console.log('USERS', users)
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
    createFakeUser()
  }, [personalData, topArtists])

  const createUser = () => {
    if (
      personalData.display_name &&
      (topArtists.items && topArtists.items.length) > 1
    ) {
      axios.post('http://localhost:8000/api/user', {
        userName: personalData.display_name,
        artists: topArtists.items.map(artist => artist.name),
        imageUrl: personalData.images && personalData.images[0].url
      })
    }
  }

  const createFakeUser = () => {
    axios.post('http://localhost:8000/api/user', {
      userName: 'sofie123',
      artists: [
        'Dua Lipa',
        'Metallica',
        'Miley Cyrus',
        'DJ Fresh',
        'Basshunter',
        'Sam Smith',
        'John Mayer',
        'Astrid S',
        'Sigrid',
        'Aqua',
        'Madcon',
        'Modjo',
        'The Killers',
        'No.4',
        'Rihanna'
      ],
      imageUrl: [
        'https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
      ]
    })
  }
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
    )

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
