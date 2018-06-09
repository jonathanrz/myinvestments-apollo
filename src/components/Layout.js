import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { Layout } from 'antd'

import theme from 'app/theme'
import { fromTheme } from 'app/utils/theme'

const { Header, Sider, Content } = Layout

const StyledLayout = styled(Layout)`
  display: flex;
  height: 100vh;
  margin: auto;
  max-width: 1280px;
  font-family: ${fromTheme('font.defaultFont')};
`

const StyledMainLayout = styled(Layout)`
  flex: 1 0 0;
  margin: 10px;
`

const StyledHeader = styled(Header)`
  background: ${({ theme }) => theme.color.primaryColor};
  display: flex;
`

const Title = styled.p`
  color: ${({ theme }) => theme.color.textColor};
  font-size: 20px;
  flex-grow: 1;
`

const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.color.textColor};
  font-size: 16px;

  &:hover {
    color: ${({ theme }) => theme.color.textColor};
    text-decoration: underline;
  }
`

const StyledSider = styled(Sider)`
  background: ${({ theme }) => theme.color.background};
  min-width: 150px;
  width: 10%;
`

const CustomLayout = ({ title, menus = [], sider = true, children }) => (
  <ThemeProvider theme={theme}>
    <StyledLayout>
      <StyledHeader>
        <Title>{title}</Title>
        {menus.map(menu => (
          <Link key={menu.label} to={menu.to}>
            {menu.label}
          </Link>
        ))}
      </StyledHeader>
      <StyledMainLayout>
        {sider && <StyledSider>Sider</StyledSider>}
        <Content>{children}</Content>
      </StyledMainLayout>
    </StyledLayout>
  </ThemeProvider>
)

export default CustomLayout
