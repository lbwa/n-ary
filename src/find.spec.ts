import { findNodes, findPathNodes, findAllPaths, findPath } from '.'

interface DefaultTreeNode {
  value: number
  children?: DefaultTreeNode[]
}

describe('find* methods', () => {
  const tree: DefaultTreeNode = {
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
  }

  it('should find nodes with default fields', () => {
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
            children: new Array(99)
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

  it('should find nodes in the path', () => {
    expect(findPathNodes(undefined as any, [1, 14, 142])).toHaveLength(0)
    expect(findPathNodes(tree, [2])).toEqual([])
    expect(findPathNodes(tree, [1, 99])).toEqual([tree])
    expect(findPathNodes(tree, [1, 14, 10])).toEqual([
      tree,
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
    ])
    expect(findPathNodes(tree, [1, 14, 142])).toEqual([
      tree,
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
      },
      {
        value: 142
      }
    ])
  })

  it('should find path nodes with specific fields', () => {
    const tree = {
      label: 'label1',
      descendants: [
        {
          label: 'label11',
          descendants: [
            {
              label: 'label111',
              descendants: [
                {
                  label: 'label1111'
                }
              ]
            }
          ]
        }
      ]
    }
    expect(
      findPathNodes(tree, ['label11'], {
        value: 'label',
        children: 'descendants'
      })
    ).toEqual([])
    expect(
      findPathNodes(undefined as any, [], {
        value: 'label',
        children: 'descendants'
      })
    ).toEqual([])
    expect(
      findPathNodes(tree, [], {
        value: 'label',
        children: 'descendants'
      })
    ).toEqual([])
    expect(
      findPathNodes(tree, ['label1', 'label11'], {
        value: 'label',
        children: 'descendants'
      })
    ).toEqual([tree, tree.descendants![0]])
    expect(
      findPathNodes(tree, ['label1', 'label112'], {
        value: 'label',
        children: 'descendants'
      })
    ).toEqual([tree])
  })

  it('should find last matched path when we have only one target node', () => {
    const tree = {
      label: 'label1',
      descendants: [
        {
          label: 'label11',
          descendants: [
            {
              label: 'label1111' // duplicated
            },
            {
              label: 'label111',
              descendants: [
                {
                  label: 'label1111' // duplicated
                },
                {
                  label: 'label1112'
                }
              ]
            },
            {
              label: 'label112'
            }
          ]
        }
      ]
    }
    expect(
      findPath(tree, 'label2', { value: 'label', children: 'descendants' })
    ).toEqual([])
    expect(
      findPath(tree, 'label111', { value: 'label', children: 'descendants' })
    ).toEqual([tree, tree.descendants[0], tree.descendants[0].descendants[1]])
    expect(
      findPath(tree, 'label112', { value: 'label', children: 'descendants' })
    ).toEqual([tree, tree.descendants[0], tree.descendants[0].descendants[2]])
    expect(
      findPath(tree, 'label1112', { value: 'label', children: 'descendants' })
    ).toEqual([
      tree,
      tree.descendants[0],
      tree.descendants[0].descendants[1],
      tree.descendants[0].descendants![1].descendants![1]
    ])
    expect(
      findPath(tree, 'label1111', { value: 'label', children: 'descendants' })
    ).toEqual([
      tree,
      tree.descendants[0],
      tree.descendants[0].descendants[1],
      tree.descendants[0].descendants![1].descendants![0]
    ])
  })

  it('should find all matched path when we have only one target node', () => {
    const tree = {
      label: 'label1',
      descendants: [
        {
          label: 'label11',
          descendants: [
            {
              label: 'label1111' // duplicated
            },
            {
              label: 'label111',
              descendants: [
                {
                  label: 'label1111' // duplicated
                },
                {
                  label: 'label1112'
                }
              ]
            },
            {
              label: 'label112'
            }
          ]
        }
      ]
    }
    expect(
      findAllPaths(tree, 'label1111', {
        value: 'label',
        children: 'descendants'
      })
    ).toEqual([
      [tree, tree.descendants[0], tree.descendants[0].descendants[0]],
      [
        tree,
        tree.descendants[0],
        tree.descendants[0].descendants[1],
        tree.descendants[0].descendants![1].descendants![0]
      ]
    ])
  })
})
