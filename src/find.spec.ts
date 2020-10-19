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
          value: 1,
          children: [
            {
              value: 11
            },
            {
              value: 12,
              children: [
                {
                  value: 121
                },
                {
                  value: 122
                }
              ]
            },
            {
              value: 13
            },
            {
              value: 14,
              children: [
                {
                  value: 141
                },
                {
                  value: 142
                }
              ]
            }
          ]
        },
        {
          value: 2
        }
      ]
    }
    expect(findNodes(undefined as any, [11])).toEqual({ nodes: [], values: [] })
    expect(findNodes(tree, [11])).toEqual({
      nodes: [{ value: 11 }],
      values: [11]
    })
    expect(findNodes(tree, [142])).toEqual({
      nodes: [{ value: 142 }],
      values: [142]
    })
    expect(findNodes(tree, [123])).toEqual({ nodes: [], values: [] })
    expect(
      findNodes(
        {
          value: 1,
          children: new Array(99).fill(undefined).concat({
            value: 12,
            children: new Array(999)
              .fill(undefined)
              .concat({ value: 19 })
              .concat(new Array(99).fill(null))
          })
        },
        [19]
      )
    ).toEqual({ nodes: [{ value: 19 }], values: [19] })
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
