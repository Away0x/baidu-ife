class Observer {
  constructor (data) {
    this.data = data
    this._walk(data)
    this._subscribers = {}
  }

  _walk (obj, path) {
    Object.keys(obj).forEach(key => {
      this._defineReactive(obj, key, obj[key], path)
    })
  }

  _defineReactive (obj, key, val, path) {
    path = (! path) ? key : (path + key)
    this._observe(val, path)

    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get: () => {
        return val
      },
      set: newVal => {
        if (newVal === val) return
        val = newVal
        this._notify(path || key)
        this._observe(newVal, path)
      }
    })
  }

  _observe (val, path) {
    if (! val || typeof val !== 'object') return
    if (path) path = path + '.'
    this._walk(val, path)
  }

  _getValue (path) {
    const pathArr = path.split('.')
    let val = this.data
    pathArr.forEach(key => val = val[key]) // val 为 pathArr 最尾端值
    return val
  }

  _notify (path) {
    const
      keys = path.split('.'),
      // ['a', 'b', 'c'] => ['a', 'a.b', 'a.b.c']
      depPaths = keys.map((key, index) => {
        if (index === 0)
          return key
        else {
          let str = ''

          while (index--)
            str = keys[index] + '.' + str

          return str + key
        }
      })

    depPaths.forEach(path => {
      const fns = this._subscribers[path]
      if (fns && fns.length)
        fns.forEach(fn => fn && fn(this._getValue(path)))
    })
  }

  $watch (key, callback) {
    if ( ! this._subscribers[key])
      this._subscribers[key] = []

    this._subscribers[key].push(callback)
  }
}
