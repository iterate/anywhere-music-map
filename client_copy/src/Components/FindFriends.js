import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export const FindFriends = ({ me, personalData }) => {
  //hente ut folk som er lagret i databasen og legge til
  const [users, setUsers] = useState([])
  const [added, setAdded] = useState()

  const [myFriends, setMyFriends] = useState([])
  const getUsers = () => {
    axios.get('http://localhost:8000/api/user').then(res => {
      setUsers(res.data.data)
      console.log('get user data', res.data.data)
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
    console.log('users', users)
  }, [me, users, me.friends])

  let f = false
  const addFriend = user => {
    axios.put('http://localhost:8000/api/user/' + personalData.display_name, {
      friends: user
    })
  }

  return (
    <div>
      <h1>Add Users</h1>
      <h2>USERS: </h2>
      {users &&
        users.map(
          (user, index) =>
            user.userName !== me.userName && (
              <div key={index}>
                <p>{user.userName}</p>

                {myFriends && !myFriends.includes(user.userName) && (
                  <button onClick={() => addFriend(user)}>add</button>
                )}
              </div>
            )
        )}
    </div>
  )
}

export default FindFriends
