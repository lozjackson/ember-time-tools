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

test('format - pass in a format', function(assert) {
  let date = new Date(1977,7,24,8,30).getTime();
  assert.equal(formatDate([date, 'DD/MM/YYYY']), '24/08/1977');
  assert.equal(formatDate([date, 'ddd DD/MM/YYYY']), 'Wed 24/08/1977');
});

test('format default', function(assert) {
  let date = new Date(1977,7,24,8,30).getTime();
  assert.equal(formatDate([date]), '24/08/1977');
});

test('undefined values should result in undefined value', function(assert) {
  let _undefined;
  assert.equal(formatDate([_undefined]), _undefined);
});

test('null values should result in undefined value', function(assert) {
  let _undefined;
  assert.equal(formatDate([null]), _undefined);
});
