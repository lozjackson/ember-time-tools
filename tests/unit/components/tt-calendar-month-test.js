import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

var run = Ember.run;

moduleForComponent('tt-calendar-month', 'Unit | Component | tt calendar month', {
  needs: [
    'component:svg-triangle',
    'component:tt-calendar-week-row',
    'component:tt-calendar-weekrow-day',
    'component:tt-event-container'
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

test('eventTemplate is not null', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.ok(component.get('eventTemplate'));
});

test('classNames', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();

  let classNames = ['ember-view', 'tt-calendar-month', 'tt-calendar-container'];

  assert.deepEqual(component.get('classNames'), classNames);
});

test('should be 7 dayNames', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();

  let dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  assert.deepEqual(component.get('dayNames'), dayNames);
});

test('should be 12 monthNames', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();

  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  assert.deepEqual(component.get('monthNames'), monthNames);
});

test('sortProperties', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  let sortProperties = ['start:asc', 'end:asc'];
  assert.deepEqual(component.get('sortProperties'), sortProperties);
});

test('sortedEvents', function (assert) {
  assert.expect(2);
  var model1 = Ember.Object.create({ id:1, start: 3 });
  var model2 = Ember.Object.create({ id:2, start: 1 });
  var model3 = Ember.Object.create({ id:3, start: 2 });
  var component = this.subject();
  component.set('events', Ember.A([ model1, model2, model3 ]));
  this.render();
  assert.equal(component.get('sortedEvents.firstObject.id'), 2, `'sortedEvents.firstObject.id' should be 2` );

  run(() => {
    model3.set( 'start', 1 );
    model2.set( 'start', 2 );
  });
  assert.equal(component.get('sortedEvents.firstObject.id'), 3, `'sortedEvents.firstObject.id' should be 3` );
});

test('year should default to today', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();

  var date = new Date();
  var year = date.getFullYear();
  assert.equal(component.get('year'), year, `'year' should be ${year}`);
});

test('year follows selectedDate', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();

  var date = new Date(2014, 1, 1);
  var year = date.getFullYear();
  run(() => component.set('selectedDate', date ));
  assert.equal(component.get('year'), year, `'year' should be ${year}`);

  date = new Date(2012, 1, 1);
  year = date.getFullYear();
  run(() => component.set('selectedDate', date ));
  assert.equal(component.get('year'), year, `'year' should be ${year}`);
});

test('month should default to today', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();

  var date = new Date();
  var month = date.getMonth();
  assert.equal(component.get('month'), month, `'month' should be ${month}`);
});

test('month follows selectedDate', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();

  var date = new Date(2014, 4, 1);
  var month = date.getMonth();
  run(() => component.set('selectedDate', date ));
  assert.equal(component.get('month'), month, `'month' should be ${month}`);

  date = new Date(2012, 8, 1);
  month = date.getMonth();
  run(() => component.set('selectedDate', date ));
  assert.equal(component.get('month'), month, `'month' should be ${month}`);
});

test('month name is correct', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();

  run(() => component.set('selectedDate', new Date(2014, 4, 1) ));
  assert.equal(component.get('monthName'), 'May', `'monthName' should be 'May'`);

  run(() => component.set('selectedDate', new Date(2012, 8, 1) ));
  assert.equal(component.get('monthName'), 'September', `'monthName' should be 'September'`);
});

test('startDay', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();

  run(() => component.set('selectedDate', new Date(2014, 4, 1)));
  assert.equal(component.get('startDay'), 3, `'startDay' should be 3`);

  run(() => component.set('selectedDate', new Date(2014, 5, 1)));
  assert.equal(component.get('startDay'), 6, `'startDay' should be 6`);

});

test('weeks.length should be 6', function (assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('weeks.length'), 6, `'weeks.length' should be 6`);
});

test('getLastMonth', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();
  assert.equal( component.getLastMonth(2), 1, `return value should be 1` );
  assert.equal( component.getLastMonth(0), 11, `return value should be 11` );
});

test('getDaysInMonth', function(assert) {
  assert.expect(5);
  var component = this.subject();
  this.render();
  assert.equal( component.getDaysInMonth({year: 2015, month: 1}), 28, `Feb 2015 should be 28 days` );
  assert.equal( component.getDaysInMonth({year: 2015, month: 10}), 30, `November 2015 should be 30 days` );
  assert.equal( component.getDaysInMonth({year: 2016, month: 1}), 29, `Feb 2016 should be 29 days` );
  assert.equal( component.getDaysInMonth({year: 2016, month: 3}), 30, `April 2016 should be 30 days` );
  assert.equal( component.getDaysInMonth({year: 2016, month: 4}), 31, `May 2016 should be 31 days` );
});

test('select', function(assert) {
  assert.expect(1);
  var model = Ember.Object.create({ id:1 });
  var component = this.subject();
  this.render();
  run(() => component.select(model));
  assert.equal( component.get('selected.id'), 1, `'selected.id' should be 1` );
});


test('setToday defaults to today', function(assert) {
  assert.expect(3);
  var component = this.subject();
  this.render();
  var date = new Date();
  assert.equal(component.get('selectedDate').getDate(), date.getDate(), `'selectedDate.getDate()' should be ${date.getDate()}`);
  assert.equal(component.get('selectedDate').getMonth(), date.getMonth(), `'selectedDate.getMonth()' should be ${date.getMonth()}`);
  assert.equal(component.get('selectedDate').getFullYear(), date.getFullYear(), `'selectedDate.getFullYear()' should be ${date.getFullYear()}`);
});

test('setToday', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  var date = new Date(2014, 5, 18);
  run(() => component.setToday(date));
  assert.equal(component.get('selectedDate').getTime(), date.getTime(), `'selectedDate' should be ${date}`);
});

test('_nextMonth method should increment month', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();

  run( () => component.set('selectedDate', new Date( 2014, 2, 16 )) );
  assert.equal(component.get('month'), 2, `'month' should be 2`);

  run( () => component._nextMonth() );
  assert.equal(component.get('month'), 3, `'month' should be 3`);
});

test('nextMonth action', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();

  component.set('_nextMonth', () => assert.ok(true));
  component.send('nextMonth');
});

test('nextMonth action should increment month', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();

  run( () => component.set('selectedDate', new Date( 2014, 2, 16 )) );
  assert.equal(component.get('month'), 2, `'month' should be 2`);

  run( () => component.send('nextMonth') );
  assert.equal(component.get('month'), 3, `'month' should be 3`);
});

test('nextMonth action should not fail when selecteddate is null', function(assert) {
  assert.expect(2);
  var date = new Date();
  var month = date.getMonth();
  var nextMonth = month + 1;

  var component = this.subject();
  this.render();

  run( () => component.set( 'selectedDate', null ) );
  assert.equal(component.get('month'), month, `'month' should be ${date}`);

  run( () => component.send('nextMonth') );
  assert.equal(component.get('month'), nextMonth, `'month' should be ${nextMonth}`);
});

test('_prevMonth method should decrement month', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();

  run(() => component.set('selectedDate', new Date( 2014, 2, 16 )));
  assert.equal(component.get('month'), 2, `'month' should be 2`);

  run(() => component._prevMonth());
  assert.equal(component.get('month'), 1, `'month' should be 1`);
});

test('prevMonth action should not fail when selecteddate is null', function(assert) {
  assert.expect(2);
  var date = new Date();
  var month = date.getMonth();
  var prevMonth = month - 1;

  var component = this.subject();
  this.render();

  run( () => component.set( 'selectedDate', null ) );
  assert.equal(component.get('month'), month, `'month' should be ${date}`);

  run( () => component.send('prevMonth') );
  assert.equal(component.get('month'), prevMonth, `'month' should be ${prevMonth}`);
});

test('prevMonth action should decrement month', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();

  run(() => component.set('selectedDate', new Date( 2014, 2, 16 )));
  assert.equal(component.get('month'), 2, `'month' should be 2`);

  run(() => component.send('prevMonth'));
  assert.equal(component.get('month'), 1, `'month' should be 1`);
});

test('prevMonth action', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();

  component.set('_prevMonth', () => assert.ok(true));
  component.send('prevMonth');
});

test('today action', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();

  component.set('setToday', () => assert.ok(true));
  component.send('today');
});

test('today action - setToday', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();

  run(() => component.set('selectedDate', new Date( 2014, 2, 16 )));
  var date = new Date();

  run(() => component.send('today'));
  assert.equal( component.get('month'), date.getMonth(), `'month' should be ${date.getMonth()}` );
  assert.equal( component.get('year'), date.getFullYear(), `'year' should be ${date.getFullYear()}` );
});
