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
