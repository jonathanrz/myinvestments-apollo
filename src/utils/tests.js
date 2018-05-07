export function findDataTest(wrapper, id) {
  return wrapper.find(`[data-test="${id}"]`)
}
