// 观察者构造函数
class Observer {
  constructor (data) {
    this.data = data
    this._pubSub = new PubSub()
    this._walk(data)
  }
  // 用于深层次遍历对象的各个属性(要为对象的每一个属性绑定getter和setter)
  _walk (obj, path) {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        this._walk(obj[key], path + '.')
      }

      this._convert(key, obj[key], path)
    })
  }
  _convert (key, val, path) {
    console.log(key);
    path = (! path) ? key : (path + key)
    // console.log(path);
    Object.defineProperty(this.data, key, {
      enumerable: true, configurable: true,
      get: () => {
        // console.log(`你访问了 `, key)
        return val
      },
      set: newVal => {
        // console.log(`你设置了 ${key}, 新的值为`, newVal)
        if ((newVal === val) && (typeof newVal !== 'object')) return

        if (typeof newVal === 'object') new Observer(newVal)
        this._pubSub.publish(key, newVal)
        val = newVal
      }
    })
  }
  // 监听
  $watch (key, callback) {
    this._pubSub.subscribe(key, data => {
      callback && callback(data)
    })
  }
}
