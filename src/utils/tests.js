import expect from 'expect'

export function findDataTest(wrapper, id) {
  return wrapper.find(`[data-test="${id}"]`)
}

export function expectDataTestToHaveProps(wrapper, id, prop) {
  return expectToHaveProp(findDataTest(wrapper, id), prop)
}

export function expectToHaveLength(wrapper, length) {
  expect(wrapper).toInclude({ length: length })
}

export function expectToHaveText(wrapper, text) {
  expectToHaveProp(wrapper, { children: text })
}

export function expectToHaveProp(wrapper, prop) {
  if (Array.isArray(prop)) expect(wrapper.props()).toIncludeKeys(prop)
  else if (typeof prop === 'object') expect(wrapper.props()).toInclude(prop)
  else expect(wrapper.props()).toIncludeKey(prop)
}

export function expectToNotHaveProp(wrapper, prop) {
  if (Array.isArray(prop)) expect(wrapper.props()).toExcludeKeys(prop)
  else if (typeof prop === 'object') expect(wrapper.props()).toExclude(prop)
  else expect(wrapper.props()).toExcludeKey(prop)
}
