import { findNodes } from '.'

interface DefaultTreeNode {
  value: number
  children?: DefaultTreeNode[]
}

describe('N-ary tree', () => {
  it('should find nodes with default fields', () => {
    const tree: DefaultTreeNode = {
      value: 1,
      children: [
        {
          value: 11,
          children: [
            {
              value: 111
            }
          ]
        },
        {
          value: 12,
          children: [
            {
              value: 121
            }
          ]
        }
      ]
    }
    expect(findNodes(tree, [111])).toEqual({
      nodes: [{ value: 111 }],
      values: [111]
    })
    expect(findNodes(tree, [123])).toEqual({ nodes: [], values: [] })
  })

  it('should find nodes with specific fields', () => {
    const tree = {
      label: 'label1',
      descendants: [
        {
          label: 'label11',
          descendants: [
            {
              label: 'label111'
            }
          ]
        }
      ]
    }
    expect(
      findNodes(tree, ['label11'], { value: 'label', children: 'descendants' })
    ).toEqual({ nodes: [tree.descendants![0]], values: ['label11'] })
    expect(
      findNodes(tree, ['label112'], { value: 'label', children: 'descendants' })
    ).toEqual({ nodes: [], values: [] })
  })
})
