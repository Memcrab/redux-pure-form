import { FIELD_ON_CHANGE } from './action-types.js';

// ensure the keys being passed is an array of key paths
// example: 'a.b' becomes ['a', 'b'] unless it was already ['a', 'b']
const keys = ks => (Array.isArray(ks) ? ks : ks.split('.'));

// traverse the set of keys left to right,
// returning the current value in each iteration.
// if at any point the value for the current key does not exist,
// return the default value
const deepGet = (o, kp, d) => keys(kp).reduce((o, k) => o && o[k] || d, o);

/**
 * traverse the set of keys right to left,
 * returning a new object containing both properties from the object
 * we were originally passed and our new property.
 * Example:
 * If o = { a: { b: { c: 1 } } }
 * deepSet(o, ['a', 'b', 'c'], 2) will progress thus:
 * 1. c = Object.assign({}, {c: 1}, { c: 2 })
 * 2. b = Object.assign({}, { b: { c: 1 } }, { b: c })
 * 3. returned = Object.assign({}, { a: { b: { c: 1 } } }, { a: b })
 * @param  {object} o  [description]
 * @param  {string} kp [description]
 * @param  {any} v     [description]
 * @return {object}    [description]
 */
const deepSet = (o, kp, v) =>
  keys(kp).reduceRight((v, k, i, ks) =>
    Object.assign({}, deepGet(o, ks.slice(0, i)), { [k]: v }), v);


function getComplexValue(value) {
  if (typeof value === 'object' && typeof value.value !== 'undefined') {
    return value.value;
  }
  return value;
}

export default function formReducer(state = {}, action) {
  switch (action.type) {
    case FIELD_ON_CHANGE:
      let newState = state;
      Object.keys(action.payload).forEach((name) => {
        newState = deepSet(newState, name, getComplexValue(action.payload[name]));
      });
      return newState;
    default:
      return state;
  }
}
