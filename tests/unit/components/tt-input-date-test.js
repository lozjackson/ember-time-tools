import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

const { run } = Ember;

moduleForComponent('tt-input-date', 'Unit | Component | tt input date', {
  // Specify the other units that are required for this test
  needs: [
    'component:tt-date-field',
    'component:tt-date-picker',
    'component:tt-picker-item',
    'component:svg-triangle',
    'helper:format-date'
  ],
  unit: true
});


test('it renders', function(assert) {
  assert.expect(2);
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

test('showDatePicker should be false', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('showDatePicker'), false);
});

test('classNames', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.deepEqual(component.get('classNames'), [
    "ember-view",
    "input-date"
  ]);
});

test('_selectDate() method', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  run(() => component._selectDate({ year: 1977, month: 7, date: 24 }));
  assert.deepEqual(component.get('value'), new Date(1977,7,24));
});

test('_closeDatePicker() method', function(assert) {
  assert.expect(1);
  let component = this.subject();
  this.render();
  run(() => {
    component.set('showDatePicker', true);
    component._closeDatePicker();
  });
  assert.equal(component.get('showDatePicker'), false);
});

test('_openDatePicker() method', function(assert) {
  assert.expect(1);
  let component = this.subject();
  this.render();
  run(() => component._openDatePicker());
  assert.equal(component.get('showDatePicker'), true);
});

test('selectDate action', function(assert) {
  assert.expect(2);
  let component = this.subject();
  this.render();
  component.set('_selectDate', (d) => assert.deepEqual(d, { year: 1977, month: 7, date: 24 }));
  component.set('_closeDatePicker', () => assert.ok(true));
  run(() => component.send('selectDate', { year: 1977, month: 7, date: 24 }));
});

test('toggleDatePicker action', function(assert) {
  assert.expect(2);
  let component = this.subject();
  this.render();
  run(() => component.send('toggleDatePicker'));
  assert.equal(component.get('showDatePicker'), true);

  run(() => component.send('toggleDatePicker'));
  assert.equal(component.get('showDatePicker'), false);
});

test('closeDatePicker action', function(assert) {
  assert.expect(1);
  let component = this.subject();
  this.render();
  component.set('_closeDatePicker', () => assert.ok(true));
  component.send('closeDatePicker');
});

test('closeDatePicker action', function(assert) {
  assert.expect(1);
  let component = this.subject();
  this.render();
  component.set('_openDatePicker', () => assert.ok(true));
  component.send('openDatePicker');
});