import { TreeNode, TreeNodeFields } from './types'
import { isDef } from 'tslang-utils'

export function levelorder<N extends TreeNode<V>, V = any>(
  root?: N,
  { value = 'value', children = 'children' }: TreeNodeFields<N> = {}
) {
  const ans: V[][] = []
  if (!isDef(root)) {
    return ans
  }

  const queue: N[] = [root]
  while (queue.length > 0) {
    const levelSize = queue.length
    ans.push([])
    for (let i = 0; i < levelSize; i++) {
      const current = queue.shift()!
      ans[ans.length - 1].push(current[value])

      const nextLevel = current[children]
      if (Array.isArray(nextLevel)) {
        queue.push(...(nextLevel as N[]))
      }
    }
  }
  return ans
}

export const bfs = levelorder

export function preorder<N extends TreeNode<V>, V = any>(
  root?: N,
  { value = 'value', children = 'children' }: TreeNodeFields<N> = {}
) {
  const ans: V[] = []
  if (!isDef(root)) {
    return ans
  }

  function dfs(root: N | undefined, ans: V[]) {
    if (!isDef(root)) {
      return
    }
    ans.push(root[value])
    if (Array.isArray(root[children]) && (root[children] as any).length > 0) {
      ;(root[children] as any).forEach((child: N) => dfs(child, ans))
    }
  }
  dfs(root, ans)
  return ans
}

export function postorder<N extends TreeNode<V>, V = any>(
  root?: N,
  { value = 'value', children = 'children' }: TreeNodeFields<N> = {}
) {
  const ans: V[] = []
  if (!isDef(root)) {
    return ans
  }

  function dfs(root: N | undefined, ans: V[]) {
    if (!isDef(root)) {
      return
    }
    if (Array.isArray(root[children]) && (root[children] as any).length > 0) {
      ;(root[children] as any).forEach((child: N) => dfs(child, ans))
    }
    ans.push(root[value])
  }
  dfs(root, ans)
  return ans
}
