export type TreeNodeFields<N> = Partial<{
  value: keyof N
  children: keyof N
}>

export type TreeNode<V = any> = Partial<{
  value: V
  children: TreeNode[]
  [key: string]: any
}>
