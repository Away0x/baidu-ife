// 各种模板
const simpleOrTemplate = config => {
  if (config.type === 'simple')
    return (`
      <div class="simple-container">
        <p>${config.description}</p>
      </div>
    `)
  if (config.type === 'template')
    return (`
      <div class="template-container"></div>
    `)
}

const _renderBtn = config => {
  if (config.btn === 2)
    return (`
      <div class="btn-wrapper">
        <div class="inner">
          <button class="button JS-confirm" type="button">${config.confirmTitle}</button>
          <button class="button JS-close" type="button">${config.closeTitle}</button>
        </div>
      </div>
    `)
  else if (config.btn === 1)
    return (`
      <div class="btn-wrapper">
        <div class="inner">
          <button class="button one JS-confirm" type="button">${config.confirmTitle}</button>
        </div>
      </div>
    `)
  else if (config.btn === 0)
    return ''
  return ''
}

const _renderBody = config => cElm(`
  <div class="m-customDialog">
    <div class="m-customDialog__header">
      <h3>${config.title}</h3>
      <i class="m-customDialog__close JS-close"></i>
    </div>
    <div class="m-customDialog__body">
      ${simpleOrTemplate(config)}
    </div>
    ${_renderBtn(config)}
  </div>
`)

const _renderMask = () => cElm(`
  <div class="m-dialogMask"></div>
`)

class CustomDialog {
  constructor(config) {
    const _defaultConfig = {
      wrapper: 'body',
      width: 300,
      top: '',
      type: 'simple', // template
      template: null,
      hasMask: true,
      title: '提示',
      confirmTitle: '是',
      closeTitle: '否',
      description: '这是一个 simple 弹窗',
      confirmCallback: null,
      btn: 2 // 0 1 2
    }
    // 合并配置
    this.config = Object.assign({}, _defaultConfig, config)

    this._bindDom()
    this._bindStyle()
    this._bindEvent()
  }
  // 生成 dom 主逻辑
  _bindDom() {
    this.$wrap    = _renderBody(this.config)
    this.$header  = this.$wrap.querySelector('.m-customDialog__header')
    this.$body    = this.$wrap.querySelector('.m-customDialog__body')
    this.$close   = this.$wrap.querySelector('.JS-close')
    this.$confirm = this.$wrap.querySelector('.JS-confirm')

    if (this.config.type === 'template') {
      this.$tplContainer = this.$wrap.querySelector('.template-container')
      this.$tplContainer.appendChild( this.config.template )
    }

    if (this.config.hasMask)
      this.$mask = _renderMask()
  }
  // 设置弹窗样式
  _bindStyle() {
    this.$wrap.style.setProperty('width', `${this.config.width}px`)
    if (this.config.type === 'simple')
      this.$body.classList.add('simple__body')
  }
  // 绑定弹窗事件
  _bindEvent() {
    this.$wrap.addEventListener('click', ev => {
      if (ev.target.classList.contains('JS-close')) {
        this.close(ev)
        this.config.confirmCallback && this.config.confirmCallback(false)
      }

      if (ev.target.classList.contains('JS-confirm')) {
        this.close(ev)
        this.config.confirmCallback && this.config.confirmCallback(true)
      }
      ev.stopPropagation()
    })

  }
  // 根据屏幕和弹窗的宽高修正弹窗显示的位置
  _editPosition() {
    const
      width  = parseInt(this.$wrap.style.width),
      height = parseInt(this.$wrap.style.height) || 170

    this.margin = {
      top:  0 - height / 2,
      left: 0 - width / 2
    }
    this.$wrap.style.setProperty('top',  this.config.top || `${document.documentElement.clientHeight / 2}px`)
    this.$wrap.style.setProperty('left', `${document.documentElement.clientWidth  / 2}px`)
    this.$wrap.style.setProperty('margin-top',  `${this.margin.top}px`)
    this.$wrap.style.setProperty('margin-left', `${this.margin.left}px`)
  }
  // 关闭弹窗
  close() {
    if (this.config.hasMask)
      this.$mask.remove()
    this.$wrap.remove()
  }
  // 打开并在delay毫秒后关闭
  openAndClose (delay) {
    if ( ! delay) return
    // 打开
    this.open()
    // 关闭
    setTimeout(() => this.close(), parseInt(delay))
  }
  // 显示弹窗
  open() {
    this._editPosition()
    $(this.config.wrapper).appendChild(this.$wrap)
    if (this.config.hasMask)
      $('body').appendChild( this.$mask )
    this._drag()
  }
  // 拖拽
  _drag() {
    let
      left = 0, top  = 0,
      curX = 0, curY = 0,
      disX = 0, disY = 0

    // 先 bind 完，之后才可用 removeEventListener 解绑事件
    const
      thisMousedownHandler = mousedownHandler.bind(this),
      thisMousemoveHandler = mousemoveHandler.bind(this),
      thisMouseupHandler   = mouseupHandler.bind(this)

    this.$header.addEventListener('mousedown', thisMousedownHandler)
    // 鼠标按下事件处理函数 (开始移动)
    function mousedownHandler (ev) {
      if (ev.target.classList.contains('m-customDialog__header')) {
        curX = ev.pageX
        curY = ev.pageY
        left = parseInt(this.$wrap.style.left)
        top  = parseInt(this.$wrap.style.top)
        disX = curX - left
        disY = curY - top

        document.addEventListener('mousemove', thisMousemoveHandler)
      }
      this.$header.addEventListener('mouseup', thisMouseupHandler)
      ev.stopPropagation()
    }
    // 鼠标移动事件处理函数 (移动ing)
    function mousemoveHandler (ev) {
      const
        // 鼠标位置
        nowCurX = ev.pageX,
        nowCurY = ev.pageY,
        // 窗口
        windowWidth  = document.documentElement.clientWidth,
        windowHeight = document.documentElement.clientHeight,
        // margin
        marginLeft = this.margin.left,
        marginTop  = this.margin.top,
        // 元素
        width  = parseInt(this.$wrap.style.width),
        height = parseInt(this.$wrap.style.height),
        // 滚动条
        scrollWidth = 2, // 滚动条宽度
        // 元素在窗口中位置 (补丁)
        elmInWindowLeft   = 0 - marginLeft,
        elmInWindowRight  = windowWidth - width - marginLeft,
        elmInWindowTop    = 0 - marginTop,
        elmInWindowBottom = windowHeight - height - marginTop

      // 位置
      left = nowCurX - disX
      top  = nowCurY - disY

      // 根据条件计算最终 top 和 left
      if (left <= elmInWindowLeft)
        left = elmInWindowLeft
      else if ( left >=( elmInWindowRight - scrollWidth) )
        left = (elmInWindowRight - scrollWidth)

      if (top <= elmInWindowTop)
        top = elmInWindowTop
      else if ( top >= elmInWindowBottom ) {
        if ( ! (windowHeight < (height - marginTop)) ) // 元素不比窗口高时
          top = elmInWindowBottom
      }

      this.$wrap.style.setProperty('left', `${left}px`)
      this.$wrap.style.setProperty('top',  `${top}px`)
      ev.stopPropagation()
    }
    // 鼠标抬起事件处理函数 (解绑事件)
    function mouseupHandler (ev) {
      document.removeEventListener('mousemove', thisMousemoveHandler)
      this.$header.removeEventListener('mouseup', thisMouseupHandler)
      ev.stopPropagation()
    }
  }
}
