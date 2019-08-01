# simple-state-shot

[![Build Status](https://travis-ci.org/namelessman/simple-state-shot.svg?branch=master)](https://travis-ci.org/namelessman/simple-state-shot)
[![Coverage Status](https://coveralls.io/repos/github/namelessman/simple-state-shot/badge.svg?branch=master)](https://coveralls.io/github/namelessman/simple-state-shot?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


a simple state history manager

## Getting Started

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
npm i simple-state-shot
```

### Basic Usage

```
import SimpleStateShot from 'simple-state-shot';

const simpleStateShot = new SimpleStateShot();

const firstState = {foo: 1};

simpleStateShot.push(firstState);
simpleStateShot.get();  // {foo: 1}
simpleStateShot.undo().get();   // null
simpleStateShot.redo().get();   // {foo: 1}
```

## API

### options
- `maxLength` - How many state the manager will store. **strongly recommend to set this param to prevent memory leak**
```
const simpleStateShot = new SimpleStateShot(10)
```
### push
push a new state to the stack
**note: `undefined` won't be pushed**

### get
get the last state. if no state in the stack, `null` will be returned

### undo
undo the last state. if no state in the stack, `null` will be returned

### redo
redo the last undo state.

### length
the states length of current instance

### reset
reset stack

### hasUndo、hasRedo
whether current state has a before/after state

## License

This project is licensed under the MIT License.

Inspired by [StateShot](https://github.com/gaoding-inc/stateshot)