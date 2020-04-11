function callOrReturn(functionOrObj, number) {
  return typeof functionOrObj === 'function' ? functionOrObj(number) : functionOrObj
}

export default class Plural {
  static Builder = class Builder {
    zero(word) {
      this.zeroWord = word
      return this
    }

    other(word) {
      this.otherWord = word
      return this
    }

    build() {
      return new Plural(this)
    }
  }

  constructor(builder) {
    this.zero = builder.zeroWord
    this.other = builder.otherWord
  }

  get(number) {
    if (number === 0) return callOrReturn(this.zero, number)
    return callOrReturn(this.other, number)
  }
}
