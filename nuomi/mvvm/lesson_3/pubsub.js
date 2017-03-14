// 发布订阅模式
class PubSub {
  constructor() {
    this.handlers = {}
  }
  // 订阅事件
  subscribe (eventName, handler) {
    if ( ! (eventName in this.handlers))
      this.handlers[eventName] = [] // 初始化

    this.handlers[eventName].push(handler)
    return this
  }
  // 发布事件
  publish (eventName, ...args) {
    if ( ! (this.handlers[eventName] instanceof Array)) return false

    this.handlers[eventName].forEach(fn => fn.call(this, ...args))
    return this
  }
  // 退订事件
  unsubscribe (eventName) {
    if ( ! (this.handlers[eventName] instanceof Array)) return false

    delete this.handlers[eventName]
    return this
  }
}
