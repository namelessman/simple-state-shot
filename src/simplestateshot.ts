/*
 * @Author: namelessman
 * @Date: 2019-08-01 00:12:21
 * @LastEditors: namelessman
 * @LastEditTime: 2019-08-09 09:30:28
 */
class SimpleStateShot {
  constructor(private _maxLength?: number) {
    this._states = []
    this._index = -1
    this._maxLength = _maxLength
  }

  private _states: any[]
  private _index: number

  get() {
    if (this._index > -1) {
      return JSON.parse(this._states[this._index])
    }
    return null
  }

  push(state: any): SimpleStateShot {
    // don't push if equal with current state
    if (JSON.stringify(state) === JSON.stringify(this.get())) {
      return this
    }
    this._index++
    this._states[this._index] = JSON.stringify(state)

    if (this._maxLength && this._index >= this._maxLength) {
      const leftToDrop = this._index - this._maxLength + 1
      this._states.splice(0, leftToDrop)
      this._index = this._index - (this._index - this._maxLength + 1)
    }

    // clear redo stack
    this._states.length = this._index + 1

    return this
  }

  get hasUndo(): boolean {
    return this._index > 0
  }

  get hasRedo(): boolean {
    if (this._index === this._states.length - 1) {
      return false
    }

    return true
  }

  undo(): SimpleStateShot {
    if (this.hasUndo) {
      this._index--
    }

    return this
  }

  redo(): SimpleStateShot {
    if (this.hasRedo) {
      this._index++
    }

    return this
  }

  reset(): SimpleStateShot {
    this._index = -1
    this._states = []

    return this
  }

  get length(): number {
    return this._index + 1
  }
}

export default SimpleStateShot
