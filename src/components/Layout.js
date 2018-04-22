import React, { StrictMode } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Layout } from 'antd'

import theme from 'app/theme'

const { Header, Sider, Content } = Layout

const CustomLayout = ({ title, sider = true, footer = true, children }) => (
  <StrictMode>
    <ThemeProvider theme={theme}>
      <StyledLayout>
        <StyledHeader>{title}</StyledHeader>
        <Layout>
          {sider && <StyledSider>Sider</StyledSider>}
          <Content>{children}</Content>
        </Layout>
      </StyledLayout>
    </ThemeProvider>
  </StrictMode>
)

const StyledLayout = styled(Layout)`
  margin: auto;
  max-width: 1280px;
`

const StyledHeader = styled(Header)`
  background: ${({ theme }) => theme.color.primaryColor};
  color: ${({ theme }) => theme.color.textColor};
  font-size: 20px;
`

const StyledSider = styled(Sider)`
  background: ${({ theme }) => theme.color.background};
`

export default CustomLayout
