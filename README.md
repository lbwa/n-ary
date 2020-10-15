<h1 align="center">N ary tree</h1>

[n-ary tree](https://en.wikipedia.org/wiki/M-ary_tree)(also known as `k-ary` or `k-way` tree) implementation in `JavaScript(TypeScript)`.

## Installation

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

## License

[MIT](./LICENSE) © [Liu Bowen](https://github.com/lbwa)
