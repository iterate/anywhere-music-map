import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import FindFriends from './FindFriends'
import MusicProposals from './MusicProposals'

export const Content = ({
  me,
  friends,
  personalData,
  topArtistData,
  addFriendPage
}) => {
  let FriendMap = new Map()

  const [sortedArrayOfFriends, setSortedArrayOfFriends] = useState([])
  const matchFriends = () => {
    friends.forEach((friend, index) => {
      friend.artists.forEach(friendArtist => {
        console.log('friend', friend)
        if (!FriendMap.has(friendArtist)) {
          FriendMap.set(friendArtist, [friend.userName])
        }
        if (!FriendMap.get(friendArtist).includes(friend.userName)) {
          FriendMap.get(friendArtist).push(friend.userName)
        }
      })
    })
    let sorted = sortFriends()
    console.log('friends?', friends)
    setSortedArrayOfFriends(sorted)
  }

  const arrayOfFriends = []
  //let sortedArrayOfFriends = []

  const sortFriends = () => {
    FriendMap.forEach((object, index) => {
      const friendObject = {
        artist: index,
        listeners: object,
        length: object.length
      }
      arrayOfFriends.push(friendObject)
    })
    let sorted = arrayOfFriends.sort((a, b) => {
      return b.listeners.length - a.listeners.length
    })
    //sortedArrayOfFriends = sorted
    return sorted
  }

  useEffect(() => {
    matchFriends()
  }, [me, friends])
  return (
    <Container>
      {addFriendPage ? (
        <div>
          <FindFriends personalData={personalData} />
        </div>
      ) : (
        <div>
          {' '}
          <Box>
            <h1>DISCOVER</h1>
            <RowBox>
              <Box>
                <Titles>My top 5</Titles>
                <Wrapper>
                  {topArtistData.items &&
                    topArtistData.items.map(
                      (artist, index) =>
                        index < 5 && (
                          <ArtistBox key={index}>
                            <img
                              style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '10px'
                              }}
                              src={artist.images[0].url}
                            ></img>
                            <ArtistTitle>{artist.name}</ArtistTitle>
                          </ArtistBox>
                        )
                    )}
                </Wrapper>
              </Box>
              {friends &&
                friends.map((friend, key) => (
                  <Box key={key}>
                    <Titles>{friend && friend.userName.split(' ')[0]}</Titles>
                    {friend &&
                      friend.artists &&
                      friend.artists.map(
                        (artist, index) =>
                          index < 5 && (
                            <ArtistBox
                              color={friend.userName}
                              key={index.toString() + 'artistbox'}
                            >
                              <div
                                style={{
                                  width: '60px',
                                  height: '60px',
                                  borderRadius: '10px'
                                }}
                              ></div>
                              <ArtistTitle color={friend.userName}>
                                {artist}
                              </ArtistTitle>
                            </ArtistBox>
                          )
                      )}
                  </Box>
                ))}
            </RowBox>

            <Titles>Based on your music taste</Titles>
            <MusicProposals sortedArrayOfFriends={sortedArrayOfFriends} />
          </Box>
        </div>
      )}
    </Container>
  )
}

export default Content

export const Container = styled.div`
  display: flex;
  padding: 2%;
`

export const Titles = styled.h2`
  color: #333333;
  font-family: arial;
  font-size: 20px;
  letter-spacing: 3px;
  text-transform: uppercase;
  height: 50px;
`

export const ArtistTitle = styled.p`
  background-color: ${props =>
    props.color === 'Thusan Arul' ? 'grey' : 'white'}
  margin-left: 6%;
  font-size: 12px;
  margin-top: 10%;
`

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
`
export const RowBox = styled.div`
  display: flex;
  flex-direction: row;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const ArtistBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  border-radius: 10px;
  background-color: ${props => {
    if (props.color === 'sofie123') {
      return '#16775E'
    } else if (props.color === '1118536426') {
      return '#FF7262'
    } else if (props.color === 'josefine-madsen') {
      return '#FF5FA2'
    } else if (props.color === 'Thusan Arul') {
      return '#ffffff'
    } else {
      return '#F2C94C'
    }
  }};
  box-shadow: 5px 5px 15px #888888;
  margin-bottom: 10px;
  width: 90%;
`
