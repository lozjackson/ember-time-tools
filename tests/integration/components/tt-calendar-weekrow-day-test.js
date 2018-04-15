import EmberObject from '@ember/object';
import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-calendar-weekrow-day', 'Integration | Component | tt calendar weekrow day', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  this.render(hbs`{{tt-calendar-weekrow-day}}`);
  assert.equal(this.$('div.day-cell').length, 1);
  assert.equal(this.$('div.day-cell > span.day-number').length, 1);
});

test('correct day number displays in the template', function(assert) {
  assert.expect(2);
  var today = new Date( 2014, 3, 15 );
  var day = EmberObject.create({
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear()
  });
  this.set( 'day', day );
  this.render(hbs`{{tt-calendar-weekrow-day day=day}}`);

  assert.equal(this.$().text().trim(), 15, `text should be 15`);

  run(() => day.incrementProperty( 'date' ));
  assert.equal(this.$().text().trim(), 16, `text should be 16`);
});

test('out-of-month class is applied correctly', function(assert) {
  assert.expect(3);
  var day = EmberObject.create({
    inMonth: false
  });
  this.set( 'day', day );
  this.render(hbs`{{tt-calendar-weekrow-day day=day}}`);

  assert.equal(this.$('.day-number.out-of-month').length, 1, `'out-of-month' class should be applied`);

  run(() => day.set( 'inMonth', true ));
  assert.equal(this.$('.day-number.out-of-month').length, 0, `'out-of-month' class should not be applied`);

  run(() => day.set( 'inMonth', false ));
  assert.equal(this.$('.day-number.out-of-month').length, 1, `'out-of-month' class should be applied`);
});

test('today', function(assert) {
  assert.expect(3);

  var today = new Date();
  var day = EmberObject.create({
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear()
  });

  this.render(hbs`{{tt-calendar-weekrow-day day=day}}`);
  assert.equal(this.$('.day-cell.calendar-today').length, 0);

  this.set( 'day', day );
  assert.equal(this.$('.day-cell.calendar-today').length, 1);

  run(() => day.incrementProperty( 'date' ));
  assert.equal(this.$('.day-cell.calendar-today').length, 0);
});

test('weekend', function(assert) {
  assert.expect(4);

  var date = new Date( 2014, 7, 15 );
  var day = EmberObject.create({
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  });
  this.set( 'day', day );

  this.render(hbs`{{tt-calendar-weekrow-day day=day}}`);
  assert.equal(this.$('.day-cell.weekend').length, 0);

  run(() => day.incrementProperty( 'date' ));
  assert.equal(this.$('.day-cell.weekend').length, 1);

  run(() => day.incrementProperty( 'date' ));
  assert.equal(this.$('.day-cell.weekend').length, 1);

  run(() => day.incrementProperty( 'date' ));
  assert.equal(this.$('.day-cell.weekend').length, 0);
});
