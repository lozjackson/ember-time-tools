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
    'component:uic-close-button',
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

test('displayFormat', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('displayFormat'), 'ddd DD/MM/YYYY');
});

test('showDatePicker should be false', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('showDatePicker'), false);
});

test('_selectDate() method', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  let date = new Date(1977,7,24);
  run(() => component._selectDate(date));
  assert.deepEqual(component.get('value'), date);
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
  let component = this.subject({
    _selectDate: (d) => assert.deepEqual(d, { year: 1977, month: 7, date: 24 }),
    _closeDatePicker: () => assert.ok(true)
  });
  this.render();
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
  let component = this.subject({
    _closeDatePicker: () => assert.ok(true)
  });
  this.render();
  component.send('closeDatePicker');
});

test('openDatePicker action', function(assert) {
  assert.expect(1);
  let component = this.subject({
    _openDatePicker: () => assert.ok(true)
  });
  this.render();
  component.send('openDatePicker');
});
