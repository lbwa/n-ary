# N ary tree

[n-ary tree](https://en.wikipedia.org/wiki/M-ary_tree)(also known as `k-ary` or `k-way` tree) implementation in `JavaScript(TypeScript)`.

![Pipeline](https://github.com/lbwa/n-ary/workflows/Pipeline/badge.svg) <img alt="npm (tag)" src="https://img.shields.io/npm/v/n-ary-tree/latest?style=flat-square"> <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/n-ary-tree?style=flat-square">

<!-- TOC -->

- [N ary tree](#n-ary-tree)
  - [Installation](#installation)
  - [APIs](#apis)
    - [findNodes](#findnodes)
    - [Traversal](#traversal)
      - [preOrder](#preorder)
      - [postOrder](#postorder)
      - [levelOrder](#levelorder)
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

## APIs

### findNodes

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
```

### Traversal

We have support 3 kinds of common tree traversal method: pre-order, post-order, level-order.

#### preOrder

#### postOrder

#### levelOrder

## License

[MIT](./LICENSE) © [Liu Bowen](https://github.com/lbwa)
