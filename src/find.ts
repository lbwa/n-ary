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

    let i = targets.length
    while (i--) {
      if (targets[i] === root[value]) {
        values[i] = root[value]
        nodes[i] = root
      }
    }

    // avoid unnecessary comparison, return answer as soon as possible
    if (values.length === targets.length) {
      return
    }

    if (Array.isArray(root[children]) && (root[children] as any).length > 0) {
      ;(root[children] as any).forEach(dfs)
    }
  }
  dfs(root)
  return { nodes, values }
}
