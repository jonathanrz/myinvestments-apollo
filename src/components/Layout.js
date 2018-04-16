import React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'

import colors from 'app/theme/colors'

const { Header, Footer, Sider, Content } = Layout

const CustomLayout = ({ title, sider = true, footer = true, children }) => (
  <StyledLayout>
    <StyledHeader>{title}</StyledHeader>
    <Layout>
      {sider && <StyledSider>Sider</StyledSider>}
      <Content>{children}</Content>
    </Layout>
    {footer && <StyledFooter>Footer</StyledFooter>}
  </StyledLayout>
)

const StyledLayout = styled(Layout)`
  margin: auto;
  max-width: 1280px;
`

const StyledHeader = styled(Header)`
  background: ${colors.primaryColor};
  color: ${colors.textColor};
  font-size: 20px;
`

const StyledSider = styled(Sider)`
  background: ${colors.background};
`

const StyledFooter = styled(Footer)`
  background: ${colors.background};
`

export default CustomLayout
