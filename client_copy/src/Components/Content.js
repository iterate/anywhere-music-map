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
  artistMap,
  addFriend,
  setAddFriend
}) => {
  let FriendMap = new Map()

  const [sortedArrayOfFriends, setSortedArrayOfFriends] = useState([])

  const matchFriends = () => {
    friends &&
      friends.forEach((friend, index) => {
        friend.artists.forEach(friendArtist => {
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
  //const artistMap = new Map()

  console.log('me', me)
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
          <FindFriends
            addFriend={addFriend}
            me={me}
            setAddFriend={setAddFriend}
            personalData={personalData}
            friends={friends}
          />
        </div>
      ) : (
        <div>
          {' '}
          <Box>
            <h1>DISCOVER</h1>
            <h2>TOP 5</h2>
            <RowBox>
              <Box>
                <Titles>ME</Titles>
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

            <h2>BASED ON YOUR FRIENDS' MUSIC TASTE</h2>
            <MusicProposals
              me={me}
              artistMap={artistMap}
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
  font-size: 14px;
  letter-spacing: 3px;
  text-transform: uppercase;
  height: 30px;
`

export const ArtistTitle = styled.p`
  color: ${props => (props.color === 'me' ? 'black' : 'white')};
  margin-left: 15px;
  align-self: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 10px;
  font-family: arial;
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

  transform: scale(1, 1);
  transition: 0.7s;
  &:hover {
    transform: scale(1.3, 1.3);
    z-index: 1;
  }
`
