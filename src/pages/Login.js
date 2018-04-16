import React from 'react'
import { withRouter } from 'react-router-dom'

import Layout from 'app/components/Layout'
import LoginForm from 'app/components/LoginForm'

const Login = () => (
  <Layout title="Entrar" sider={false} footer={false}>
    <LoginForm />
  </Layout>
)

export default withRouter(Login)
