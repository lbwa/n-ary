import { TreeNode, TreeNodeFields } from './types'
import { isDef } from 'tslang-utils'

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

function createPathFinder<
  N extends TreeNode<V>,
  R extends N[] | N[][],
  V = any
>(callback: (track: N[], answer?: R) => R) {
  return function pathFinder(
    root: N,
    target: V,
    { value = 'value', children = 'children' }: TreeNodeFields<N> = {}
  ): R {
    const track: N[] = []
    let answer: R = ([] as unknown) as R
    function backtracking(root: N | undefined | null) {
      if (!root) {
        return
      }
      track.push(root)
      if (isDef(root[value]) && root[value] === target) {
        answer = callback(track, answer)
      }
      if (Array.isArray(root[children])) {
        root[children].forEach(backtracking)
      }
      track.pop()
    }
    backtracking(root)
    return answer
  }
}

export function findPath<N extends TreeNode<V>, V = any>(
  root: N,
  target: V,
  treeNodeFields: TreeNodeFields<N> = {}
) {
  return createPathFinder<N, N[], V>(track => [...track])(
    root,
    target,
    treeNodeFields
  )
}

export function findAllPaths<N extends TreeNode<V>, V = any>(
  root: N,
  target: V,
  treeNodeFields: TreeNodeFields<N> = {}
) {
  return createPathFinder<N, N[][], V>((track, answer) =>
    answer!.concat([[...track]])
  )(root, target, treeNodeFields)
}
