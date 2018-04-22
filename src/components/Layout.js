import React, { StrictMode } from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'

import colors from 'app/theme/colors'

const { Header, Sider, Content } = Layout

const CustomLayout = ({ title, sider = true, footer = true, children }) => (
  <StrictMode>
    <StyledLayout>
      <StyledHeader>{title}</StyledHeader>
      <Layout>
        {sider && <StyledSider>Sider</StyledSider>}
        <Content>{children}</Content>
      </Layout>
    </StyledLayout>
  </StrictMode>
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

export default CustomLayout
