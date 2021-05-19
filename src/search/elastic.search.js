const ReplaceUtil = require('./replace.util')
const DeleteUtil = require('./delete.util')
const SwapUtil = require('./swap.util')
const PrefixUtil = require('./prefix.util')

class ElasticSearch {
  static match (input, data, maxError) {
    return input === data ||
      ReplaceUtil.match(input, data, maxError) ||
      DeleteUtil.match(input, data, maxError) ||
      DeleteUtil.match(data, input, maxError) ||
      SwapUtil.match(data, input, maxError) ||
      PrefixUtil.match(data, input, maxError)
  }

  static search (data, input) {
    const maxError = 2
    return data.filter(d => ElasticSearch.match(input, d.key, maxError))
  }
}

module.exports = ElasticSearch
