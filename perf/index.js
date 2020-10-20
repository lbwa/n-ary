const Benchmark = require('benchmark')
const {
  findNodes: findNodesInProd,
  findPathNodes: findPathNodesInProd
} = require('../dist/n-ary-tree.cjs.production.min')
const {
  findNodes: findNodesInDev,
  findPathNodes: findPathNodesInDev
} = require('../dist/n-ary-tree.cjs.development')

const targets = [142]
const path = [1, 14, 142]
Benchmark.Suite()
  .add(`findNodes in prod`, function() {
    findNodesInProd(tree, targets)
  })
  .add('findNodes is dev', function() {
    findNodesInDev(tree, targets)
  })
  .add('findPathNodes in prod', function() {
    findPathNodesInProd(tree, path)
  })
  .add('findPathNodes in dev', function() {
    findPathNodesInDev(tree, path)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })

const tree = {
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
