// NPM modules
const jimp = require('jimp')

class ImageUtil {
  static getOutputSize (sz, dstSize) {
    const size = (sz.width > sz.height) ? dstSize : { width: dstSize.height, height: dstSize.width }
    const yScale = size.height / sz.height
    const xScale = size.width / sz.width
    if (Math.min(yScale, xScale) > 1.0) return sz
    return (xScale < yScale) ? { width: size.width, height: Math.round(sz.height * xScale) }
      : { width: Math.round(sz.width * yScale), height: size.height }
  }

  static async resize (buffer, dstSize) {
    try {
      const file = await jimp.read(buffer)
      const dimensions = ImageUtil.getOutputSize(file.bitmap, dstSize)
      await file.resize(dimensions.width, dimensions.height)
      const buf = await file.getBufferAsync(file._originalMime)
      dimensions.type = dstSize.type
      return {
        buffer: buf,
        dimensions
      }
    } catch (err) {
      return { buffer }
    }
  }
}

module.exports = ImageUtil
