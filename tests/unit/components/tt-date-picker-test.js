import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

const { run } = Ember;

moduleForComponent('tt-date-picker', 'Unit | Component | tt date picker', {
  needs: [
    'component:tt-picker-item',
    'component:tt-year-option',
    'component:tt-month-option',
    'component:tt-date-navigation',
    'component:svg-triangle',
    'component:uic-button',
    'component:uic-close-button'
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

test('months', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.deepEqual(component.get('months'), ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
});

test('weekStart should be 1', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('weekStart'), 1);
});

test('numberOfWeeks should be 6', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('numberOfWeeks'), 6);
});

test('output should be date', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('output'), 'date');
});

test('viewRange should be date', function(assert) {
  let component = this.subject();
  this.render();
  assert.equal(component.get('viewRange'), 'date');
});

test('year should be viewDate.year', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();
  run(() => component.setViewDate('1977/8/24'));
  assert.equal(component.get('year'), 1977);

  run(() => component.setViewDate('1982/5/13'));
  assert.equal(component.get('year'), 1982);
});

test('month should be viewDate.month', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();
  run(() => component.setViewDate('1977/8/24'));
  assert.equal(component.get('month'), 7);

  run(() => component.setViewDate('1982/5/13'));
  assert.equal(component.get('month'), 4);
});

test('decade', function(assert) {
  let component = this.subject();
  this.render();
  run(() => component.set('viewDate.date', '2007/8/1'));
  assert.deepEqual(component.get('decade'), { start: 2000, end: 2009 });
});

test('displayMonths', function(assert) {
  let component = this.subject();
  this.render();
  assert.deepEqual(component.get('displayMonths'), false);
  run(() => component.set('viewRange', 'month'));
  assert.deepEqual(component.get('displayMonths'), true);
  run(() => component.set('viewRange', 'year'));
  assert.deepEqual(component.get('displayMonths'), false);
});

test('displayYears', function(assert) {
  let component = this.subject();
  this.render();
  assert.deepEqual(component.get('displayYears'), false);
  run(() => component.set('viewRange', 'year'));
  assert.deepEqual(component.get('displayYears'), true);
  run(() => component.set('viewRange', 'month'));
  assert.deepEqual(component.get('displayYears'), false);
});

test('daysOfWeek', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();

  run(() => component.set('weekStart', 0));
  assert.deepEqual(component.get('daysOfWeek'), [
    {name: "S"}, {name: "M"}, {name: "T"}, {name: "W"}, {name: "T"}, {name: "F"}, {name: "S"}
  ]);

  run(() => component.set('weekStart', 1));
  assert.deepEqual(component.get('daysOfWeek'), [
    {name: "M"}, {name: "T"}, {name: "W"}, {name: "T"}, {name: "F"}, {name: "S"}, {name: "S"}
  ]);
});

test('monthName', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();
  run(() => component.setViewDate('1977/8/24'));
  assert.equal(component.get('monthName'), 'August');

  run(() => component.setViewDate('1982/5/13'));
  assert.equal(component.get('monthName'), 'May');
});

test('weeks', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  run(() => component.setViewDate('1977/8/24'));
  assert.deepEqual(component.get('weeks.length'), 6);
});

test('startDay', function(assert) {
  assert.expect(4);
  var component = this.subject();
  this.render();
  run(() => component.set('weekStart', 0));
  run(() => component.setViewDate('1977/8/24'));
  assert.deepEqual(component.get('startDay'), 1);

  run(() => component.setViewDate('1982/5/13'));
  assert.deepEqual(component.get('startDay'), 6);

  run(() => component.set('weekStart', 1));

  run(() => component.setViewDate('1977/8/24'));
  assert.deepEqual(component.get('startDay'), 0);

  run(() => component.setViewDate('1982/5/13'));
  assert.deepEqual(component.get('startDay'), 5);
});

test('chooseMonth() method', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();
  assert.equal(component.get('viewRange'), 'date');
  run(() => component.chooseMonth());
  assert.equal(component.get('viewRange'), 'month');
});

test('chooseYear() method', function(assert) {
  assert.expect(2);
  var component = this.subject();
  this.render();
  assert.equal(component.get('viewRange'), 'date');
  run(() => component.chooseYear());
  assert.equal(component.get('viewRange'), 'year');
});

test('_setMonth() method', function(assert) {
  assert.expect(6);
  var component = this.subject({ viewRange: 'month' });
  this.render();
  run(() => component.set('viewDate.date', `2016/10/1`));
  assert.equal(component.get('month'), '9');
  assert.equal(component.get('year'), '2016');
  assert.equal(component.get('viewRange'), 'month');
  run(() => component._setMonth(4));
  assert.equal(component.get('month'), '4');
  assert.equal(component.get('year'), '2016');
  assert.equal(component.get('viewRange'), 'date');
});

test('_setYear() method', function(assert) {
  assert.expect(6);
  var component = this.subject({ viewRange: 'year' });
  this.render();
  run(() => component.set('viewDate.date', `2016/10/1`));
  assert.equal(component.get('month'), '9');
  assert.equal(component.get('year'), '2016');
  assert.equal(component.get('viewRange'), 'year');
  run(() => component._setYear(1977));
  assert.equal(component.get('month'), '9');
  assert.equal(component.get('year'), '1977');
  assert.equal(component.get('viewRange'), 'month');
});

test('setToday() method', function(assert) {
  assert.expect(1);
  var component = this.subject({
    setViewDate: (date) => assert.deepEqual(date, new Date())
  });
  this.render();
  component.setToday();
});

test('setViewDate() method', function(assert) {
  assert.expect(4);
  var component = this.subject();
  this.render();
  run(() => component.setViewDate('1977/8/24'));
  assert.equal(component.get('month'), 7);
  assert.equal(component.get('year'), 1977);

  run(() => component.setViewDate('1982/5/13'));
  assert.equal(component.get('month'), 4);
  assert.equal(component.get('year'), 1982);
});

test('_selectDate() method - select action', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let component = this.subject({
    select: time => assert.deepEqual(time, date)
  });
  this.render();
  component._selectDate({year: 1977, month: 7, date: 24});
});

test('_selectDate() method - selectedDate property', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);

  let component = this.subject();
  this.render();
  run(() => component._selectDate({year: 1977, month: 7, date: 24}));
  assert.deepEqual(component.get('selectedDate'), date);
});

test('_selectDate() method should not alter the time part of the selectedDate property', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24,10);

  let component = this.subject({
    selectedDate: new Date(2017,3,1,10)
  });
  this.render();
  run(() => component._selectDate({year: 1977, month: 7, date: 24}));
  assert.deepEqual(component.get('selectedDate'), date);
});

test('_selectDate() method - output = date', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let component = this.subject({
    output: 'date',
    select: time => assert.deepEqual(time, date)
  });
  this.render();
  component._selectDate({year: 1977, month: 7, date: 24});
});

test('_selectTime() method - output = timestamp', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);

  let component = this.subject({
    output: 'timestamp',
    select: time => assert.deepEqual(time, date.getTime())
  });
  this.render();
  component._selectDate({year: 1977, month: 7, date: 24});
});

test('_selectDate() method - output = object', function(assert) {
  assert.expect(1);
  let date = new Date(1977,7,24);
  let object = Ember.Object.create({
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    _date: date,
    timestamp: date.getTime()
  });

  let component = this.subject({
    output: 'object',
    select: time => assert.deepEqual(time, object)
  });
  this.render();
  component._selectDate({year: 1977, month: 7, date: 24});
});

test('_prevMonth() method', function(assert) {
  assert.expect(8);
  let component = this.subject();
  let date = new Date(1977, 2, 24);
  this.render();

  run(() => component.setViewDate(date));
  assert.equal(component.get('month'), 2);
  assert.equal(component.get('year'), 1977);

  run(() => component._prevMonth());
  assert.equal(component.get('month'), 1);
  assert.equal(component.get('year'), 1977);

  run(() => component._prevMonth());
  assert.equal(component.get('month'), 0);
  assert.equal(component.get('year'), 1977);

  run(() => component._prevMonth());
  assert.equal(component.get('month'), 11);
  assert.equal(component.get('year'), 1976);
});

test('_nextMonth() method', function(assert) {
  assert.expect(6);
  let component = this.subject();
  let date = new Date(1977, 10, 24);
  this.render();
  run(() => component.setViewDate(date));
  assert.equal(component.get('month'), 10);
  assert.equal(component.get('year'), 1977);

  run(() => component._nextMonth());
  assert.equal(component.get('month'), 11);
  assert.equal(component.get('year'), 1977);

  run(() => component._nextMonth());
  assert.equal(component.get('month'), 0);
  assert.equal(component.get('year'), 1978);
});

test('prevDecade() method', function(assert) {
  assert.expect(4);
  let component = this.subject();
  this.render();
  run(() => component.set('viewDate.date', '2016/8/24'));
  assert.equal(component.get('month'), '7');
  assert.equal(component.get('year'), '2016');
  run(() => component.prevDecade());
  assert.equal(component.get('month'), '7');
  assert.equal(component.get('year'), '2000');
});

test('nextDecade() method', function(assert) {
  assert.expect(4);
  let component = this.subject();
  this.render();
  run(() => component.set('viewDate.date', '2016/8/24'));
  assert.equal(component.get('month'), '7');
  assert.equal(component.get('year'), '2016');
  run(() => component.nextDecade());
  assert.equal(component.get('month'), '7');
  assert.equal(component.get('year'), '2020');
});

test('setMonth action', function(assert) {
  assert.expect(1);
  let component = this.subject({
    _setMonth: (month) => {
      assert.equal(month, 2);
    }
  });
  this.render();
  component.send('setMonth', 2);
});

test('setYear action', function(assert) {
  assert.expect(1);
  let component = this.subject({
    _setYear: (year) => {
      assert.equal(year, 2010);
    }
  });
  this.render();
  component.send('setYear', 2010);
});
