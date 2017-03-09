// 获取字符长度 (中文长度为 2)
const getCharLength = str =>
  String(str).trim().split('')
    .map(s => s.charCodeAt())
    .map(n => (n < 0 || n > 255) ? 'aa' : 'a') // 中文占两字符, 其他一字符
    .join('')
    .length

// 各个表单验证器
const Validators = {
  // 必填(不能为空)
  required: (str='', {message=''}={}) =>
  ({
    status: ! (getCharLength(str) === 0),
    message // 错误信息
  }),

  // 区间长度
  minAndMax: (str='', { min=0, max=0, message=''}={}) => {
    const len = getCharLength(str)

    return {
      status: ! (len < min || len > max),
      message
    }
  },

  // 和某表单的 value 相同
  equalOtherValue: (str='', {otherForm='', message=''}={}) =>
  ({
    status: (str === document.querySelector(otherForm).value),
    message
  }),

  // 邮箱
  email: (str='', {message=''}={}) =>
  ({
    status: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(str),
    message
  }),

  // 手机号
  tel: (str='', {message=''}={}) =>
  ({
    status: /^1[3|4|5|7|8][0-9]{9}$/.test(str),
    message
  })
}
