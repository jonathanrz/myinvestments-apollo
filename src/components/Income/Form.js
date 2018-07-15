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
          <Form.Item>
            {this.getRequiredFieldDecorator('date', 'Por favor informe a data', date)(
              <DatePicker format="DD/MM/YYYY" placeholder="Data" />
            )}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator(
              'quantity',
              'Por favor informe a quantidade',
              get(income, 'quantity')
            )(<Input placeholder="Quantidade" />)}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator(
              'value',
              'Por favor informe o valor',
              get(income, 'value')
            )(<Input placeholder="Valor" />)}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator(
              'bought',
              'Por favor informe o valor comprado',
              get(income, 'bought')
            )(<Input placeholder="Comprado" />)}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator(
              'sold',
              'Por favor informe o valor vendido',
              get(income, 'sold') || 0
            )(<Input placeholder="Vendido" />)}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator(
              'gross',
              'Por favor informe o rendimento',
              get(income, 'gross') || 0
            )(<Input placeholder="Rendimento" />)}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator('ir', 'Por favor informe o IR', get(income, 'ir') || 0)(
              <Input placeholder="IR" />
            )}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator(
              'fee',
              'Por favor informe a taxa',
              get(income, 'fee') || 0
            )(<Input placeholder="Taxa" />)}
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
