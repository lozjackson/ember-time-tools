import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

const { run } = Ember;
moduleForComponent('tt-time-picker', 'Unit | Component | tt time picker', {
  needs: ['component:tt-time-slot'],
  unit: true
});


test('it renders', function(assert) {
  assert.expect(2);
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

test('classNames', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.deepEqual(component.get('classNames'), ['ember-view', 'time-picker', 'container']);
});

test('output should be date', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('output'), 'date');
});

test('times', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
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

test('didInsertElement() method', function(assert) {
  assert.expect();
  this.subject({
    scrollToElement: selector => assert.equal(selector, '.time-picker li.time-selected')
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
