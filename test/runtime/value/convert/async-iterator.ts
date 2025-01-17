import { Value } from '@sinclair/typebox/value'
import { Type } from '@sinclair/typebox'
import { Assert } from '../../assert/index'

// --------------------------------------------------------
// non-convertable pass through
// --------------------------------------------------------
describe('value/convert/AsyncIterator', () => {
  const T = Type.AsyncIterator(Type.Any())
  it('Should passthrough 1', () => {
    const V = (async function* () {})()
    const R = Value.Convert(T, V)
    Assert.IsEqual(R, V)
  })
  it('Should passthrough 2', () => {
    const V = 1
    const R = Value.Convert(T, V)
    Assert.IsEqual(R, V)
  })
})
