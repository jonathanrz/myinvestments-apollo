import React from 'react'
import styled from 'styled-components'
import ReactLoading from 'react-loading'

import theme from 'app/theme'

const Loader = ({ message }) => (
  <Content>
    <ReactLoading type="bubbles" color={theme.color.primaryColor} height={64} width={64} />
    <Message>{message}</Message>
  </Content>
)

const Content = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
`

const Message = styled.div`
  color: ${({ theme }) => theme.color.primaryText};
  font-size: 20px;
  margin-left: 10px;
`

export default Loader
