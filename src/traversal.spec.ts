import { preorder, postorder, levelorder } from './traversal'

describe('N ary tree traversal', () => {
  const defaultTree = {
    value: 1,
    children: [
      { value: 3, children: [{ value: 5 }, { value: 6 }] },
      { value: 2 },
      { value: 4 }
    ]
  }
  const customFieldsTree = {
    val: 1,
    descendants: [
      { val: 3, descendants: [{ val: 5 }, { val: 6 }] },
      { val: 2 },
      { val: 4 }
    ]
  }
  it('preorder with default fields', () => {
    expect(preorder()).toEqual([])
    expect(preorder(defaultTree)).toEqual([1, 3, 5, 6, 2, 4])
  })

  it('preorder with customize fields', () => {
    expect(preorder()).toEqual([])
    expect(
      preorder(customFieldsTree, { value: 'val', children: 'descendants' })
    ).toEqual([1, 3, 5, 6, 2, 4])
  })

  it('postorder with default fields', () => {
    expect(postorder()).toEqual([])
    expect(postorder(defaultTree)).toEqual([5, 6, 3, 2, 4, 1])
  })

  it('postorder with customize fields', () => {
    expect(postorder()).toEqual([])
    expect(
      postorder(customFieldsTree, { value: 'val', children: 'descendants' })
    ).toEqual([5, 6, 3, 2, 4, 1])
  })

  it('levelorder with default fields', () => {
    expect(levelorder()).toEqual([])
    expect(levelorder(defaultTree)).toEqual([[1], [3, 2, 4], [5, 6]])
  })

  it('levelorder with customize fields', () => {
    expect(
      levelorder(customFieldsTree, {
        value: 'val',
        children: 'descendants'
      })
    ).toEqual([[1], [3, 2, 4], [5, 6]])
  })
})
