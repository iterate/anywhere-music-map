import React from 'react'
import styled from 'styled-components'

export const MusicProposals = ({ sortedArrayOfFriends }) => {
  console.log('musicproposals sorted', sortedArrayOfFriends)
  return (
    <Flex>
      {sortedArrayOfFriends.map((friend, index) => (
        <div style={{ display: 'inlineBlock' }}>
          <MusicBox key={index} width={friend.length}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {friend.listeners.map((friendName, index) => (
                <FriendBox color={friendName} />
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
`

export const FriendBox = styled.div`
  width: 20px;
  height: 40px;
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
`
export const Text = styled.p`
  color: white;
  font-size: 14px;
`

export const ArtistTitle = styled.p`
  margin-left: 25px;
`

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 600px;
  overflow: auto;
  white-space: nowrap;
`
