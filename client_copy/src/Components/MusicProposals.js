import React from 'react'
import styled from 'styled-components'

export const MusicProposals = ({ artistMap, me, sortedArrayOfFriends }) => {
  const hacklist = new Map()
  return (
    <Flex>
      {me &&
        me.friends &&
        me.friends.map((friend, index) => {
          hacklist[friend.userName] = index
        })}
      {sortedArrayOfFriends.map((friend, friendIndex) => (
        <div key={friendIndex} style={{ display: 'inlineBlock' }}>
          <MusicBox key={friend.length} width={friend.length}>
            <Image src={artistMap[friend.artist]}></Image>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {friend.listeners.map((friendName, index) => (
                <FriendBox key={friendName} color={hacklist[friendName]} />
              ))}
            </div>
            <ArtistTitle>{friend.artist}</ArtistTitle>
          </MusicBox>
        </div>
      ))}
    </Flex>
  )
}

export default MusicProposals

export const Image = styled.img`
  position: absolute;
  bottom: 0;
  left: 100%;
  right: 0;
  background-color: #008cba;
  overflow: hidden;
  width: 0;
  height: 100%;
  transition: 1.5s ease;
  object-fit: cover;
  opacity: 0.7;
  border-radius: 5px;
`
export const ArtistTitle = styled.p`
  margin-left: 15px;
  align-self: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 10px;
`
export const MusicBox = styled.div`
  width: 200px;
  background-color: #333333;
  color: white;
  border-radius: 5px;
  height: ${props => props.width * 40 + 'px'};
  padding: 2px;
  margin: 2px;
  display: flex;
  flex-direction: row;
  text-align: center;

  position: relative;

  &:hover ${Image} {
    width: 100%;
    left: 0;
  }
  &:hover ${ArtistTitle} {
    display: none;
  }
`

export const FriendBox = styled.div`
  width: 20px;
  height: 40px;
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
`
export const Text = styled.p`
  color: white;
  font-size: 14px;
`

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 600px;
  overflow: auto;
  white-space: nowrap;
`
