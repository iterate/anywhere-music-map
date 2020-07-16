import React from 'react'
import styled from 'styled-components'

export const Sidebar = ({
  loggedIn,
  checkedOption,
  setCheckedOption,
  personalData
}) => {
  console.log('loggedin', loggedIn)
  const handleOptionChange = e => {
    setCheckedOption(e.target.value)
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
                    value='option1'
                    checked={checkedOption === 'option1'}
                    onChange={handleOptionChange}
                  />
                  My favorites
                </label>
              </Wrapper>
              <div className='radio'>
                <label style={{ color: 'white', width: '200px' }}>
                  <input
                    type='radio'
                    value='option2'
                    checked={checkedOption === 'option2'}
                    onChange={handleOptionChange}
                  />
                  Global favorites
                </label>
              </div>
              <div className='radio'>
                <label style={{ color: 'white', width: '200px' }}>
                  <input
                    type='radio'
                    value='option3'
                    checked={checkedOption === 'option3'}
                    onChange={handleOptionChange}
                  />
                  Friends favorites
                </label>
              </div>
            </form>
            <Container>
              <H3>Find friends</H3>
              <img
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '5px',
                  role: 'button'
                }}
                src='addProfile.svg'
                role='button'
                cursor='pointer'
              ></img>
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
