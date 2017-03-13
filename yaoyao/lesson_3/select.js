// 模板函数 (每个选项)
const _renderLi = listData => listData.map(li => `
  <li class="select__li" data-id="${li.id}">${li.text}</li>
`).join('')
// 模板函数 有分组的选项列表
const _renderHasTitleLi = listData => listData.map(li => {
    if ( ! li.title)
      return `<li class="select__li" data-id="${li.id}">${li.text}</li>`
    return `
      <li>
        <span class="select__title">${li.title}</span>
        <ul data-title="${li.title}">
          ${_renderLi(li.children)}
        </ul>
      </li>
    `
}).join('')
// 模板函数 (包装)
const _renderSelect = config => cElm(`
  <div class="m-form-select">
    <div class="select__input">
      <span class="select__text">${config.text}</span>
      <i class="select__icon"></i>
    </div>
    <ul class="select__list">
      ${config.hasTitle ? _renderHasTitleLi(config.listData) : _renderLi(config.listData)}
    </ul>
  </div>
`)

class Select {
  constructor(selector, opts) {
    // 配置
    this.$el = $(selector)
    let defaultOpts = {
        text: '全部',     // 未选择时默认的标题
        listData: [],    // 数据
        hasTitle: false, // 有分组的选择列表
        width: ''        // 宽度
    }

    this.config = Object.assign({}, defaultOpts, opts) // 最终配置
    this._bindDom()
    this._bindEvent()
    // 挂载
    this.$el.innerHTML = ''
    this.$el.appendChild(this.$wrap)
  }
  // 生成 dom
  _bindDom() {
    this.$wrap  = _renderSelect(this.config)
    this.$input = this.$wrap.querySelector('.select__input')
    this.$text  = this.$wrap.querySelector('.select__text')
    this.$ul    = this.$wrap.querySelector('.select__list')
    this.$li    = this.$wrap.querySelector('.select__list .select__li')

    this.$wrap.style.width = `${this.config.width}px`
  }
  // 绑定事件
  _bindEvent() {
    this.$input.addEventListener('click', ev => {
      this.$ul.style.display = this.$ul.style.display === 'block' ? 'none' : 'block'
      ev.stopPropagation()
    })
    $('body').addEventListener('click', () => { // 点击 body 隐藏 select
      this.$ul.style.display = 'none'
    })
    this.$ul.addEventListener('click', ev => {
      if ( ! ev.target || ! (ev.target.nodeName === 'LI')) return

      let id    = ev.target.getAttribute('data-id'),
          text  = ev.target.textContent,
          title = this.$ul.getAttribute('data-title')
      this.$text.textContent = text
      this.config.onSelect && this.config.onSelect(id, text, title)
      this.$ul.style.display = this.$ul.style.display === 'block' ? 'none' : 'block'
    })
  }
}
