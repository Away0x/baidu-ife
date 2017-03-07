// 获取 dom
const $ = selector =>
  selector.indexOf('#') !== -1
  ? document.querySelector(selector)    // dom
  : document.querySelectorAll(selector) // [dom, dom ...]

// 创建标签
const createElm = (tag, text) => {
  const $elm = document.createElement(tag)

  $elm.textContent = text
  return $elm
}

// 数组去重
const uniqueArr = arr => {
  let res = [], json = {}, len = arr.length

  for (let i = 0; i< len; i++) {
    const item = arr[i]
    if ( ! json[item]) {
      res.push(item)
      json[item] = 1
    }
  }
  return res
}


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
    if (num > 100 || num < 10) {
      alert('请输入10~100的数字')
      return false
    }
    return num
  }
}
// 空函数
const noop = () => {}
// 复制数组
const copyArray = arr => arr.slice()

// 堵塞线程
const sleep = d => {
  for (let t = Date.now(); Date.now() - t <= d;) {}
}
