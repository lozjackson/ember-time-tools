import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

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

test('times', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.deepEqual(component.get('times'), [
    { hours: 0, mins: 0 },
    { hours: 0, mins: 30 },
    { hours: 1, mins: 0 },
    { hours: 1, mins: 30 },
    { hours: 2, mins: 0 },
    { hours: 2, mins: 30 },
    { hours: 3, mins: 0 },
    { hours: 3, mins: 30 },
    { hours: 4, mins: 0 },
    { hours: 4, mins: 30 },
    { hours: 5, mins: 0 },
    { hours: 5, mins: 30 },
    { hours: 6, mins: 0 },
    { hours: 6, mins: 30 },
    { hours: 7, mins: 0 },
    { hours: 7, mins: 30 },
    { hours: 8, mins: 0 },
    { hours: 8, mins: 30 },
    { hours: 9, mins: 0 },
    { hours: 9, mins: 30 },
    { hours: 10, mins: 0 },
    { hours: 10, mins: 30 },
    { hours: 11, mins: 0 },
    { hours: 11, mins: 30 },
    { hours: 12, mins: 0 },
    { hours: 12, mins: 30 },
    { hours: 13, mins: 0 },
    { hours: 13, mins: 30 },
    { hours: 14, mins: 0 },
    { hours: 14, mins: 30 },
    { hours: 15, mins: 0 },
    { hours: 15, mins: 30 },
    { hours: 16, mins: 0 },
    { hours: 16, mins: 30 },
    { hours: 17, mins: 0 },
    { hours: 17, mins: 30 },
    { hours: 18, mins: 0 },
    { hours: 18, mins: 30 },
    { hours: 19, mins: 0 },
    { hours: 19, mins: 30 },
    { hours: 20, mins: 0 },
    { hours: 20, mins: 30 },
    { hours: 21, mins: 0 },
    { hours: 21, mins: 30 },
    { hours: 22, mins: 0 },
    { hours: 22, mins: 30 },
    { hours: 23, mins: 0 },
    { hours: 23, mins: 30 }
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
  var component = this.subject({
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
