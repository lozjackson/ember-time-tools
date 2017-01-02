import getDaysInMonth from 'dummy/utils/get-days-in-month';
import { module, test } from 'qunit';

module('Unit | Utility | get days in month');

test('it works', function(assert) {
  assert.equal(getDaysInMonth({year: 2015, month: 1}), 28, `Feb 2015 should be 28 days`);
  assert.equal(getDaysInMonth({year: 2015, month: 10}), 30, `November 2015 should be 30 days`);
  assert.equal(getDaysInMonth({year: 2016, month: 1}), 29, `Feb 2016 should be 29 days`);
  assert.equal(getDaysInMonth({year: 2016, month: 3}), 30, `April 2016 should be 30 days`);
  assert.equal(getDaysInMonth({year: 2016, month: 4}), 31, `May 2016 should be 31 days`);
});
