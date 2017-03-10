// dom 内容转换文档碎片,最外层标签会清除
const $ = selector => document.querySelector(selector)
// 生成元素 === jQuery('<div>...</div>')
const cElm = html => {
  const oDiv = document.createElement('div')

  oDiv.innerHTML = html
  return oDiv.children[0]
}
