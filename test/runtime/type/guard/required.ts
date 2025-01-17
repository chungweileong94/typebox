import { TypeGuard, TypeRegistry, Type, Kind } from '@sinclair/typebox'
import { Assert } from '../../assert/index'

describe('type/guard/TRequired', () => {
  it('Should produce a valid TSchema', () => {
    const T = Type.Required(Type.Object({ x: Type.Number() }))
    Assert.IsTrue(TypeGuard.TSchema(T))
  })
  it('Should support TUnsafe required properties with no Kind', () => {
    const T = Type.Required(Type.Object({ x: Type.Optional(Type.Unsafe({ x: 1 })) }))
    Assert.IsEqual(T.required, ['x'])
  })
  it('Should support TUnsafe required properties with unknown Kind', () => {
    const T = Type.Required(Type.Object({ x: Type.Optional(Type.Unsafe({ [Kind]: 'UnknownRequiredType', x: 1 })) }))
    Assert.IsEqual(T.required, ['x'])
  })
  it('Should support TUnsafe required properties with known Kind', () => {
    TypeRegistry.Set('KnownRequiredType', () => true)
    const T = Type.Required(Type.Object({ x: Type.Optional(Type.Unsafe({ [Kind]: 'KnownRequiredType', x: 1 })) }))
    Assert.IsEqual(T.required, ['x'])
  })
  it('Should support applying required to intersect', () => {
    const A = Type.Object({ x: Type.Optional(Type.Number()) })
    const B = Type.Object({ y: Type.Optional(Type.Number()) })
    const I = Type.Intersect([A, B])
    const T = Type.Required(I)
    Assert.IsEqual(T.allOf.length, 2)
    Assert.IsEqual(T.allOf[0].required, ['x'])
    Assert.IsEqual(T.allOf[1].required, ['y'])
  })
  it('Should support applying required to union', () => {
    const A = Type.Object({ x: Type.Optional(Type.Number()) })
    const B = Type.Object({ y: Type.Optional(Type.Number()) })
    const I = Type.Union([A, B])
    const T = Type.Required(I)
    Assert.IsEqual(T.anyOf.length, 2)
    Assert.IsEqual(T.anyOf[0].required, ['x'])
    Assert.IsEqual(T.anyOf[1].required, ['y'])
  })
})
