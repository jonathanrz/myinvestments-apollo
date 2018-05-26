import expect from 'expect'

export function findDataTest(wrapper, id) {
  return wrapper.find(`[data-test="${id}"]`)
}

export function expectToHaveLength(wrapper, length) {
  expect(wrapper).toInclude({ length: length })
}

export function expectToHaveText(wrapper, text) {
  expect(wrapper.props()).toInclude({ children: text })
}
