import React from 'react'
import styled from 'styled-components'
import { Form, DatePicker, Input, Button } from 'antd'

const Container = styled.div`
  max-width: 600px;
  margin: 50px;
`

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = { ...fieldsValue }
      if (values.dueDate) values.dueDate = parseInt(fieldsValue.dueDate.format('X'))

      this.props.createInvestment(values)
    })
  }

  getFieldDecorator = fieldName =>
    this.props.form.getFieldDecorator(fieldName, { rules: [{ required: false }] })

  getRequiredFieldDecorator = (fieldName, message) =>
    this.props.form.getFieldDecorator(fieldName, { rules: [{ required: true, message }] })

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {this.getRequiredFieldDecorator('name', 'Por favor informe o nome do investimento')(
              <Input placeholder="Nome" />
            )}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator('type', 'Por favor informe o tipo do investimento')(
              <Input placeholder="Tipo" />
            )}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator(
              'holder',
              'Por favor informe o detentor do investimento'
            )(<Input placeholder="Detentor" />)}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator(
              'objective',
              'Por favor informe o objetivo do investimento'
            )(<Input placeholder="Objetivo" />)}
          </Form.Item>
          <Form.Item>
            {this.getFieldDecorator('dueDate')(
              <DatePicker format="DD/MM/YYYY" placeholder="Data de vencimento" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Container>
    )
  }
}

export default Form.create()(LoginForm)
