import React from 'react'
import { Mutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import requireAuth from 'app/lib/requireAuth'
import { parseDate } from 'app/utils/parse'
import mutation from 'app/mutations/CreateIncome'
import AppBar from 'app/components/AppBar'
import Loader from 'app/components/Loader'

import { Form, Input, Button } from 'antd'

const { TextArea } = Input

class NewIncomePage extends React.Component {
  createIncome = data => {
    this.props.createIncome({
      variables: { data, investmentUuid: this.props.match.params.uuid }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return
      const values = { ...fieldsValue }
      const incomes = JSON.parse(values.input)

      incomes.forEach(income => {
        const newIncome = { ...income }
        newIncome.date = parseDate(newIncome.date).format('X')
        this.createIncome(newIncome)
      })
    })
  }

  renderErrors = errors => errors.map(error => <div key={error}>{error.message}</div>)

  getRequiredFieldDecorator = (fieldName, message, initialValue) =>
    this.props.form.getFieldDecorator(fieldName, {
      initialValue,
      rules: [{ required: true, message }]
    })

  render() {
    const { match } = this.props
    const { loading, errors, data } = this.props.response

    const initialValue = `
    [
      { "date": "00/00/0000", "quantity": 100, "value": 12345, "bought": 0, "sold": 0, "gross": 0, "fee": 0 }
    ]`

    return (
      <AppBar title="Novo Rendimento">
        {loading ? (
          <Loader message={'Criando rendimento'} />
        ) : errors ? (
          this.renderErrors(errors)
        ) : data ? (
          <Redirect
            to={{
              pathname: `/investment/${match.params.uuid}`,
              state: { uuid: match.params.uuid }
            }}
            push
          />
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {this.getRequiredFieldDecorator(
                'input',
                'Por favor informe os rendimentos',
                initialValue
              )(<TextArea rows={10} />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
          </Form>
        )}
      </AppBar>
    )
  }
}

const Page = requireAuth(Form.create()(NewIncomePage))

const ConnectedNewIncomePage = () => (
  <Mutation mutation={mutation}>
    {(createIncome, response) => <Page createIncome={createIncome} response={response || {}} />}
  </Mutation>
)

export default ConnectedNewIncomePage
