import EmberObject from '@ember/object';
import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import { A } from '@ember/array';

moduleForComponent('tt-calendar-month', 'Unit | Component | tt calendar month', {
  needs: [
    'component:svg-triangle',
    'component:tt-calendar-week-row',
    'component:tt-calendar-weekrow-day',
    'component:tt-event-container',
    'component:tt-date-navigation',
    'component:uic-button'
  ],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);
  let component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

test('should be 7 dayNames', function(assert) {
  assert.expect(1);
  let component = this.subject();
  this.render();

  let dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  assert.deepEqual(component.get('dayNames'), dayNames);
});

test('should be 12 monthNames', function(assert) {
  assert.expect(1);
  let component = this.subject();
  this.render();

  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  assert.deepEqual(component.get('monthNames'), monthNames);
});

test('sortProperties', function(assert) {
  assert.expect(1);
  let component = this.subject();
  this.render();
  let sortProperties = ['start:asc', 'end:asc'];
  assert.deepEqual(component.get('sortProperties'), sortProperties);
});

test('sortedEvents', function (assert) {
  assert.expect(2);
  let model1 = EmberObject.create({ id:1, start: 3 });
  let model2 = EmberObject.create({ id:2, start: 1 });
  let model3 = EmberObject.create({ id:3, start: 2 });
  let component = this.subject();
  component.set('events', A([ model1, model2, model3 ]));
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
  let component = this.subject();
  this.render();

  let date = new Date();
  let year = date.getFullYear();
  assert.equal(component.get('year'), year, `'year' should be ${year}`);
});

test('year follows viewDate', function(assert) {
  assert.expect(2);
  let component = this.subject();
  this.render();

  let date = new Date(2014, 1, 1);
  let year = date.getFullYear();
  run(() => component.set('viewDate.date', date ));
  assert.equal(component.get('year'), year, `'year' should be ${year}`);

  date = new Date(2012, 1, 1);
  year = date.getFullYear();
  run(() => component.set('viewDate.date', date ));
  assert.equal(component.get('year'), year, `'year' should be ${year}`);
});

test('month should default to today', function(assert) {
  assert.expect(1);
  let component = this.subject();
  this.render();

  let date = new Date();
  let month = date.getMonth();
  assert.equal(component.get('month'), month, `'month' should be ${month}`);
});

test('month follows viewDate', function(assert) {
  assert.expect(2);
  let component = this.subject();
  this.render();

  let date = new Date(2014, 4, 1);
  let month = date.getMonth();
  run(() => component.set('viewDate.date', date ));
  assert.equal(component.get('month'), month, `'month' should be ${month}`);

  date = new Date(2012, 8, 1);
  month = date.getMonth();
  run(() => component.set('viewDate.date', date ));
  assert.equal(component.get('month'), month, `'month' should be ${month}`);
});

test('month name is correct', function(assert) {
  assert.expect(2);
  let component = this.subject();
  this.render();

  run(() => component.set('viewDate.date', new Date(2014, 4, 1) ));
  assert.equal(component.get('monthName'), 'May', `'monthName' should be 'May'`);

  run(() => component.set('viewDate.date', new Date(2012, 8, 1) ));
  assert.equal(component.get('monthName'), 'September', `'monthName' should be 'September'`);
});

test('startDay', function(assert) {
  assert.expect(2);
  let component = this.subject();
  this.render();

  run(() => component.set('viewDate.date', new Date(2014, 4, 1)));
  assert.equal(component.get('startDay'), 3, `'startDay' should be 3`);

  run(() => component.set('viewDate.date', new Date(2014, 5, 1)));
  assert.equal(component.get('startDay'), 6, `'startDay' should be 6`);

});

test('weeks.length should be 6', function (assert) {
  assert.expect(1);
  let component = this.subject();
  this.render();
  assert.equal(component.get('weeks.length'), 6, `'weeks.length' should be 6`);
});

test('getLastMonth', function(assert) {
  assert.expect(2);
  let component = this.subject();
  this.render();
  assert.equal( component.getLastMonth(2), 1, `return value should be 1` );
  assert.equal( component.getLastMonth(0), 11, `return value should be 11` );
});

test('select', function(assert) {
  assert.expect(1);
  let model = EmberObject.create({ id:1 });
  let component = this.subject();
  this.render();
  run(() => component.select(model));
  assert.equal( component.get('selected.id'), 1, `'selected.id' should be 1` );
});


test('setToday defaults to today', function(assert) {
  assert.expect(3);
  let component = this.subject();
  this.render();
  let date = new Date();
  assert.equal(component.get('selectedDate').getDate(), date.getDate(), `'selectedDate.getDate()' should be ${date.getDate()}`);
  assert.equal(component.get('selectedDate').getMonth(), date.getMonth(), `'selectedDate.getMonth()' should be ${date.getMonth()}`);
  assert.equal(component.get('selectedDate').getFullYear(), date.getFullYear(), `'selectedDate.getFullYear()' should be ${date.getFullYear()}`);
});

test('setToday', function(assert) {
  assert.expect(1);
  let component = this.subject();
  this.render();
  let date = new Date(2014, 5, 18);
  run(() => component.setToday(date));
  assert.equal(component.get('viewDate.date').getTime(), date.getTime(), `'viewDate.date' should be ${date}`);
});

test('nextMonth method should increment month', function(assert) {
  assert.expect(2);
  let component = this.subject();
  this.render();

  run( () => component.set('viewDate.date', new Date( 2014, 2, 16 )) );
  assert.equal(component.get('month'), 2, `'month' should be 2`);

  run( () => component.nextMonth() );
  assert.equal(component.get('month'), 3, `'month' should be 3`);
});

test('prevMonth method should decrement month', function(assert) {
  assert.expect(2);
  let component = this.subject();
  this.render();

  run(() => component.set('selectedDate', new Date( 2014, 2, 16 )));
  assert.equal(component.get('month'), 2, `'month' should be 2`);

  run(() => component.prevMonth());
  assert.equal(component.get('month'), 1, `'month' should be 1`);
});

test('today action - setToday', function(assert) {
  assert.expect(2);
  let component = this.subject();
  this.render();

  run(() => component.set('selectedDate', new Date( 2014, 2, 16 )));
  let date = new Date();

  run(() => component.setToday());
  assert.equal( component.get('month'), date.getMonth(), `'month' should be ${date.getMonth()}` );
  assert.equal( component.get('year'), date.getFullYear(), `'year' should be ${date.getFullYear()}` );
});
