import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

var run = Ember.run;

moduleForComponent('tt-calendar-month-event', 'Unit | Component | tt calendar month event', {
  // Specify the other units that are required for this test
  //needs: [],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

test('style', function (assert) {
  assert.expect(2);

  var event = Ember.Object.create({
    start: new Date(2014,4,5,0,0,0).getTime(),
    end: new Date(2014,4,11,23,59,59).getTime()
  });
  var model = Ember.Object.create({
    event: event,
    week: Ember.Object.create({
      start: new Date(2014,4,5,0,0,0),
      end: new Date(2014,4,11,23,59,59)
    })
  });

  var component = this.subject();
  this.render();
  run(() => component.set('model', model));
  assert.equal(component.get('style'), 'left: 0%; right: 0%;', `'style' should be 'left: 0%; right: 0%;'`);

  run(() => event.setProperties({
    start: new Date(2014,4,6,11,0,0).getTime(),
    end: new Date(2014,4,7,11,0,0).getTime()
  }));
  assert.equal(component.get('style'), 'left: 20.833333333333332%; right: 64.88078703703704%;', `'style' should be 'left: 20.833333333333332%; right: 64.88078703703704%;'`);
});

test('selected method', function (assert) {
  assert.expect(2);
  var event = Ember.Object.create({ id: 1 });
  var model = Ember.Object.create({ event: event });

  var component = this.subject();
  this.render();
  run(() => component.set('model', model));
  assert.equal( component.get('selected'), false, `'selected' should be false` );
  run(() => component.set('selectedEvent', event));
  assert.equal( component.get('selected'), true, `'selected' should be true` );
});

test('event alias', function(assert) {
  assert.expect(1);
  var date = new Date(2014,4,5,0,0,0);
  var time = date.getTime();
  var eventObject = Ember.Object.create({
    start: time
  });
  var evt = Ember.Object.create({
    event: eventObject
  });

  var component = this.subject();
  this.render();
  run(() => component.set('model', evt));
  assert.equal(component.get('event'), eventObject, `'event' should be ${eventObject}`);
});


test('eventStart', function(assert) {
  assert.expect(1);
  var date = new Date(2014,4,5,0,0,0);
  var time = date.getTime();
  var evt = Ember.Object.create({
    event: Ember.Object.create({
      start: time
    })
  });

  var component = this.subject();
  this.render();
  run(() => component.set('model', evt));
  assert.equal(component.get('eventStart'), time, `'eventStart' should be ${time}`);
});

test('eventEnd', function(assert) {
  assert.expect(1);
  var date = new Date(2014,4,5,0,0,0);
  var time = date.getTime();
  var evt = Ember.Object.create({
    event: Ember.Object.create({
      end: time
    })
  });

  var component = this.subject();
  this.render();
  run(() => component.set('model', evt));
  assert.equal(component.get('eventEnd'), time, `'eventEnd' should be ${time}`);
});

test('startOfWeek', function(assert) {
  assert.expect(1);
  var date = new Date(2014,4,5,0,0,0);
  var evt = Ember.Object.create({
    week: Ember.Object.create({
      start: date
    })
  });

  var component = this.subject();
  this.render();
  run(() => component.set('model', evt));
  assert.equal(component.get('startOfWeek'), date, `'startOfWeek' should be ${date}`);
});

test('endOfWeek', function(assert) {
  assert.expect(1);
  var date = new Date(2014,4,5,0,0,0);
  var evt = Ember.Object.create({
    week: Ember.Object.create({
      end: date
    })
  });

  var component = this.subject();
  this.render();
  run(() => component.set('model', evt));
  assert.equal(component.get('endOfWeek'), date, `'endOfWeek' should be ${date}`);
});

test('continuedLeft', function(assert) {
  assert.expect(3);
  var date = new Date(2014,4,5,0,0,0);
  var time = date.getTime();
  var evt = Ember.Object.create({
    event: Ember.Object.create({
      start: time +10
    }),
    week: Ember.Object.create({
      start: date
    })
  });

  var component = this.subject();
  this.render();
  run( () => component.set('model', evt) );
  assert.equal(component.get('continuedLeft'), false, `'continuedLeft' should be false`);

  run( () => evt.set('event.start', time - 1 ) );
  assert.equal(component.get('continuedLeft'), true, `'continuedLeft' should be true`);
  run( () => evt.incrementProperty('event.start') );
  assert.equal(component.get('continuedLeft'), false, `'continuedLeft' should be false`);
});

test('continuedRight', function(assert) {
  assert.expect(3);
  var date = new Date(2014,4,4,23,59,59);
  var time = date.getTime();
  var evt = Ember.Object.create({
    event: Ember.Object.create({
      end: time
    }),
    week: Ember.Object.create({
      end: date
    })
  });

  var component = this.subject();
  this.render();
  run( () => component.set('model', evt) );
  assert.equal(component.get('continuedRight'), false, `'continuedRight' should be false`);

  run( () => evt.set('event.end', time +1 ) );
  assert.equal(component.get('continuedRight'), true, `'continuedRight' should be true`);

  run( () => evt.decrementProperty('event.end') );
  assert.equal(component.get('continuedRight'), false, `'continuedRight' should be false`);
});
