const defMaxError = 2

class DeleteUtil {
  static match (src, input, maxError = defMaxError) {
    if (!DeleteUtil.need(src, input, maxError)) return false

    let e = 0
    let j = 0
    const n = input.length

    let i = 0
    const m = src.length

    while (e <= maxError && j < n && i < m) {
      if (src[i] === input[j]) {
        j++
      } else {
        e++
      }
      i++
    }
    e += n - j
    e += m - i

    return e <= maxError
  }

  static need (src, input, maxError) {
    const diff = src.length - input.length
    return diff <= maxError && diff >= 0
  }
}

module.exports = DeleteUtil
