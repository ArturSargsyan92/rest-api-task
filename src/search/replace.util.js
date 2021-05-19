const defMaxError = 2

class ReplaceUtil {
  static match (src, input, maxError = defMaxError) {
    if (!ReplaceUtil.need(src, input)) return false
    const n = src.length
    let e = 0
    for (let i = 0; i < n && e <= maxError; ++i) {
      if (src[i] !== input[i]) e++
    }
    return e <= maxError
  }

  static need (src, input) {
    return src.length === input.length
  }
}

module.exports = ReplaceUtil
