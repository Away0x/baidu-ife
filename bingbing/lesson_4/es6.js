// BEGIN ----------------------------- utils -----------------------------
// 获取 dom
const $ = selector =>
  selector.indexOf('#') !== -1
  ? document.querySelector(selector)    // dom
  : document.querySelectorAll(selector) // [dom, dom ...]

// 绑定 click 事件
const bindClick = (selector, bindFn) => {
  const dom = $(selector)

  dom.addEventListener('click', function (ev) {
    bindFn && bindFn.call(dom, ev)
  })
}

// 类型检测
const isType = type => target =>
  toString.call(target) === '[object ' + type + ']'
const is_array  = isType('Array')
const is_number = isType('Number')

// 获取 input 中输入的数字
const getInputValueNum = inputSelector => {
  return function () {
    const
      $input = $(inputSelector),
      num = parseInt($input.value)

    $input.value = ''
    if ( ! is_number(num) || isNaN(num)) {
      alert('请输入一个数字')
      return false
    }
    return num
  }
}
// END ----------------------------- utils -----------------------------

// BEGIN ----------------------------- Queue Class -----------------------------
class Queue {
  constructor (wrapSelector) {
    this._Indexmark = 'data-index' // 占位属性
    this._$wrap = $(wrapSelector)  // 队列容器
    this._arr   = []               // 队列
    this._index = 0                // 队列下标
  }
  // 生成 li : Number -> return dom(html list)
  _renderLi (num, index=0) {
    const $li = document.createElement('li')
    $li.setAttribute(this._Indexmark, index)
    $li.textContent = num
    return $li
  }
  // 更新 index
  _reIndex () {
    this._arr.forEach(($el, index) => $el.setAttribute(this._Indexmark, index))
    this._index = this._arr.length
  }
  // right enter
  push (num) {
    const $newLi = this._renderLi(num)
    this._arr.push($newLi)
    this._$wrap.appendChild($newLi)
    this._reIndex()
  }
  // right leave
  pop () {
    if (this._arr.length === 0) return false
    const $last = this._arr[ this._arr.length - 1 ]

    $last.remove()
    this._arr.pop()
    this._reIndex()
    return true
  }
  // left leave
  shift () {
    if (this._arr.length === 0) return false
    const $first = this._arr[0]

    $first.remove()
    this._arr.shift()
    this._reIndex()
    return true
  }
  // left enter
  unshift (num) {
    const
      $newLi = this._renderLi(num),
      $first = this._$wrap.firstChild

    this._arr.unshift($newLi)
    this._$wrap.insertBefore($newLi, $first)
    this._reIndex()
  }
  // 删除指定 index 的队列元素 : dom(点击的元素)
  remove ($curLiDom) {
    const index = $curLiDom.getAttribute(this._Indexmark)

    this._arr[index].remove()
    this._arr.splice(index, 1)
    this._reIndex()
  }
  // 生成初始队列
  init (arr) {
    if ( ! is_array(arr)) return
    if ( ! arr.length > 0) return

    this._arr = arr.map(a => parseInt(a))
      .filter(n => is_number(n))
      .map((n, index) => this._renderLi(n, index))

    this._arr.forEach($el => this._$wrap.appendChild($el))
    this._index = this._arr.length
  }
}
// END ----------------------------- Queue Class -----------------------------


// 启动
window.onload = function () {
  const
    liQueue = new Queue('#show'),
    getNum  = getInputValueNum('#text') // 获取输入的数字

  // 生成初始队列
  liQueue.init([1,2,3])

  // 事件函数
  // left enter
  const bindLeftEnterEvent = function () {
    var num = getNum()
    if (num) liQueue.unshift(num)
  }
  // right enter
  const bindRightEnterEvent = function () {
    var num = getNum()
    if (num) liQueue.push(num)
  }
  // left leave
  const bindLeftLeaveEvent = function () {
    if ( ! liQueue.shift())
      alert('没有可删除的元素了')
  }
  // right leave
  const bindRightLeaveEvent = function () {
    if ( ! liQueue.pop())
      alert('没有可删除的元素了')
  }

  const bindLiLeaveEvent = function (ev) {
    if ( ! ev.target || ! (ev.target.nodeName === 'LI')) return
    liQueue.remove(ev.target)
  }

  // 绑定事件
  bindClick('#left_enter',  bindLeftEnterEvent)
  bindClick('#right_enter', bindRightEnterEvent)
  bindClick('#left_leave',  bindLeftLeaveEvent)
  bindClick('#right_leave', bindRightLeaveEvent)
  bindClick('#show',        bindLiLeaveEvent)
}
