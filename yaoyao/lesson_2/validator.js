const $ = selector => document.querySelector(selector)

// 验证类
class Validator {
  constructor (config) {
    this._validatorConfig = config.validatorConfig
    this._targetConfig    = config.targetConfig
    this._allTarget       = this._targetConfig.map(config => config.target)
  }
  // 验证逻辑
  _check (config) {
    const
      validatorCfg  = this._validatorConfig,
      $target       = $(config.target),
      val           = $target.value,
      $message      = $(config.message.target),
      ownValidators = config.validators,
      result        = []

    let required = false // 不是必填项的话，只在有输入内容时进行检查 (默认为不必填)

    // 遍历执行验证器
    ownValidators.forEach(validator => {
      if (validator.name == 'required') required = true // 必填

      const temp = Validators[validator.name](val, validator.args) // 执行验证器

      if ( ! temp.status)
        result.push( temp.message )
    })

    if ( ! required && val.length === 0) return // 可跳过检验

    if (result.length > 0) { // 有错误信息
      validatorCfg.error && validatorCfg.error($target) // 失败回调
      $message.textContent = result[0]
    }
    else { // 验证通过
      validatorCfg.success && validatorCfg.success($target) // 成功回调
      $message.textContent = config.message.success || ''
    }
  }
  // 单个验证 需传入要验证 input 的 id
  run (target) {
    // 得到当前要验证的表单的配置
    const curConfig = this._targetConfig.filter(config => config.target === `#${target}`)[0]

    this._check(curConfig)
  }
  // 执行全局验证
  runAll () {
    this._targetConfig.forEach(this._check.bind(this))
  }
  // 重置表单
  reset () {
    this._targetConfig.forEach(config => {
      const
        $target  = $(config.target),
        $message = $(config.message.target)

      $target.value        = ''
      $message.textContent = config.message.placeholder || ''
    })
    this._validatorConfig.reset( this._allTarget ) // 重置回调
  }
}
