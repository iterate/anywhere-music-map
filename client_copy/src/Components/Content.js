import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import FindFriends from './FindFriends'

export const Content = ({
  me,
  friends,
  personalData,
  topArtistData,
  addFriendPage
}) => {
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
                    <Titles>{friend && friend.userName}'s top 5</Titles>
                    {friend &&
                      friend.artists &&
                      friend.artists.map(
                        (artist, index) =>
                          index < 5 && (
                            <ArtistBox key={index.toString() + 'artistbox'}>
                              <div
                                style={{
                                  width: '60px',
                                  height: '60px',
                                  borderRadius: '10px'
                                }}
                              ></div>
                              <ArtistTitle>{artist}</ArtistTitle>
                            </ArtistBox>
                          )
                      )}
                  </Box>
                ))}
            </RowBox>

            <Titles>Based on your music taste</Titles>
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
`

export const ArtistTitle = styled.p`
  color: white;
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
  background-color: #333333;
  box-shadow: 5px 5px 15px #888888;
  margin-bottom: 10px;
  width: 90%;
`
