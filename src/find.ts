import { TreeNode, TreeNodeFields } from './types'

export type FindNodesResult<N extends TreeNode<V>, V> = {
  nodes: N[]
  values: V[]
}

export function findNodes<N extends TreeNode<V>, V = any>(
  root: N,
  targets: V[],
  fields?: TreeNodeFields<N>
): FindNodesResult<N, V>

export function findNodes<N extends TreeNode<V>, V = any>(
  root: N,
  targets: V[],
  { value = 'value', children = 'children' }: TreeNodeFields<N> = {}
): FindNodesResult<N, V> {
  const values: V[] = []
  const nodes: N[] = []

  if (!root) {
    return { nodes, values }
  }

  function dfs(root: N | undefined) {
    if (!root) {
      return
    }

    const index = targets.indexOf(root[value])
    if (index > -1) {
      values[index] = root[value]
      nodes[index] = root
    }

    if (Array.isArray(root[children]) && root[children].length > 0) {
      root[children].forEach(dfs)
    }
  }
  dfs(root)
  return { nodes, values }
}

export function findPathNodes<N extends TreeNode<V>, V = any>(
  root: N,
  targets: V[],
  fields?: TreeNodeFields<N>
): N[]

export function findPathNodes<N extends TreeNode<V>, V = any>(
  root: N,
  targets: V[],
  { value = 'value', children = 'children' }: TreeNodeFields<N> = {}
): N[] {
  const nodes: N[] = []
  if (!root) {
    return nodes
  }

  const queue: N[] = [root]
  let levelIndex = -1
  while (queue.length > 0) {
    const levelSize = queue.length
    levelIndex++
    for (let i = 0; i < levelSize; i++) {
      const current = queue.shift()!

      if (current[value] === targets[levelIndex]) {
        nodes.push(current)
        if (levelIndex < targets.length - 1) {
          queue.push(...((current[children] as any) || []))
        }
        break
      }
    }
  }
  return nodes
}
