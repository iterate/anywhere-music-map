import React from 'react'
import styled from 'styled-components'

export const Header = () => {
  return (
    <Container>
      <H1>anywhere</H1>
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
