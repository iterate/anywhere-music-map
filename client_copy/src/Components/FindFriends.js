import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export const FindFriends = ({ personalData, me, allUsers }) => {
  //hente ut folk som er lagret i databasen og legge til
  const [users, setUsers] = useState([])
  const getUsers = () => {
    axios.get('http://localhost:8000/api/user').then(res => {
      setUsers(res.data.data)
    })
  }
  useEffect(() => {
    getUsers()
  }, [])

  const addFriend = user => {
    axios.put('http://localhost:8000/api/user/' + personalData.display_name, {
      friends: user
    })
  }

  const compareUsers = () => {
    console.log('trallala')

    console.log('meeee', me)
    console.log('users', allUsers)
    const myArtistsLists = new Map()
    var scoreMap = new Map()
    var leng
    /* allUsers.map(user => {
      user.artist.map(artist => {
        myArtistsLists[user.userName] = artist.name
      })
    }) */

    for (var i = 0; i < allUsers.length; i++) {
      //console.log('i ', allUsers.length)
      var user = allUsers[i]
      console.log(user.artists.length)
      leng = user.artists.length
      myArtistsLists[user.userName] = user.artists
    }
    console.log('artistlist', myArtistsLists)
    console.log(allUsers.length)
    console.log(me.userName)
    console.log(myArtistsLists[me.userName][1].name)
    for (var f = 0; f < allUsers.length; f++) {
      var userscore = 0
      for (var i = 0; i < leng; i++) {
        for (var j = 0; j < leng; j++) {
          //console.log(myArtistsLists[me.userName].artists[i])
          if (
            myArtistsLists[me.userName][i].name ===
            myArtistsLists[allUsers[f].userName][j].name
          ) {
            userscore++
          }
        }
      }

      scoreMap[allUsers[f].userName] = (userscore / leng) * 100
    }
    console.log(scoreMap)

    return scoreMap
  }

  const score = compareUsers()
  const sortStringValues = (a, b) =>
    (a[1] > b[1] && 1) || (a[1] === b[1] ? 0 : -1)

  const mapSort2 = new Map([...score.entries()].sort((a, b) => a[1] - b[1]))
  console.log('mapsoert', mapSort2)

  return (
    <div>
      <h1>Add Users</h1>
      <h2>USERS: </h2>
      {users &&
        users.map((user, index) => (
          <div key={index}>
            <p>
              <b>{user.userName}</b>
            </p>
            <p>your matching score is {compareUsers()[user.userName]}%</p>
            <button onClick={() => addFriend(user)}>add</button>
          </div>
        ))}
    </div>
  )
}

export default FindFriends
