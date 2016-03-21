import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

var run = Ember.run;

moduleForComponent('tt-calendar-week-row', 'Unit | Component | tt calendar week row', {
  // Specify the other units that are required for this test
  needs: [
    'component:tt-calendar-weekrow-day'
  ],
  unit: true
});

var Day = Ember.Object.extend({
  date: null,
  month: null,
  year: null,
  inMonth: false
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
  assert.equal(component.get('classNames.length'), 2, `'classNames.length' should be 2`);
});

test('days', function(assert) {
  assert.expect(1);
  // var row = Ember.Object.create({
  //   days: Ember.A([1,2,3,4,5,6,7])
  // });
  var days = Ember.A([1,2,3,4,5,6,7]);
  var component = this.subject();

  component.set( 'days', days );
  this.render();
  assert.equal(component.get('days.length'), 7, `'days.length' should be 7`);
});

test('events', function(assert) {
  assert.expect(1);

  var event1 = Ember.Object.create({
    description: `event1`,
    start:  new Date(2015,10,26,11,0,0).getTime(),
    end : new Date(2015,10,27,11,0,0).getTime()
  });

  var event2 = Ember.Object.create({
    description: `event2`,
    start:  new Date(2015,10,19,11,0,0).getTime(),
    end : new Date(2015,10,20,11,0,0).getTime()
  });
  var days = Ember.A();
  for( var i = 23; i <= 29; i++) {
    days.pushObject(Day.create({
      date: i,
      month: 10,
      year: 2015,
      inMonth: true
    }));
  }

  // var row = Ember.Object.create({
  //   days: days
  // });
  var component = this.subject();
  component.set('model', Ember.A([ event1, event2 ]));
  component.set( 'days', days );
  this.render();
  assert.equal(component.get('events.length'), 1, `'events.length' should be 1`);
});

test('add an event', function(assert) {
  assert.expect(2);



  var event1 = Ember.Object.create({
    description: `event1`,
    start:  new Date(2015,10,26,11,0,0).getTime(),
    end : new Date(2015,10,27,11,0,0).getTime()
  });

  var event2 = Ember.Object.create({
    description: `event2`,
    start:  new Date(2015,10,24,11,0,0).getTime(),
    end : new Date(2015,10,25,11,0,0).getTime()
  });
  var days = Ember.A();
  for( var i = 23; i <= 29; i++) {
    days.pushObject(Day.create({
      date: i,
      month: 10,
      year: 2015,
      inMonth: true
    }));
  }

  // var row = Ember.Object.create({
  //   days: days
  // });
  var model = Ember.A([ event1 ]);
  var component = this.subject();
  component.setProperties({ model: model, days: days });
  this.render();
  assert.equal(component.get('events.length'), 1, `'events.length' should be 1`);

  run(() => model.pushObject( event2 ));
  assert.equal(component.get('events.length'), 2, `'events.length' should be 2`);
});

test('change event times', function(assert) {
  assert.expect(2);



  var event1 = Ember.Object.create({
    description: `event1`,
    start:  new Date(2015,10,26,11,0,0).getTime(),
    end : new Date(2015,10,27,11,0,0).getTime()
  });

  var event2 = Ember.Object.create({
    description: `event2`,
    start:  new Date(2015,10,19,11,0,0).getTime(),
    end : new Date(2015,10,20,11,0,0).getTime()
  });
  var days = Ember.A();
  for( var i = 23; i <= 29; i++) {
    days.pushObject(Day.create({
      date: i,
      month: 10,
      year: 2015,
      inMonth: true
    }));
  }

  var component = this.subject();
  component.setProperties({
    model: Ember.A([ event1, event2 ]),
    days: days
  });
  this.render();
  assert.equal(component.get('events.length'), 1, `'events.length' should be 1`);

  run(() => event2.setProperties({
    start:  new Date(2015,10,24,11,0,0).getTime(),
    end : new Date(2015,10,25,11,0,0).getTime()
  }));
  assert.equal(component.get('events.length'), 2, `'events.length' should be 2`);
});
