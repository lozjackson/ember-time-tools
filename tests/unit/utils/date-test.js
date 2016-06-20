import DateObject from 'ember-time-tools/utils/date';
import { module, test } from 'qunit';

module('Unit | Util | date');

test('get date', function(assert) {
  let date = new Date(1977,7,24);
  let object = DateObject.create();
  object.set('_date', date);
  assert.deepEqual(object.get('date'), date);
});

test('set date - date object', function(assert) {
  let date = new Date(1977,7,24);
  let object = DateObject.create();
  object.set('date', date);
  assert.deepEqual(object.get('_date'), date);
});

test('set date - number', function(assert) {
  let date = new Date(1977,7,24);
  let object = DateObject.create();
  object.set('date', date.getTime());
  assert.deepEqual(object.get('_date'), date);
});

test('set date - string', function(assert) {
  let object = DateObject.create();
  object.set('date', '1977-8-24');
  assert.deepEqual(object.get('_date'), new Date(1977,7,24));
});

test('set date - string with slashes', function(assert) {
  let object = DateObject.create();
  object.set('date', '1977/8/24');
  assert.deepEqual(object.get('_date'), new Date(1977,7,24));
});

test('day', function(assert) {
  let object = DateObject.create();

  object.set('date', '1977/8/24');
  assert.equal(object.get('day'), 24);

  object.set('date', '1977/8/25');
  assert.equal(object.get('day'), 25);
});

test('month', function(assert) {
  let object = DateObject.create();

  object.set('date', '1977/8/24');
  assert.equal(object.get('month'), 7);

  object.set('date', '1977/9/24');
  assert.equal(object.get('month'), 8);
});

test('year', function(assert) {
  let object = DateObject.create();

  object.set('date', '1977/8/24');
  assert.equal(object.get('year'), 1977);

  object.set('date', '1978/8/24');
  assert.equal(object.get('year'), 1978);
});

test('init() method', function(assert) {
  let date = new Date();
  let object = DateObject.create();
  assert.equal(object.get('_date').getMonth(), date.getMonth());
  assert.equal(object.get('_date').getFullYear(), date.getFullYear());
});

test('_setDate() method', function(assert) {
  assert.expect(8);
  let object = DateObject.create();
  let date = new Date('1977/8/24');
  object._setDate(date);
  assert.equal(object.get('_date'), date);
  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1977);

  let newDate = new Date('1982/5/13');
  object._setDate(newDate);
  assert.equal(object.get('_date'), newDate);
  assert.equal(object.get('day'), 13);
  assert.equal(object.get('month'), 4);
  assert.equal(object.get('year'), 1982);
});

test('_modifyDate(name, number) method', function(assert) {
  assert.expect(21);
  let object = DateObject.create();
  let date = new Date('1977/12/30');
  object._setDate(date);
  assert.equal(object.get('day'), 30);
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1977);

  object._modifyDate('Date', 36);
  assert.equal(object.get('day'), 4);
  assert.equal(object.get('month'), 1);
  assert.equal(object.get('year'), 1978);

  object._modifyDate('Month', 16);
  assert.equal(object.get('day'), 4);
  assert.equal(object.get('month'), 5);
  assert.equal(object.get('year'), 1979);

  object._modifyDate('Year', 5);
  assert.equal(object.get('day'), 4);
  assert.equal(object.get('month'), 5);
  assert.equal(object.get('year'), 1984);

  object._modifyDate('Year',-25);
  assert.equal(object.get('day'), 4);
  assert.equal(object.get('month'), 5);
  assert.equal(object.get('year'), 1959);

  object._modifyDate('Month', -26);
  assert.equal(object.get('day'), 4);
  assert.equal(object.get('month'), 3);
  assert.equal(object.get('year'), 1957);

  object._modifyDate('Date', -37);
  assert.equal(object.get('day'), 26);
  assert.equal(object.get('month'), 1);
  assert.equal(object.get('year'), 1957);
});

test('incrementDay() method', function(assert) {
  assert.expect(13);
  let object = DateObject.create();
  let date = new Date('1977/12/30');
  object._setDate(date);
  assert.equal(object.get('_date'), date);
  assert.equal(object.get('day'), 30);
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1977);

  object.incrementDay();
  assert.equal(object.get('day'), 31);
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1977);

  object.incrementDay();
  assert.equal(object.get('day'), 1);
  assert.equal(object.get('month'), 0);
  assert.equal(object.get('year'), 1978);

  object.incrementDay();
  assert.equal(object.get('day'), 2);
  assert.equal(object.get('month'), 0);
  assert.equal(object.get('year'), 1978);
});

test('incrementDay(number) method', function(assert) {
  assert.expect(7);
  let object = DateObject.create();
  let date = new Date('1977/12/30');
  object._setDate(date);
  assert.equal(object.get('_date'), date);
  assert.equal(object.get('day'), 30);
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1977);

  object.incrementDay(3);

  assert.equal(object.get('day'), 2);
  assert.equal(object.get('month'), 0);
  assert.equal(object.get('year'), 1978);
});

test('decrementDay() method', function(assert) {
  assert.expect(13);
  let object = DateObject.create();
  let date = new Date('1977/1/2');
  object._setDate(date);
  assert.equal(object.get('_date'), date);
  assert.equal(object.get('day'), 2);
  assert.equal(object.get('month'), 0);
  assert.equal(object.get('year'), 1977);

  object.decrementDay();
  assert.equal(object.get('day'), 1);
  assert.equal(object.get('month'), 0);
  assert.equal(object.get('year'), 1977);

  object.decrementDay();
  assert.equal(object.get('day'), 31);
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1976);

  object.decrementDay();
  assert.equal(object.get('day'), 30);
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1976);
});

test('decrementDay(number) method', function(assert) {
  assert.expect(7);
  let object = DateObject.create();
  let date = new Date('1977/1/2');
  object._setDate(date);
  assert.equal(object.get('_date'), date);
  assert.equal(object.get('day'), 2);
  assert.equal(object.get('month'), 0);
  assert.equal(object.get('year'), 1977);

  object.decrementDay(3);

  assert.equal(object.get('day'), 30);
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1976);
});

test('incrementMonth() method', function(assert) {
  assert.expect(11);
  let object = DateObject.create();
  let date = new Date('1977/10/24');
  object._setDate(date);
  assert.equal(object.get('_date'), date);
  assert.equal(object.get('month'), 9);
  assert.equal(object.get('year'), 1977);

  object.incrementMonth();
  assert.equal(object.get('month'), 10);
  assert.equal(object.get('year'), 1977);

  object.incrementMonth();
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1977);

  object.incrementMonth();
  assert.equal(object.get('month'), 0);
  assert.equal(object.get('year'), 1978);

  object.incrementMonth();
  assert.equal(object.get('month'), 1);
  assert.equal(object.get('year'), 1978);
});

test('incrementMonth(number) method', function(assert) {
  assert.expect(7);
  let object = DateObject.create();
  let date = new Date('1977/10/24');
  object._setDate(date);
  assert.equal(object.get('_date'), date);
  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 9);
  assert.equal(object.get('year'), 1977);

  object.incrementMonth(4);

  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 1);
  assert.equal(object.get('year'), 1978);
});

test('decrementMonth() method', function(assert) {
  assert.expect(9);
  let object = DateObject.create();
  let date = new Date('1977/2/24');
  object._setDate(date);
  assert.equal(object.get('_date'), date);
  assert.equal(object.get('month'), 1);
  assert.equal(object.get('year'), 1977);

  object.decrementMonth();
  assert.equal(object.get('month'), 0);
  assert.equal(object.get('year'), 1977);

  object.decrementMonth();
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1976);

  object.decrementMonth();
  assert.equal(object.get('month'), 10);
  assert.equal(object.get('year'), 1976);
});

test('decrementMonth(number) method', function(assert) {
  assert.expect(7);
  let object = DateObject.create();
  let date = new Date('1977/2/24');
  object._setDate(date);
  assert.equal(object.get('_date'), date);
  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 1);
  assert.equal(object.get('year'), 1977);

  object.decrementMonth(3);

  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 10);
  assert.equal(object.get('year'), 1976);
});

test('incrementYear() method', function(assert) {
  assert.expect(13);
  let object = DateObject.create();
  let date = new Date('1977/8/24');
  object._setDate(date);
  assert.equal(object.get('_date'), date);
  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1977);

  object.incrementYear();
  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1978);

  object.incrementYear();
  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1979);

  object.incrementYear();
  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1980);
});

test('incrementYear(number) method', function(assert) {
  assert.expect(7);
  let object = DateObject.create();
  let date = new Date('1977/8/24');
  object._setDate(date);
  assert.equal(object.get('_date'), date);
  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1977);

  object.incrementYear(3);

  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1980);
});

test('decrementYear() method', function(assert) {
  assert.expect(13);
  let object = DateObject.create();
  let date = new Date('1977/8/24');
  object._setDate(date);
  assert.equal(object.get('_date'), date);
  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1977);

  object.decrementYear();
  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1976);

  object.decrementYear();
  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1975);

  object.decrementYear();
  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1974);
});

test('decrementYear(number) method', function(assert) {
  assert.expect(7);
  let object = DateObject.create();
  let date = new Date('1977/8/24');
  object._setDate(date);
  assert.equal(object.get('_date'), date);
  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1977);

  object.decrementYear(3);

  assert.equal(object.get('day'), 24);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1974);
});
