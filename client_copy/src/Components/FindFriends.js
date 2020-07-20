import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export const FindFriends = ({ personalData }) => {
  //hente ut folk som er lagret i databasen og legge til
  const [users, setUsers] = useState([])
  const [me, setMe] = useState()
  const getUsers = () => {
    axios.get('http://localhost:8000/api/user').then(res => {
      setUsers(res.data.data)
    })
  }
  useEffect(() => {
    getUsers()
  }, [])

  const addFriend = userName => {
    axios.put('http://localhost:8000/api/user/' + personalData.display_name, {
      friends: userName
    })
  }
  return (
    <div>
      <h1>Add Users</h1>
      <h2>USERS: </h2>
      {users &&
        users.map(user => (
          <div>
            <p>{user.userName}</p>
            <button onClick={() => addFriend(user.userName)}>add</button>
          </div>
        ))}
    </div>
  )
}

export default FindFriends
