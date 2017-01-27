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

test('decrement day', function(assert) {
  let object = DateObject.create();

  object.set('date', '1977/1/2');
  assert.equal(object.get('day'), 2);
  assert.equal(object.get('month'), 0);
  assert.equal(object.get('year'), 1977);

  object.decrementProperty('day');
  assert.equal(object.get('day'), 1);
  assert.equal(object.get('month'), 0);
  assert.equal(object.get('year'), 1977);

  object.decrementProperty('day');
  assert.equal(object.get('day'), 31);
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1976);
});

test('increment day', function(assert) {
  let object = DateObject.create();

  object.set('date', '1977/12/30');
  assert.equal(object.get('day'), 30);
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1977);

  object.incrementProperty('day');
  assert.equal(object.get('day'), 31);
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1977);

  object.incrementProperty('day');
  assert.equal(object.get('day'), 1);
  assert.equal(object.get('month'), 0);
  assert.equal(object.get('year'), 1978);
});

test('decrement month', function(assert) {
  let object = DateObject.create();

  object.set('date', '1977/4/24');
  assert.equal(object.get('month'), 3);
  assert.equal(object.get('year'), 1977);

  object.decrementProperty('month');
  assert.equal(object.get('month'), 2);
  assert.equal(object.get('year'), 1977);

  object.decrementProperty('month');
  assert.equal(object.get('month'), 1);
  assert.equal(object.get('year'), 1977);

  object.decrementProperty('month');
  assert.equal(object.get('month'), 0);
  assert.equal(object.get('year'), 1977);

  object.decrementProperty('month');
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1976);
});

test('increment month', function(assert) {
  let object = DateObject.create();

  object.set('date', '1977/8/24');
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1977);

  object.incrementProperty('month', 2);
  assert.equal(object.get('month'), 9);
  assert.equal(object.get('year'), 1977);

  object.incrementProperty('month');
  assert.equal(object.get('month'), 10);
  assert.equal(object.get('year'), 1977);

  object.incrementProperty('month', 4);
  assert.equal(object.get('month'), 2);
  assert.equal(object.get('year'), 1978);
});

test('decrement year', function(assert) {
  let object = DateObject.create();

  object.set('date', '1977/8/24');
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1977);

  object.decrementProperty('year');
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1976);

  object.decrementProperty('year', 3);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1973);
});

test('increment year', function(assert) {
  let object = DateObject.create();

  object.set('date', '1977/8/24');
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1977);

  object.incrementProperty('year');
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1978);

  object.incrementProperty('year', 3);
  assert.equal(object.get('month'), 7);
  assert.equal(object.get('year'), 1981);
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

test('_modifyDate(name, number) method', function(assert) {
  let object = DateObject.create();
  let date = new Date('1977/12/30');
  object.set('_date', date);
  assert.equal(object.get('day'), 30);
  assert.equal(object.get('month'), 11);
  assert.equal(object.get('year'), 1977);

  object._modifyDate('Date', 2);
  assert.equal(object.get('_date').getDate(), 2);
  assert.equal(object.get('_date').getMonth(), 11);
  assert.equal(object.get('_date').getFullYear(), 1977);

  object._modifyDate('Month', 5);
  assert.equal(object.get('_date').getDate(), 2);
  assert.equal(object.get('_date').getMonth(), 5);
  assert.equal(object.get('_date').getFullYear(), 1977);

  object._modifyDate('FullYear', 1978);
  assert.equal(object.get('_date').getDate(), 2);
  assert.equal(object.get('_date').getMonth(), 5);
  assert.equal(object.get('_date').getFullYear(), 1978);
});
