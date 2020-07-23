import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export const FindFriends = ({
  friends,
  setAddFriend,
  me,
  addFriend,
  personalData,
  allUsers
}) => {
  //hente ut folk som er lagret i databasen og legge til
  const [users, setUsers] = useState([])
  const [added, setAdded] = useState()
  const [myFriends, setMyFriends] = useState([])
  const getUsers = () => {
    axios.get('http://localhost:8000/api/user').then(res => {
      setUsers(res.data.data)
    })
  }
  useEffect(() => {
    getUsers()
  }, [])

  const m = new Map()
  useEffect(() => {
    users.forEach(user => {
      me &&
        me.friends &&
        me.friends.forEach(friend => {
          if (user.userName === friend.userName) {
            myFriends.push(user.userName)
            //setMyFriends([...myFriends, user.userName])
          }
        })
    })
  }, [me, users, me.friends])

  let f = false
  const addFriendToUser = user => {
    axios
      .put('http://localhost:8000/api/user/' + personalData.display_name, {
        friends: user
      })
      .then(setAddFriend(!addFriend))
  }

  const compareUsers = () => {
    const myArtistsLists = new Map()
    var scoreMap = new Map()
    var leng

    for (var i = 0; i < allUsers.length; i++) {
      var user = allUsers[i]
      leng = user.artists.length
      myArtistsLists[user.userName] = user.artists
    }

    for (var f = 0; f < allUsers.length; f++) {
      var userscore = 0
      for (var i = 0; i < leng; i++) {
        for (var j = 0; j < leng; j++) {
          if (
            (myArtistsLists &&
              myArtistsLists[me.userName] &&
              myArtistsLists[me.userName][i] &&
              myArtistsLists[me.userName][i].name) ===
            (myArtistsLists[allUsers[f].userName][j] &&
              myArtistsLists[allUsers[f].userName][j].name)
          ) {
            userscore++
          }
        }
      }

      scoreMap[allUsers[f].userName] = Math.floor((userscore / leng) * 100)
    }
    //console.log('score', scoreMap)

    return scoreMap
  }

  const scoreMap = compareUsers()
  const arrayOfFriendscores = []

  //let sortedArrayOfFriends = []
  //const artistMap = new Map()

  const sortFriends = () => {
    for (var f = 0; f < allUsers.length; f++) {
      let userName = allUsers[f].userName

      const friendscore = {
        name: userName,
        score: scoreMap[userName]
      }
      arrayOfFriendscores.push(friendscore)
    }
    let sorted = arrayOfFriendscores.sort((a, b) => {
      return b.score - a.score
    })
    //sortedArrayOfFriends = sorted
    return sorted
  }

  const arrayOfSortedFriends = sortFriends()

  const findUserFromName = userName => {
    users.map((user, i) => {
      if (user.userName === userName) {
        addFriendToUser(user)
      }
    })
  }

  return (
    <div>
      <h1>Add Users Based on Similarity</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          height: '600px'
        }}
      >
        {arrayOfSortedFriends &&
          arrayOfSortedFriends.map(
            (user, index) =>
              user.name !== me.userName && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                  key={index}
                >
                  <MatchBox>
                    <Text style={{ marginBottom: '10px' }}>
                      {scoreMap[user.name]}%
                    </Text>
                    <Text>{user.name}</Text>
                  </MatchBox>
                  {myFriends && !myFriends.includes(user.name) && (
                    <Button onClick={() => findUserFromName(user.name)}>
                      Add user
                    </Button>
                  )}
                </div>
              )
          )}
      </div>
    </div>
  )
}

export default FindFriends

export const Button = styled.button`
  width: 140px;
  height: 30px;
  border-radius: 10px;
  background-color: #ff5fa2;
  box-shadow: 5px 5px 15px #888888;
  border-color: #ff5fa2;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 3px;
  color: white;
  transition: 0.5s ease;
  outline: none;
  margin-top: 10px;
  &: hover {
    letter-spacing: 5px;
  }
`
export const Text = styled.p`
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: white;
  margin: 0;
`

export const MatchBox = styled.div`
  width: 300px;
  height: 120px;
  background-color: #333333;
  text-align: center;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  flex-direction: column;
  margin: 20px;
`
