const defMaxError = 2

class SwapUtil {
  static match (src, input, maxError = defMaxError) {
    return src.startsWith(input) || input.startsWith(src)
  }
}

module.exports = SwapUtil
