import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { get } from 'lodash'
import { Form, DatePicker, Input, Button } from 'antd'

const Container = styled.div`
  max-width: 600px;
  margin: 50px;
`

class InvestmentForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = { ...fieldsValue }
      if (values.dueDate) values.dueDate = parseInt(fieldsValue.dueDate.format('X'))

      this.props.onSubmit(values)
    })
  }

  getFieldDecorator = (fieldName, initialValue) =>
    this.props.form.getFieldDecorator(fieldName, { initialValue, rules: [{ required: false }] })

  getRequiredFieldDecorator = (fieldName, message, initialValue) =>
    this.props.form.getFieldDecorator(fieldName, {
      initialValue,
      rules: [{ required: true, message }]
    })

  render() {
    const { investment } = this.props

    let dueDate = get(investment, 'dueDate')
    if (dueDate) dueDate = moment(dueDate, 'X')

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Nome">
            {this.getRequiredFieldDecorator(
              'name',
              'Por favor informe o nome do investimento',
              get(investment, 'name')
            )(<Input placeholder="John Doe" />)}
          </Form.Item>
          <Form.Item label="Detentor">
            {this.getRequiredFieldDecorator(
              'type',
              'Por favor informe o tipo do investimento',
              get(investment, 'type')
            )(<Input placeholder="Ação" />)}
          </Form.Item>
          <Form.Item label="Detentor">
            {this.getRequiredFieldDecorator(
              'holder',
              'Por favor informe o detentor do investimento',
              get(investment, 'holder')
            )(<Input placeholder="Banco" />)}
          </Form.Item>
          <Form.Item label="Objetivo">
            {this.getRequiredFieldDecorator(
              'objective',
              'Por favor informe o objetivo do investimento',
              get(investment, 'objective')
            )(<Input placeholder="Rendimento" />)}
          </Form.Item>
          <Form.Item label="Data de vencimento">
            {this.getFieldDecorator('dueDate', dueDate)(
              <DatePicker format="DD/MM/YYYY" placeholder="00/00/0000" />
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

export default Form.create()(InvestmentForm)
