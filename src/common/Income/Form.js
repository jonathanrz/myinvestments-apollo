import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { get } from 'lodash'
import { Form, DatePicker, Input, Button } from 'antd'

import InputCurrency from 'app/common/InputCurrency'

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
      if (values.date) values.date = parseInt(fieldsValue.date.format('X'))

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
    const { income } = this.props

    let date = get(income, 'date')
    if (date) date = moment(date, 'X')

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Data">
            {this.getRequiredFieldDecorator('date', 'Por favor informe a data', date)(
              <DatePicker format="DD/MM/YYYY" placeholder="00/00/0000" />
            )}
          </Form.Item>
          <Form.Item label="Quantidade">
            {this.getRequiredFieldDecorator(
              'quantity',
              'Por favor informe a quantidade',
              get(income, 'quantity')
            )(<Input placeholder="100" />)}
          </Form.Item>
          <Form.Item label="Valor">
            {this.getRequiredFieldDecorator(
              'value',
              'Por favor informe o valor',
              get(income, 'value')
            )(<InputCurrency placeholder="100" />)}
          </Form.Item>
          <Form.Item label="Comprado">
            {this.getRequiredFieldDecorator(
              'bought',
              'Por favor informe o valor comprado',
              get(income, 'bought')
            )(<InputCurrency placeholder="100" />)}
          </Form.Item>
          <Form.Item label="Vendido">
            {this.getRequiredFieldDecorator(
              'sold',
              'Por favor informe o valor vendido',
              get(income, 'sold') || 0
            )(<InputCurrency placeholder="100" />)}
          </Form.Item>
          <Form.Item label="Rendimento">
            {this.getRequiredFieldDecorator(
              'gross',
              'Por favor informe o rendimento',
              get(income, 'gross') || 0
            )(<InputCurrency placeholder="100" />)}
          </Form.Item>
          <Form.Item label="IR">
            {this.getRequiredFieldDecorator('ir', 'Por favor informe o IR', get(income, 'ir') || 0)(
              <InputCurrency placeholder="100" />
            )}
          </Form.Item>
          <Form.Item label="Taxa">
            {this.getRequiredFieldDecorator(
              'fee',
              'Por favor informe a taxa',
              get(income, 'fee') || 0
            )(<InputCurrency placeholder="100" />)}
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
