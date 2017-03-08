class List {
  constructor (config) {
    this._Indexmark = 'data-index'           // 占位属性
    this._$wrap     = $(config.wrapSelector) // 队列容器
    this._arr       = []                     // 所有行的文字内容
    this._domLi     = []                     // 所有行 dom
  }
  // 生成 li : Number -> return dom(html li)
  _renderLi (str, index=0) {
    const $li = createElm('li', str)

    $li.setAttribute('active-count', 0)
    $li.setAttribute('title', '匹配数 0')
    this._domLi.push($li)
    return $li
  }
  // 生成 list : Array -> return dom(html list)
  _renderList () {
    this._$wrap.innerHTML = ''
    this._domLi = []
    this._arr
      .map(s => String(s))
      .map(s => s.trim())
      .filter(s => s.length)
      .map(s => this._renderLi(s))
      .forEach($li => this._$wrap.appendChild($li))
  }
  // 匹配内容多的 li 位置会提升
  _sorList () {
    const
      intAttr = $el => parseInt( $el.getAttribute('active-count') )
    let matchListCount = 0

    this._$wrap.innerHTML = ''
    this._domLi
      .map($li => {
          const activeBCount = $li.children.length

          $li.setAttribute('active-count', activeBCount)
          $li.setAttribute('title', `匹配数 ${activeBCount}`)
          if (activeBCount) matchListCount += 1
          return $li
      })
      .sort((a, b) => intAttr(b) - intAttr(a))
      .forEach($li => this._$wrap.appendChild($li))

    if (matchListCount === 0)
      alert('没有匹配到的文本')
  }
  // 匹配文本
  eachAllBTextEqualInput (str) {
    this._domLi.forEach($li => {
      $li.innerHTML = $li.innerHTML.replace(new RegExp(str, 'g'), `<b>${str}</b>`)
    })
    this._sorList()
  }
  push (str) {
    this._arr.push(str)
    this.init()
    return str
  }
  // 生成初始列表
  init (arr) {
    this._arr = arr ? arr : this._arr
    this._renderList()
  }
}
