import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import FindFriends from './FindFriends'
import MusicProposals from './MusicProposals'

export const Content = ({
  me,
  friends,
  personalData,
  topArtistData,
  addFriendPage,
  users
}) => {
  let FriendMap = new Map()

  const [sortedArrayOfFriends, setSortedArrayOfFriends] = useState([])

  const matchFriends = () => {
    console.log('F', friends)
    friends &&
      friends.forEach((friend, index) => {
        console.log('<333333', friend)

        friend.artists.forEach(friendArtist => {
          console.log('<333333', friendArtist)
          if (!FriendMap.has(friendArtist.name)) {
            FriendMap.set(friendArtist.name, [friend.userName])
          }
          if (!FriendMap.get(friendArtist.name).includes(friend.userName)) {
            FriendMap.get(friendArtist.name).push(friend.userName)
          }
        })
      })
    let sorted = sortFriends()
    setSortedArrayOfFriends(sorted)
  }

  const arrayOfArtists = []
  //let sortedArrayOfFriends = []

  const sortFriends = () => {
    FriendMap.forEach((object, index) => {
      const artistObject = {
        artist: index,
        listeners: object,
        length: object.length
      }
      arrayOfArtists.push(artistObject)
    })
    let sorted = arrayOfArtists.sort((a, b) => {
      return b.listeners.length - a.listeners.length
    })
    //sortedArrayOfFriends = sorted
    return sorted
  }
  const hacklist = new Map()
  useEffect(() => {
    matchFriends()
  }, [me, friends])
  return (
    <Container>
      {addFriendPage ? (
        <div>
          <FindFriends personalData={personalData} me={me} allUsers={users} />
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
                            <ArtistTitle color={'me'}>
                              {artist.name}
                            </ArtistTitle>
                          </ArtistBox>
                        )
                    )}
                </Wrapper>
              </Box>
              {me &&
                me.friends &&
                me.friends.map((friend, index) => {
                  hacklist[friend.userName] = index
                })}
              {friends &&
                friends.map((friend, friendIndex) => (
                  <Box key={friendIndex}>
                    <Titles>{friend && friend.userName}</Titles>
                    {friend &&
                      friend.artists &&
                      friend.artists.map(
                        (artist, index) =>
                          index < 5 && (
                            <ArtistBox
                              color={hacklist[friend.userName]}
                              key={index.toString() + 'artistbox'}
                            >
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
                  </Box>
                ))}
            </RowBox>

            <Titles>Based on your friends' taste</Titles>
            <MusicProposals
              me={me}
              sortedArrayOfFriends={sortedArrayOfFriends}
            />
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
  color: ${props => (props.color === 'me' ? 'black' : 'white')};
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
  box-shadow: 5px 5px 15px #888888;
  margin-bottom: 10px;
  width: 90%;
`
