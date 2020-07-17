import React from 'react'
import styled from 'styled-components'

export const Sidebar = ({
  loggedIn,
  checkedOption,
  setCheckedOption,
  personalData,
  setAddFriendPage
}) => {
  console.log('loggedin', loggedIn)
  const handleOptionChange = e => {
    setCheckedOption(e.target.value)
  }

  const addFriends = () => {
    setAddFriendPage(true)
  }

  return (
    <Container width='20%' height='100vh'>
      {loggedIn && (
        <div>
          <Container>
            <H3>PROFILE</H3>
            <img
              style={{ width: '70px', height: '70px', borderRadius: '50%' }}
              src={
                personalData.images &&
                personalData.images[0] &&
                personalData.images[0].url
              }
            ></img>
          </Container>
          <Container>
            <H3>FILTER</H3>
            <form>
              <Wrapper>
                <label style={{ color: 'white', width: '200px' }}>
                  <input
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
                  <input
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
                  <input
                    type='radio'
                    value='friendsfavorites'
                    checked={checkedOption === 'friendsfavorites'}
                    onChange={handleOptionChange}
                  />
                  Friends favorites
                </label>
              </div>
            </form>
            <Container>
              <H3>Find friends</H3>
              <button
                style={{
                  backgroundColor: '#333333',
                  border: 'none',
                  outline: 'none'
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
