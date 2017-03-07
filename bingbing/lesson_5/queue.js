class Queue {
  constructor (config) {
    this._Indexmark = 'data-index'                 // 占位属性
    this._$wrap = $(config.wrapSelector)           // 队列容器
    this._arr   = []                               // 队列
    this._maxLength   = config.maxLength   || 60   // 队列最大长度
    this._maxLengthCb = config.maxLengthCb || noop // 队列到达最大长度时的回调
    this._sortCb      = config.sortCb      || noop // 排序时每一步结束时的回调
  }
  // 生成 li : Number -> return String(html li)
  _renderLi (num, index=0) {
    return (`
      <li ${this._Indexmark}=${index} title=${num} style="height:${num}px;">
        <span>${num}</span>
      </li>
    `)
  }
  // 生成 list : Array -> return String(html list)
  _renderList () {
    return this._arr.map(a => parseInt(a))
      .filter(n => is_number(n))
      .map((n, index) => this._renderLi(n, index))
      .join('')
  }
  // 队列是否达到最大长度了
  _isMax () {
    if (this._arr.length === this._maxLength) {
      this._maxLengthCb(this._maxLength)
      return true
    }
    return false
  }
  // right enter
  push (num) {
    if (this._isMax()) return false
    this._arr.push(num)
    this.init()
    return num
  }
  // left enter
  unshift (num) {
    if (this._isMax()) return false
    this._arr.unshift(num)
    this.init()
    return num
  }
  // right leave
  pop () {
    if (this._arr.length === 0) return false
    this._arr.pop()
    this.init()
    return true
  }
  // left leave
  shift () {
    if (this._arr.length === 0) return false
    this._arr.shift()
    this.init()
    return true
  }
  // 删除指定 index 的队列元素
  remove (index) {
    this._arr.splice(parseInt(index), 1)
    this.init()
  }
  // 排序 : type(true为正序，false为逆序)
  sort (type) {
    this._arr = bubbleSort(this._arr, type, (a, b) => this._sortCb(type, a, b))
    this.init()
  }
  // 生成初始队列
  init (arr) {
    this._arr = arr ? arr : this._arr
    if ( ! is_array(this._arr)) return
    if ( ! this._arr.length > 0) return
    this._$wrap.innerHTML = this._renderList()
  }
}
