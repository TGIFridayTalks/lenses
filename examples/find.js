const { Lens } = require('lorgnette/dist/lens')
const { just, nothing } = require('lorgnette')

export class ArrayFindLens extends Lens {
  constructor(criteria) {
    super()
    this.criteria = criteria
  }

  get(obj) {
    if (obj instanceof Array) {
      const value = obj.find(this.criteria)

      if (typeof value !== 'undefined') {
        return just(value)
      }

      return nothing
    }

    return nothing
  }

  update(obj, func) {
    let updated = obj

    if (this.criteria !== null && obj instanceof Array) {
      let index = obj.findIndex(this.criteria)
      let oldVal = obj[index]
      let newVal = func(oldVal)

      if (oldVal !== newVal) {
        updated = obj.slice()
        updated[index] = newVal
      }
    }

    return updated
  }
}
