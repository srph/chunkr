declare module 'chunk-pattern' {
  type Fn<T> = (items: T[], chunk: number[]) => Array<T[]>
  export default Fn
}
