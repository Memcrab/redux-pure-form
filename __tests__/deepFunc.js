/* eslint-disable */
const keys = keys => (Array.isArray(keys) ? keys : keys.split('.'));

test('splitting string', () => {
  expect(keys('f.a.c')[0]).toBe('f');
})

const deepGet = (obj, ks, def) =>
  keys(ks).reduce((obj, key) => obj && obj[key] || def, obj);

test('returning deep get value', () => {
  const O = {a: {b: {c: {e:5}}}}
  expect(deepGet(O, 'a.b.c.e')).toBe(5);
})

const deepSet = (obj, ks, val) =>
  keys(ks).reduceRight((val, key, i, ks) =>
    Object.assign({}, deepGet(obj, ks.slice(0, i)), { [key]: val }), val);

test('returning updated object with deep set value', () => {
  const O = {a: {b: {c: {e:5}}}}
  expect(deepSet(O, 'a.b.c.e', 3)).not.toEqual(Object.assign({}, O.a.b.c, {e: 3}));
})