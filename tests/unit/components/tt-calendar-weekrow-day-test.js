import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

var run = Ember.run;

moduleForComponent('tt-calendar-weekrow-day', 'Unit | Component | tt calendar weekrow day', {
  // Specify the other units that are required for this test
  // needs: [ ],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

test('date', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();

  var today = new Date(2014, 2, 18);
  var day = Ember.Object.create({
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear()
  });
  run(() => component.set('day', day));

  assert.equal(component.get('date'), 18, `'date' should be 18`);
});


test('month', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();

  var today = new Date(2014, 2, 18);
  var day = Ember.Object.create({
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear()
  });
  run(() => component.set('day', day));

  assert.equal(component.get('month'), 2, `'month' should be 2`);
});

test('year', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();

  var today = new Date(2014, 2, 18);
  var day = Ember.Object.create({
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear()
  });
  run(() => component.set('day', day));

  assert.equal(component.get('year'), 2014, `'year' should be 2014`);
});

test('today should be false', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal( component.get('today'), false, `'today' should be false` );
});

test('today is correct', function(assert) {
  assert.expect(3);
  var component = this.subject();
  this.render();
  var today = new Date();
  var day = Ember.Object.create({
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear()
  });
  assert.equal( component.get('today'), false, `'today' should be false` );

  run(() => component.set( 'day', day ));
  assert.equal( component.get('today'), true, `'today' should be true` );

  run(() => day.incrementProperty( 'date' ));
  assert.equal( component.get('today'), false, `'today' should be false` );
});

test('weekend is correct', function(assert) {
  assert.expect(4);
  var component = this.subject();
  this.render();
  var date = new Date( 2014, 7, 15 );
  var day = Ember.Object.create({
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  });
  run(() => component.set( 'day', day ));
  assert.equal( component.get('weekend'), false, `'weekend' should be false` );

  run(() => day.incrementProperty( 'date' ));
  assert.equal( component.get('weekend'), true, `'weekend' should be true` );

  run(() => day.incrementProperty( 'date' ));
  assert.equal( component.get('weekend'), true, `'weekend' should be true` );

  run(() => day.incrementProperty( 'date' ));
  assert.equal( component.get('weekend'), false, `'weekend' should be false` );
});
