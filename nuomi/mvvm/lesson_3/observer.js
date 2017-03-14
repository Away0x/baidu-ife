const event = new PubSub()



// 观察者构造函数
class Observer {
  constructor (data, dataPath) {
    this._dataObjPath = dataPath || 'data' // 存贮对象路径，便于事件冒泡
    this.data = data
    this._pubSubMark = 'self_pubsub'
    this._walk(data)
  }
  // 用于深层次遍历对象的各个属性(要为对象的每一个属性绑定getter和setter)
  _walk (obj) {
    let val
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) { // 仅仅遍历这个对象本身拥有的属性
        val = obj[key]
        // 还没有遍历到最底层，继续 new Observer
        if (typeof val === 'object')
          new Observer(val, `${this._dataObjPath}.${key}`)
        else
          this._convert(key, val) // 绑定
      }
    }
  }
  _convert (key, val) {
    const me = this

    Object.defineProperty(this.data, key, {
      enumerable: true, configurable: true,
      get () {
        // console.log(`你访问了 `, key)
        return val
      },
      set (newVal) {
        // console.log(`你设置了 ${key}, 新的值为`, newVal)
        if ((newVal === val) && (typeof newVal !== 'object')) return

        if (typeof newVal === 'object') new Observer(newVal, `${me._dataObjPath}.${key}`)

        const pathDeep = me._dataObjPath.split('.').slice(1)
        if (pathDeep.length > 0) {
          pathDeep.forEach(key => {
            event.publish(`${me._pubSubMark}-${key}`, newVal)
          })
        }
        else
          event.publish(`${me._pubSubMark}-${key}`, newVal)
        val = newVal
      }
    })
  }
  // 监听
  $watch (key, callback) {
    event.subscribe(`${this._pubSubMark}-${key}`, data => {
      callback && callback(data)
    })
  }
}
