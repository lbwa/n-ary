import { preOrder, postOrder, levelOrder } from './traversal'

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
  it('preOrder with default fields', () => {
    expect(preOrder()).toEqual([])
    expect(preOrder(defaultTree)).toEqual([1, 3, 5, 6, 2, 4])
  })

  it('preOrder with customize fields', () => {
    expect(preOrder()).toEqual([])
    expect(
      preOrder(customFieldsTree, { value: 'val', children: 'descendants' })
    ).toEqual([1, 3, 5, 6, 2, 4])
  })

  it('postOrder with default fields', () => {
    expect(postOrder()).toEqual([])
    expect(postOrder(defaultTree)).toEqual([5, 6, 3, 2, 4, 1])
  })

  it('postOrder with customize fields', () => {
    expect(postOrder()).toEqual([])
    expect(
      postOrder(customFieldsTree, { value: 'val', children: 'descendants' })
    ).toEqual([5, 6, 3, 2, 4, 1])
  })

  it('levelOrder with default fields', () => {
    expect(levelOrder()).toEqual([])
    expect(levelOrder(defaultTree)).toEqual([[1], [3, 2, 4], [5, 6]])
  })

  it('levelOrder with customize fields', () => {
    expect(
      levelOrder(customFieldsTree, {
        value: 'val',
        children: 'descendants'
      })
    ).toEqual([[1], [3, 2, 4], [5, 6]])
  })
})
