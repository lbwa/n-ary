export function isDef<V>(val: V): val is NonNullable<V> {
  return val !== undefined && val !== null
}
