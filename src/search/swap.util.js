const defMaxError = 2

class SwapUtil {
  static match (src, input, maxError = defMaxError) {
    if (!SwapUtil.need(src, input)) return false
    const n = src.length - 1
    let e = 0

    for (let i = 0; i < n && e <= maxError; ++i) {
      if (src[i] !== input[i]) {
        if (src[i] === input[i + 1] && src[i + 1] === input[i]) {
          ++e
          ++i
        } else {
          return false
        }
      }
    }
    return e <= maxError
  }

  static need (src, input) {
    return src.length === input.length
  }
}

module.exports = SwapUtil
