import React from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import moment from 'moment'
import { get } from 'lodash'
import { Form, Button } from 'antd'

import query from 'app/queries/InvestmentsOfMonth'
import mutation from 'app/mutations/CreateIncome'
import InputCurrency from 'app/common/InputCurrency'

const Container = styled.div`
  .ant-form-inline {
    display: flex;
  }
`

class InvestmentOfMonthForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    const { form, lastIncome, createIncome, investmentUuid } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = { ...fieldsValue }
      values.date = parseInt(moment().format('X'))
      values.quantity = lastIncome.quantity

      createIncome({
        variables: { data: values, investmentUuid: investmentUuid }
      })
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
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            {this.getRequiredFieldDecorator(
              'value',
              'Por favor informe o valor',
              get(income, 'value')
            )(<InputCurrency placeholder={this.props.lastIncome.value} />)}
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

const FormCreated = Form.create()(InvestmentOfMonthForm)

const ConnectedInvestmentOfMonthForm = props => (
  <Mutation mutation={mutation} refetchQueries={[{ query }]}>
    {createIncome => <FormCreated createIncome={createIncome} {...props} />}
  </Mutation>
)

export default ConnectedInvestmentOfMonthForm
