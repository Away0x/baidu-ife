class List {
  constructor (config) {
    this._Indexmark = 'data-index'           // 占位属性
    this._$wrap     = $(config.wrapSelector) // 队列容器
    this._arr       = []                     // 所有行的文字内容
    this._domLi     = []                     // 所有行 dom
    this._domB      = []                     // 所有 b dom
  }
  // 生成 b : Number -> return dom(html b)
  _renderB (str) {
    return createElm('b', str)
  }
  // 生成 li : Number -> return dom(html li)
  _renderLi (str, index=0) {
    const
      $li = createElm('li'),
      b_domArr = []

    $li.setAttribute('active-count', 0)
    $li.setAttribute('title', '匹配数 0')
    str.split('')
      .map(s => this._renderB(s))
      .map($b => b_domArr.push($b)   && $b)
      .map($b => this._domB.push($b) && $b)
      .forEach($b => $li.appendChild($b))

    this._domLi.push($li)
    return $li
  }
  // 生成 list : Array -> return dom(html list)
  _renderList () {
    this._$wrap.innerHTML = ''
    this._domLi = []
    this._domB = []
    this._arr
      .map(s => String(s))
      .map(s => s.trim())
      .filter(s => s.length)
      .map(s => this._renderLi(s))
      .forEach($li => this._$wrap.appendChild($li))
  }
  // 匹配内容多的 li 位置会提升
  _sorList () {
    const intAttr = $el => parseInt( $el.getAttribute('active-count') )

    this._$wrap.innerHTML = ''
    this._domLi
      .map($li => {
          const activeBCount = [].filter.call($li.children, $b => $b.className === 'active').length

          $li.setAttribute('active-count', activeBCount)
          $li.setAttribute('title', `匹配数 ${activeBCount}`)
          return $li
      })
      .sort((a, b) => intAttr(b) - intAttr(a))
      .forEach($li => this._$wrap.appendChild($li))
  }
  //
  eachAllBTextEqualInput (str) {
    this._domB.forEach($b => $b.className = ($b.textContent === str) ? 'active' : '')
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
