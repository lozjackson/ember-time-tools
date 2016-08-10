import { compareJson } from 'dummy/helpers/compare-json';
import { module, test } from 'qunit';

module('Unit | Helper | compare json');

// Replace this with your real tests.
test('it works', function(assert) {
  let a = { foo: 1, bar: 2 };
  assert.equal(compareJson([a, { foo: 1, bar: 2 }]), true);

  assert.equal(compareJson([a, { foo: 2, bar: 1 }]), false);
});
