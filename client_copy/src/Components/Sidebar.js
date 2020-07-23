import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export const Sidebar = ({
  loggedIn,
  checkedOption,
  setCheckedOption,
  personalData,
  setAddFriendPage,
  me,
  setMe,
  users,
  setUsers,
  artistMap,
  personMap,
  addFriend,
  setAddFriend
}) => {
  const handleOptionChange = e => {
    setCheckedOption(e.target.value)
  }

  //const artistMap = new Map()
  const getUsers = async () => {
    await axios.get('http://localhost:8000/api/user').then(res => {
      setUsers(res.data.data)
      res.data.data.forEach(user => {
        user.artists.forEach(artist => {
          artistMap[artist.name] =
            artist.images && artist.images[0] && artist.images[0].url
        })
      })
    })
  }

  const addFriends = () => {
    setAddFriendPage(true)
  }

  useEffect(() => {
    getUsers()
  }, [setAddFriend])

  useEffect(() => {
    if (users) {
      users.forEach(user => {
        user.userName === personalData.display_name && setMe(user)
        personMap[user.userName] = user.imgUrl
      })
    }
  }, [users, personalData, me, addFriend])

  const deleteUsers = () => {
    axios
      .delete('http://localhost:8000/api/users')
      .then(res => console.log('res', res))
  }

  const hacklist = new Map()

  return (
    <Container width='20%' height='100vh'>
      {loggedIn && (
        <div>
          <Container>
            <H3>PROFILE</H3>
            <img
              onClick={() => setAddFriendPage(false)}
              style={{ width: '70px', height: '70px', borderRadius: '50%' }}
              src={
                personalData.images &&
                personalData.images[0] &&
                personalData.images[0].url
              }
            ></img>
          </Container>
          <Container>
            {/*             <button onClick={deleteUsers}>delete users</button>
             */}
            <H3>FILTER</H3>
            <form>
              <Wrapper>
                <label style={{ color: 'white', width: '200px' }}>
                  <Radio
                    type='radio'
                    value='myfavorites'
                    checked={checkedOption === 'myfavorites'}
                    onChange={handleOptionChange}
                  />
                  My favorites
                </label>
              </Wrapper>
              <div className='radio'>
                <label style={{ color: 'white', width: '200px' }}>
                  <Radio
                    type='radio'
                    value='globalfavorites'
                    checked={checkedOption === 'globalfavorites'}
                    onChange={handleOptionChange}
                  />
                  Global favorites
                </label>
              </div>
              <div className='radio'>
                <label style={{ color: 'white', width: '200px' }}>
                  <Radio
                    type='radio'
                    value='friendsfavorites'
                    checked={checkedOption === 'friendsfavorites'}
                    onChange={handleOptionChange}
                  />
                  Friends favorites
                </label>
              </div>
            </form>
            <Container width={'100%'}>
              <H3>Network</H3>{' '}
              {me &&
                me.friends &&
                me.friends.map((friend, index) => {
                  hacklist[friend.userName] = index
                })}
              {me &&
                me.friends &&
                me.friends.map((friend, index) => (
                  <FlexBox>
                    <FriendBox color={hacklist[friend.userName]} key={index}>
                      {personMap[friend.userName] ? (
                        <Image src={personMap[friend.userName]} />
                      ) : (
                        <p>{friend.userName}</p>
                      )}
                    </FriendBox>
                    <div style={{ marginLeft: '5px' }}>
                      <Text>{friend.userName}</Text>
                    </div>
                  </FlexBox>
                ))}
              <button
                style={{
                  backgroundColor: '#333333',
                  border: 'none',
                  outline: 'none',
                  padding: '0px'
                }}
                onClick={addFriends}
              >
                <img
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '5px'
                  }}
                  src='addProfile.svg'
                />
              </button>
            </Container>
          </Container>
        </div>
      )}
    </Container>
  )
}

export default Sidebar

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
  height: ${props => props.height};
  margin-left: 3%;
  margin-right: 3%;
  align-items: flex-start;
`

export const FriendBox = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: solid 3px;
  color: white;
  text-align: center;

  overflow: hidden;
  object-fit: cover;

  border-color: ${props => {
    if (props.color == 0) {
      return '#16775E'
    } else if (props.color === 1) {
      return '#FF7262'
    } else if (props.color === 2) {
      return '#FF5FA2'
    } else if (props.color === 3) {
      return '#ffffff'
    } else {
      return '#F2C94C'
    }
  }};
`
export const FlexBox = styled.div`
  display: flex;
  flexdirection: row;
`

export const Image = styled.img`
  border-radius: 3px;
  width: 70px;
`
export const H3 = styled.h3`
  color: lightgrey;
  font-size: 14px;
  font-style: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
`

export const Category = styled.p`
  color: lightgrey;
  font-size: 16px;
  margin: 3px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const Radio = styled.input`
  color: 'green';
  border: solid 3px;
  border-color: 'red';
  background-color: 'red';
`

export const Text = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: white;
  width: 80px;
  margin-left: 20px;
`
