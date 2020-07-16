import React from 'react'
import styled from 'styled-components'

export const Content = ({ musicData }) => {
  console.log('musicdata', musicData)
  return (
    <Container>
      <Box>
        <H1>DISCOVER</H1>
        <h2>My top artists</h2>
        <h2>Based on your music-taste</h2>
      </Box>
    </Container>
  )
}

export default Content

export const Container = styled.div`
  display: flex;
  padding: 2%;
`

export const H1 = styled.h1`
  color: white;
`

export const Box = styled.div`
  display: flex;
  flex-direction: column;
`
