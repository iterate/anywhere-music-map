import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export const FindFriends = ({
  friends,
  setAddFriend,
  me,
  addFriend,
  personalData
}) => {
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
  const addFriendToUser = user => {
    axios
      .put('http://localhost:8000/api/user/' + personalData.display_name, {
        friends: user
      })
      .then(setAddFriend(!addFriend))
    /*     user.userName
     /*  friends.forEach(friend =>
      friend.userName === user.userName
        ? console.log(
            'friend.userName = user.userName',
            friend.userName,
            user.userName
          )
        : axios
            .put(
              'http://localhost:8000/api/user/' + personalData.display_name,
              {
                friends: user
              }
            )
            .then(setAddFriend(!addFriend)) */
  }

  return (
    <div>
      <h1>Add Users</h1>
      {/*       <h2>USERS: </h2>
       */}{' '}
      {users &&
        users.map(
          (user, index) =>
            user.userName !== me.userName && (
              <div key={index}>
                <Text>{user.userName}</Text>

                {myFriends && !myFriends.includes(user.userName) && (
                  <Button onClick={() => addFriendToUser(user)}>
                    Add user
                  </Button>
                )}
              </div>
            )
        )}
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
  &: hover {
    letter-spacing: 5px;
  }
`
export const Text = styled.p`
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 3px;
`
