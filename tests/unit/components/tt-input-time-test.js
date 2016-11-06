import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

const { run } = Ember;

moduleForComponent('tt-input-time', 'Unit | Component | tt input time', {
  needs: [
    'component:tt-time-field',
    'component:tt-time-picker',
    'component:uic-close-button',
    'component:ember-wormhole',
    'helper:format-date',
    'helper:compare-json'
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
  assert.equal(component.get('displayFormat'), 'h:mm a');
});

test('pickerDisplayFormat', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('pickerDisplayFormat'), 'hh:mm a');
});

test('timeInterval', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('timeInterval'), 30);
});

test('scrollToSelectedTime should be true', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('scrollToSelectedTime'), true);
});

test('showTimePicker should be false', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('showTimePicker'), false);
});

test('_selectTime() method', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  let date = new Date(0);
  date.setHours(15);
  date.setMinutes(30);

  run(() => component._selectTime(date));
  assert.deepEqual(component.get('value'), date);
});

test('_closeTimePicker() method', function(assert) {
  assert.expect(1);
  let component = this.subject();
  this.render();
  run(() => {
    component.set('showTimePicker', true);
    component._closeTimePicker();
  });
  assert.equal(component.get('showTimePicker'), false);
});

test('_openTimePicker() method', function(assert) {
  assert.expect(1);
  let component = this.subject();
  this.render();
  run(() => component._openTimePicker());
  assert.equal(component.get('showTimePicker'), true);
});

test('selectTime action', function(assert) {
  assert.expect(2);
  let component = this.subject({
    _selectTime: (t) => assert.deepEqual(t, { hour: 15, minute: 30 }),
    _closeTimePicker: () => assert.ok(true)
  });
  this.render();
  run(() => component.send('selectTime', { hour: 15, minute: 30 }));
});

test('toggleTimePicker action', function(assert) {
  assert.expect(2);
  let component = this.subject();
  this.render();
  run(() => component.send('toggleTimePicker'));
  assert.equal(component.get('showTimePicker'), true);

  run(() => component.send('toggleTimePicker'));
  assert.equal(component.get('showTimePicker'), false);
});

test('openTimePicker action', function(assert) {
  assert.expect(1);
  let component = this.subject({
    _openTimePicker: () => assert.ok(true)
  });
  this.render();
  component.send('openTimePicker');
});

test('closeTimePicker action', function(assert) {
  assert.expect(1);
  let component = this.subject({
    _closeTimePicker: () => assert.ok(true)
  });
  this.render();
  component.send('closeTimePicker');
});
