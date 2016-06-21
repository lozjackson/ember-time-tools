import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

const { run } = Ember;

moduleForComponent('tt-time-slot', 'Unit | Component | tt time slot', {
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

test('tagName should be li', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('tagName'), 'li');
});

test('classNames', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.deepEqual(component.get('classNames'), ['ember-view']);
});

test('classNameBindings', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.deepEqual(component.get('classNameBindings'), ['timeIsSelected:time-selected']);
});

test('militaryTime should be false', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('militaryTime'), false);
});

test('timeIsSelected', function(assert) {
  var component = this.subject();

  this.render();
  run(() => component.set('model', Ember.Object.create({
    hours: 15,
    mins: 30
  })));
  assert.equal(component.get('timeIsSelected'), false);

  let timePre = new Date(0);
  timePre.setHours(14);
  timePre.setMinutes(30);
  run(() => component.set('timeSelected', timePre));
  assert.equal(component.get('timeIsSelected'), false);

  let timeEqual = new Date(0);
  timeEqual.setHours(15);
  timeEqual.setMinutes(30);
  run(() => component.set('timeSelected', timeEqual));
  assert.equal(component.get('timeIsSelected'), true);

  let timePost = new Date(0);
  timePost.setHours(15);
  timePost.setMinutes(31);
  run(() => component.set('timeSelected', timePost));
  assert.equal(component.get('timeIsSelected'), false);
});

test('displayText 24 hour clock', function(assert) {
  var component = this.subject({
    militaryTime: true
  });
  this.render();
  run(() => component.set('model', Ember.Object.create({
    hours: 15,
    mins: 30
  })));
  assert.equal(component.get('displayText'), '15:30');
});

test('displayText 24 hour clock should add leading zeros to the hour', function(assert) {
  var component = this.subject({
    militaryTime: true
  });
  this.render();
  run(() => component.set('model', Ember.Object.create({
    hours: 2,
    mins: 30
  })));
  assert.equal(component.get('displayText'), '02:30');
});

test('displayText 24 hour clock should add leading zeros to the minutes', function(assert) {
  var component = this.subject({
    militaryTime: true
  });
  this.render();
  run(() => component.set('model', Ember.Object.create({
    hours: 12,
    mins: 3
  })));
  assert.equal(component.get('displayText'), '12:03');
});

test('displayText 12 hour clock converts to 12-hour time', function(assert) {
  var component = this.subject();
  this.render();
  run(() => component.set('model', Ember.Object.create({
    hours: 22,
    mins: 30
  })));
  assert.equal(component.get('displayText'), '10:30 pm');
});

test('displayText 12 hour clock converts 00:00 to 12:00 am', function(assert) {
  var component = this.subject();
  this.render();
  run(() => component.set('model', Ember.Object.create({
    hours: 0,
    mins: 0
  })));
  assert.equal(component.get('displayText'), '12:00 am');
});

test('displayText 12 hour clock converts 12:00 to 12:00 pm', function(assert) {
  var component = this.subject();
  this.render();
  run(() => component.set('model', Ember.Object.create({
    hours: 12,
    mins: 0
  })));
  assert.equal(component.get('displayText'), '12:00 pm');
});

test('displayText 12 hour clock should display meridian', function(assert) {
  var component = this.subject();
  this.render();
  run(() => component.set('model', Ember.Object.create({
    hours: 10,
    mins: 30
  })));
  assert.equal(component.get('displayText'), '10:30 am');
});
