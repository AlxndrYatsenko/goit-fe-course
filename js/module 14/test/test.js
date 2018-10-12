const assert = require('chai').assert;
import Model from '../src/js/model';
const model = new Model();

const url = 'https://www.google.com.ua'

const isValidResult = model.isValid(url);

describe('Model', () => {

  it('isValid should return true', () => {
    assert.isTrue(isValidResult, 'result is true')
  })

  it('isValid should return true', () => {
    assert.isBoolean(isValidResult, 'result is true')
  })
})
