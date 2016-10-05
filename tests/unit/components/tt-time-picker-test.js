import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

const { run } = Ember;

moduleForComponent('tt-time-picker', 'Unit | Component | tt time picker', {
  needs: [
    'component:uic-close-button',
    'helper:compare-json',
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

test('output should be date', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('output'), 'date');
});

test('displayFormat', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('displayFormat'), 'hh:mm a');
});

test('timeInterval', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('timeInterval'), 30);
});

test('_selectedTime - date', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  let date = new Date(0);
  date.setHours(2);
  date.setMinutes(30);
  run(() => component.set('selectedTime', date));
  assert.deepEqual(component.get('_selectedTime'), { hour: 2, minute: 30 });
});

test('_selectedTime - number', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  let date = new Date(0);
  date.setHours(2);
  date.setMinutes(30);
  run(() => component.set('selectedTime', date.getTime()));
  assert.deepEqual(component.get('_selectedTime'), { hour: 2, minute: 30 });
});

test('times - default interval', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();
  assert.equal(component.get('times.length'), 48);
  assert.deepEqual(component.get('times'), [
    { hour: 0, minute: 0 },
    { hour: 0, minute: 30 },
    { hour: 1, minute: 0 },
    { hour: 1, minute: 30 },
    { hour: 2, minute: 0 },
    { hour: 2, minute: 30 },
    { hour: 3, minute: 0 },
    { hour: 3, minute: 30 },
    { hour: 4, minute: 0 },
    { hour: 4, minute: 30 },
    { hour: 5, minute: 0 },
    { hour: 5, minute: 30 },
    { hour: 6, minute: 0 },
    { hour: 6, minute: 30 },
    { hour: 7, minute: 0 },
    { hour: 7, minute: 30 },
    { hour: 8, minute: 0 },
    { hour: 8, minute: 30 },
    { hour: 9, minute: 0 },
    { hour: 9, minute: 30 },
    { hour: 10, minute: 0 },
    { hour: 10, minute: 30 },
    { hour: 11, minute: 0 },
    { hour: 11, minute: 30 },
    { hour: 12, minute: 0 },
    { hour: 12, minute: 30 },
    { hour: 13, minute: 0 },
    { hour: 13, minute: 30 },
    { hour: 14, minute: 0 },
    { hour: 14, minute: 30 },
    { hour: 15, minute: 0 },
    { hour: 15, minute: 30 },
    { hour: 16, minute: 0 },
    { hour: 16, minute: 30 },
    { hour: 17, minute: 0 },
    { hour: 17, minute: 30 },
    { hour: 18, minute: 0 },
    { hour: 18, minute: 30 },
    { hour: 19, minute: 0 },
    { hour: 19, minute: 30 },
    { hour: 20, minute: 0 },
    { hour: 20, minute: 30 },
    { hour: 21, minute: 0 },
    { hour: 21, minute: 30 },
    { hour: 22, minute: 0 },
    { hour: 22, minute: 30 },
    { hour: 23, minute: 0 },
    { hour: 23, minute: 30 }
  ]);
});

test('times - interval=10', function(assert) {
  assert.expect(9);
  var component = this.subject({
    timeInterval: 10
  });
  this.render();
  assert.equal(component.get('times.length'), 144);
  assert.deepEqual(component.get('times')[0], { hour: 0, minute: 0 });
  assert.deepEqual(component.get('times')[1], { hour: 0, minute: 10 });
  assert.deepEqual(component.get('times')[2], { hour: 0, minute: 20 });
  assert.deepEqual(component.get('times')[7], { hour: 1, minute: 10 });
  assert.deepEqual(component.get('times')[8], { hour: 1, minute: 20 });
  assert.deepEqual(component.get('times')[15], { hour: 2, minute: 30 });
  assert.deepEqual(component.get('times')[16], { hour: 2, minute: 40 });
  assert.deepEqual(component.get('times')[component.get('times.length') - 1], { hour: 23, minute: 50 });
});

test('times - interval=5', function(assert) {
  assert.expect(9);
  var component = this.subject({
    timeInterval: 5
  });
  this.render();
  assert.equal(component.get('times.length'), 288);
  assert.deepEqual(component.get('times')[0], { hour: 0, minute: 0 });
  assert.deepEqual(component.get('times')[1], { hour: 0, minute: 5 });
  assert.deepEqual(component.get('times')[2], { hour: 0, minute: 10 });
  assert.deepEqual(component.get('times')[13], { hour: 1, minute: 5 });
  assert.deepEqual(component.get('times')[14], { hour: 1, minute: 10 });
  assert.deepEqual(component.get('times')[27], { hour: 2, minute: 15 });
  assert.deepEqual(component.get('times')[28], { hour: 2, minute: 20 });
  assert.deepEqual(component.get('times')[component.get('times.length') - 1], { hour: 23, minute: 55 });
});

test('times - interval=1', function(assert) {
  assert.expect(9);
  var component = this.subject({
    timeInterval: 1
  });
  this.render();
  assert.equal(component.get('times.length'), 1440);
  assert.deepEqual(component.get('times')[0], { hour: 0, minute: 0 });
  assert.deepEqual(component.get('times')[1], { hour: 0, minute: 1 });
  assert.deepEqual(component.get('times')[2], { hour: 0, minute: 2 });
  assert.deepEqual(component.get('times')[60], { hour: 1, minute: 0 });
  assert.deepEqual(component.get('times')[61], { hour: 1, minute: 1 });
  assert.deepEqual(component.get('times')[134], { hour: 2, minute: 14 });
  assert.deepEqual(component.get('times')[135], { hour: 2, minute: 15 });
  assert.deepEqual(component.get('times')[component.get('times.length') - 1], { hour: 23, minute: 59 });
});

test('times - interval=null should be same as interval=1', function(assert) {
  assert.expect(5);
  var component = this.subject({
    timeInterval: null
  });
  this.render();
  assert.equal(component.get('times.length'), 1440);
  assert.deepEqual(component.get('times')[0], { hour: 0, minute: 0 });
  assert.deepEqual(component.get('times')[1], { hour: 0, minute: 1 });
  assert.deepEqual(component.get('times')[2], { hour: 0, minute: 2 });
  assert.deepEqual(component.get('times')[component.get('times.length') - 1], { hour: 23, minute: 59 });
});

test('times - interval=0 should be same as interval=1', function(assert) {
  assert.expect(5);
  var component = this.subject({
    timeInterval: 0
  });
  this.render();
  assert.equal(component.get('times.length'), 1440);
  assert.deepEqual(component.get('times')[0], { hour: 0, minute: 0 });
  assert.deepEqual(component.get('times')[1], { hour: 0, minute: 1 });
  assert.deepEqual(component.get('times')[2], { hour: 0, minute: 2 });
  assert.deepEqual(component.get('times')[component.get('times.length') - 1], { hour: 23, minute: 59 });
});

test('didInsertElement() method', function(assert) {
  assert.expect();
  this.subject({
    scrollToElement: selector => assert.equal(selector, '.tt-time-picker li.time-selected')
  });
  this.render();
});

test('scrollToElement() method', function(assert) {
  assert.expect(3);
  let _scheduleOnce = Ember.run.scheduleOnce;
  let component = this.subject({
    didInsertElement: () => {}
  });

  Ember.run.scheduleOnce = (name, context, fn) => {
    assert.equal(name, 'afterRender');
    assert.deepEqual(context, component);
    assert.equal(typeof fn, 'function');
  };

  this.render();
  component.scrollToElement();

  Ember.run.scheduleOnce = _scheduleOnce;
});

test('_selectTime() method - select action', function(assert) {
  assert.expect(1);
  let date = new Date(0);
  date.setHours(10);
  date.setMinutes(30);
  let component = this.subject({
    select: time => assert.deepEqual(time, date)
  });
  this.render();
  component._selectTime({ hour: 10, minute: 30 });
});

test('_selectTime() method - selectedTime property', function(assert) {
  assert.expect(1);
  let date = new Date(0);
  date.setHours(10);
  date.setMinutes(30);
  let component = this.subject();
  this.render();
  run(() => component._selectTime({ hour: 10, minute: 30 }));
  assert.deepEqual(component.get('selectedTime'), date);
});

test('_selectTime() method - output = date', function(assert) {
  assert.expect(1);
  let date = new Date(0);
  date.setHours(10);
  date.setMinutes(30);
  let component = this.subject({
    output: 'date',
    select: time => assert.deepEqual(time, date)
  });
  this.render();
  component._selectTime({ hour: 10, minute: 30 });
});

test('_selectTime() method - output = timestamp', function(assert) {
  assert.expect(1);
  let date = new Date(0);
  date.setHours(10);
  date.setMinutes(30);
  let component = this.subject({
    output: 'timestamp',
    select: time => assert.deepEqual(time, date.getTime())
  });
  this.render();
  component._selectTime({ hour: 10, minute: 30 });
});

test('_selectTime() method - output = object', function(assert) {
  assert.expect(1);
  let date = new Date(0);
  date.setHours(10);
  date.setMinutes(30);
  let object = Ember.Object.create({
    hour: date.getHours(),
    minute: date.getMinutes(),
    _date: date,
    timestamp: date.getTime()
  });

  let component = this.subject({
    output: 'object',
    select: time => assert.deepEqual(time, object)
  });
  this.render();
  component._selectTime({ hour: 10, minute: 30 });
});
