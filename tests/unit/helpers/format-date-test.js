import { formatDate } from 'dummy/helpers/format-date';
import { module, test } from 'qunit';

module('Unit | Helper | format date');

test('format date-and-time', function(assert) {
  let date = new Date(1977,7,24,8,30).getTime();
  assert.equal(formatDate([date, 'date-and-time']), '24/08/1977 8:30 am');
});

test('format date-with-day', function(assert) {
  let date = new Date(1977,7,24,8,30).getTime();
  assert.equal(formatDate([date, 'date-with-day']), 'Wed 24/08/1977');
});

test('format short', function(assert) {
  let date = new Date(1977,7,24,8,30).getTime();
  assert.equal(formatDate([date, 'short']), '24/08/1977');
});

test('format standard', function(assert) {

  let date = new Date(1977,7,24,8,30).getTime();
  assert.equal(formatDate([date, 'standard']), 'Wed 24th, Aug 1977');

  date = new Date(1977,7,1,8,30).getTime();
  assert.equal(formatDate([date, 'standard']), 'Mon 1st, Aug 1977');
});

test('format time', function(assert) {
  let date = new Date(1977,7,24,15,30).getTime();
  assert.equal(formatDate([date, 'time']), '3:30 pm');
});

test('format default', function(assert) {
  let date = new Date(1977,7,24,8,30).getTime();
  assert.equal(formatDate([date]), '24/08/1977');
});
