import SimpleStateShot from '../src/simplestateshot'

const testState = { foo: 1 }

describe('init & get test', () => {
  it('initial state should be []', () => {
    const simpleStateShot = new SimpleStateShot()

    expect(simpleStateShot.get()).toBeNull()
  })
})

describe('push test', () => {
  it('state should be pushed', () => {
    const simpleStateShot = new SimpleStateShot()

    expect(simpleStateShot.push(0).get()).toBe(0)
    expect(simpleStateShot.push(0).length).toBe(1)
    expect(simpleStateShot.push(testState).get()).toEqual(testState)
  })
})

describe('undo test', () => {
  it('the newest state should be popped', () => {
    const simpleStateShot = new SimpleStateShot()

    expect(simpleStateShot.undo().get()).toBeNull()
    expect(
      simpleStateShot
        .push(0)
        .undo()
        .get()
    ).toBe(0) // the first state can not be popped
    expect(simpleStateShot.redo().get()).toBe(0)

    expect(
      simpleStateShot
        .redo()
        .push(1)
        .undo()
        .get()
    ).toBe(0)
  })
})

describe('redo test', () => {
  it('state should redo', () => {
    const simpleStateShot = new SimpleStateShot()

    expect(simpleStateShot.hasRedo).toBeFalsy()
    expect(
      simpleStateShot
        .push(0)
        .push(1)
        .undo().hasRedo
    ).toBeTruthy()
    expect(simpleStateShot.redo().get()).toBe(1)
  })
})

test('clear redo stack', () => {
  const simpleStateShot = new SimpleStateShot()

  for (let i = 0; i < 10; i++) {
    simpleStateShot.push(i)
  }
  for (let i = 0; i < 5; i++) {
    simpleStateShot.undo()
  }
  simpleStateShot.push(testState)

  expect(simpleStateShot.length).toBe(6)
  expect(simpleStateShot.hasUndo).toBeTruthy()
  expect(simpleStateShot.hasRedo).toBeFalsy()
})

describe('reset test', () => {
  it('states should be reset', () => {
    const simpleStateShot = new SimpleStateShot()

    expect(simpleStateShot.push(0).get()).toBe(0)
    expect(simpleStateShot.reset().get()).toBeNull()
  })
})

describe('support maxLength', () => {
  it('length of states should no more than 3', () => {
    const simpleStateShot = new SimpleStateShot(3)

    for (let i = 0; i < 10; i++) {
      simpleStateShot.push(i)
    }

    expect(simpleStateShot.get()).toBe(9)
    expect(simpleStateShot.length).toBe(3)
  })
})
