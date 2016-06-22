import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

const { run } = Ember;

moduleForComponent('tt-picker-item', 'Unit | Component | tt picker item', {
  // needs: [],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

test('tagName should be td', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('tagName'), 'td');
});

test('classNames', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.deepEqual(component.get('classNames'), ["ember-view"]);
});

test('classNameBindings', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.deepEqual(component.get('classNameBindings'), ['model.inRange::out-of-range', 'daySelected', 'today', 'weekend']);
});

test('daySelected', function(assert) {
  assert.expect(4);
  var component = this.subject();
  this.render();
  run(() => component.set('model', Ember.Object.create({
    date: 24,
    month: 7,
    year: 1977
  })));
  assert.equal(component.get('daySelected'), false);

  run(() => component.set('selectedDate', new Date(1977,7,23)));
  assert.equal(component.get('daySelected'), false);

  run(() => component.set('selectedDate', new Date(1977,7,24)));
  assert.equal(component.get('daySelected'), true);

  run(() => component.set('selectedDate', new Date(1977,7,25)));
  assert.equal(component.get('daySelected'), false);
});

test('today', function(assert) {
  assert.expect(4);
  var component = this.subject();
  this.render();
  let today = new Date();
  assert.equal(component.get('today'), false);

  run(() => component.set('model', Ember.Object.create({
    date: today.getDate() -1,
    month: today.getMonth(),
    year: today.getFullYear()
  })));
  assert.equal(component.get('today'), false);

  run(() => component.incrementProperty('model.date'));
  assert.equal(component.get('today'), true);

  run(() => component.incrementProperty('model.date'));
  assert.equal(component.get('today'), false);
});

test('weekend', function(assert) {
  assert.expect(5);
  var component = this.subject();
  this.render();
  let date = new Date(2016,5,17);
  assert.equal(component.get('weekend'), false);

  run(() => component.set('model', Ember.Object.create({
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  })));
  assert.equal(component.get('weekend'), false); // friday

  run(() => component.incrementProperty('model.date')); // saturday
  assert.equal(component.get('weekend'), true);

  run(() => component.incrementProperty('model.date')); // sunday
  assert.equal(component.get('weekend'), true);

  run(() => component.incrementProperty('model.date')); // monday
  assert.equal(component.get('weekend'), false);
});