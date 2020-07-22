import React from 'react'
import styled from 'styled-components'

export const Header = ({ setAddFriendPage }) => {
  return (
    <Container>
      <H1 onClick={() => setAddFriendPage(false)}>anywhere</H1>
    </Container>
  )
}

export default Header

export const Container = styled.div`
  display: flex;
  padding-left: 3%;
`

export const H1 = styled.h1`
  color: white;
`
