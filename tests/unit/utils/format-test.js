import EmberObject from '@ember/object';
import format from 'dummy/utils/format';
import { module, test } from 'qunit';

module('Unit | Utility | format');

test('_format() method, undefined format, passes date', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  assert.deepEqual(format(date), date);
});

test('_format() method, undefined format, converts timestamp to date', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let timestamp = date.getTime();
  assert.deepEqual(format(timestamp), date);
});

test('_format() method, undefined format, converts object to date', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let obj = EmberObject.create({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate(), hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() });
  assert.deepEqual(format(obj), date);
});

test('_format() method, format=date, passes date', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  assert.deepEqual(format(date, 'date'), date);
});

test('_format() method, format=date, converts timestamp to date', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let timestamp = date.getTime();
  assert.deepEqual(format(timestamp, 'date'), date);
});

test('_format() method, format=date, converts object to date', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let obj = EmberObject.create({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate(), hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() });
  assert.deepEqual(format(obj, 'date'), date);
});

test('_format() method, format=timestamp, passes timestamp', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let timestamp = date.getTime();
  assert.equal(format(timestamp, 'timestamp'), timestamp);
});

test('_format() method, format=timestamp, converts date to timestamp', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let timestamp = date.getTime();
  assert.equal(format(date, 'timestamp'), timestamp);
});

test('_format() method, format=timestamp, converts object to timestamp', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let obj = EmberObject.create({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate(), hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() });
  let timestamp = date.getTime();
  assert.equal(format(obj, 'timestamp'), timestamp);
});

test('_format() method, format=object, passes object', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let obj = EmberObject.create({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate(), hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() });
  assert.deepEqual(format(obj, 'object'), obj);
});

test('_format() method, format=object, converts date to object', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let obj = EmberObject.create({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate(), hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() });
  assert.deepEqual(format(date, 'object'), obj);
});

test('_format() method, format=object, converts timestamp to object', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let obj = EmberObject.create({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate(), hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() });
  let timestamp = date.getTime();
  assert.deepEqual(format(timestamp, 'object'), obj);
});

test('_format() method, format=YYYY-MM-DD', function(assert) {
  assert.expect(1);
  assert.equal(format('1977-08-24', 'YYYY-MM-DD'), '1977-08-24');
});

test('_format() method, format=YYYY-MM-DD, converts date', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  assert.equal(format(date, 'YYYY-MM-DD'), '1977-08-24');
});

test('_format() method, format=YYYY-MM-DD, converts timestamp', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let timestamp = date.getTime();
  assert.equal(format(timestamp, 'YYYY-MM-DD'), '1977-08-24');
});

test('_format() method, format=YYYY-MM-DD, converts obj', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let obj = EmberObject.create({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate(), hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() });
  assert.equal(format(obj, 'YYYY-MM-DD'), '1977-08-24');
});

test('_format() method, format=YYYY-MM-DD HH:mm:ss, converts date', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  assert.equal(format(date, 'YYYY-MM-DD HH:mm:ss'), '1977-08-24 00:00:00');
});

test('_format() method, format=DD-MM-YYYY', function(assert) {
  assert.expect(1);
  assert.equal(format('24-08-1977', 'DD-MM-YYYY'), '24-08-1977');
});

test('_format() method, format=DD-MM-YYYY, converts date', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  assert.equal(format(date, 'DD-MM-YYYY'), '24-08-1977');
});

test('_format() method, format=DD-MM-YYYY, converts timestamp', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let timestamp = date.getTime();
  assert.equal(format(timestamp, 'DD-MM-YYYY'), '24-08-1977');
});

test('_format() method, format=DD-MM-YYYY, converts obj', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let obj = EmberObject.create({ year: date.getFullYear(), month: date.getMonth(), date: date.getDate(), hour: date.getHours(), minute: date.getMinutes(), second: date.getSeconds() });
  assert.equal(format(obj, 'DD-MM-YYYY'), '24-08-1977');
});

test('_format() method, format=HH:mm, converts date', function(assert) {
  assert.expect(1);
  let date = new Date(1970,1,1,14,0,0);
  assert.equal(format(date, 'HH:mm'), '14:00');
});

test('_format() method, format=HH:mm, converts date', function(assert) {
  assert.expect(1);
  let date = new Date(1970,1,1,14,0,0);
  assert.equal(format(date, 'h:mm a'), '2:00 pm');
});
