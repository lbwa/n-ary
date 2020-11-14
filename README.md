# N ary tree

[n-ary tree](https://en.wikipedia.org/wiki/M-ary_tree)(also known as `k-ary` or `k-way` tree) implementation in `JavaScript(TypeScript)`.

![Pipeline](https://github.com/lbwa/n-ary/workflows/Pipeline/badge.svg) <img alt="npm (tag)" src="https://img.shields.io/npm/v/n-ary-tree/latest?style=flat-square"> <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/n-ary-tree?style=flat-square">

<!-- TOC -->

- [N ary tree](#n-ary-tree)
  - [Installation](#installation)
  - [Tree node structures](#tree-node-structures)
    - [Default structure fields](#default-structure-fields)
    - [Examples](#examples)
  - [APIs](#apis)
    - [findNodes](#findnodes)
    - [findPathNodes](#findpathnodes)
    - [findPath](#findpath)
    - [findAllPaths](#findallpaths)
    - [Traversal](#traversal)
      - [levelorder](#levelorder)
      - [preorder](#preorder)
      - [postorder](#postorder)
  - [License](#license)

<!-- /TOC -->

## Installation

- Using npm

```bash
$ npm i n-ary-tree
```

- Using yarn

```bash
$ yarn add n-ary-tree
```

## Tree node structures

User-defined tree node fields have supported by all available methods. Just keep the last parameter is a structure like:

```ts
type TreeNodeFields<N> = Partial<{
  value: keyof N
  children: keyof N
}>
```

### Default structure fields

```ts
{
  value: 'value',
  children: 'children'
}
```

By default, we will use `value` field as the value of tree node, `children` field as the children of tree node.

### Examples

```ts
{
  value: 'val', // or other field string in the tree node
  children: 'descendants' // or other field string in the tree node
}
```

`val` field will be regarded as node actual value, `descendants` field in the tree node will be regraded as node children field.

## APIs

### findNodes

Get all matched nodes.

```ts
export function findNodes<N extends Record<string, any>, V = any>(
  root: N,
  targets: V[],
  fields?: TreeNodeFields<N>
): FindNodesResult<N, V>
```

```ts
import { findNodes } from 'n-ary-tree'

interface DefaultTreeNode {
  value: number
  children?: DefaultTreeNode[]
}

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

findNodes(tree, [111])
// -> {
//      nodes: [{ value: 111 }],
//      values: [111]
//    }
findNodes(tree, [111], { value: 'value', children: 'children' })
// Equivalent to findNodes(tree, [111]), { value: 'value', children: 'children' }
// is default preset.
```

### findPathNodes

Get nodes sequences if tree path exist.

```ts
import { findPathNodes } from 'n-ary-tree'

findPathNodes(tree, [1, 11, 111])
/**
 * [
 *   { value: 1, children: ... },
 *   { value: 11, children: ... },
 *   { value: 111, children: ...}
 * ]
 */

findPathNodes(tree, [1, 9])
/**
 * [
 *   { value: 1, children: ... }
 * ]
 */
```

### findPath

Find the latest matched path.

```ts
import { findPath } from 'n-ary-tree'

findPath(tree, [121])
/**
 * [
 *   { value: 1, children: ... },
 *   { value: 12, children: ... },
 *   { value: 121, children: ...}
 * ]
 */
findPath(tree, [22]) // []
```

### findAllPaths

Find all matched paths.

```ts
import { findAllPaths } from 'n-ary-tree'

const tree = {
  value: 1,
  children: [
    {
      value: 111
    },
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

findAllPaths(tree, [111])
/**
 * [
 *    [
 *      { value: 1, children: ... },
 *      { value: 111, children: ... },
 *    ],
 *    [
 *      { value: 1, children: ... },
 *      { value: 11, children: ... },
 *      { value: 111, children: ...}
 *    ]
 * ]
 */
```

### Traversal

We have support 3 kinds of common tree traversal methods: [level-order(BFS)](https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search_/_level_order), [pre-order(DFS)](<https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_(NLR)>), [post-order(DFS)](<https://en.wikipedia.org/wiki/Tree_traversal#Post-order_(LRN)>).

#### levelorder

```ts
const tree = {
  val: 1,
  children: [
    {
      val: 2
    }
  ]
}
levelorder(tree, { value: 'val' })
// [[1], [2]]
```

#### preorder

```ts
const tree = {
  value: 1,
  descendants: [
    {
      value: 2
    }
  ]
}
preorder(tree, { children: 'descendants' })
// [1, 2]
```

#### postorder

```ts
const tree = {
  val: 1,
  descendants: [
    {
      val: 2
    }
  ]
}
postorder(tree, { value: 'val', children: 'descendants' })
// [2, 1]
```

## License

[MIT](./LICENSE) © [Liu Bowen](https://github.com/lbwa)
