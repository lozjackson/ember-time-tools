import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

var run = Ember.run;

moduleForComponent('tt-calendar-month-event', 'Integration | Component | tt calendar month event', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{tt-calendar-month-event}}`);
  assert.equal(this.$().text().trim(), '');
});

test('layout', function(assert) {
  assert.expect(1);

  this.set('model', Ember.Object.create({
    event: Ember.Object.create({
      description: 'default layout'
    })
  }));

  this.render(hbs`{{tt-calendar-month-event model=model}}`);
  assert.equal(this.$().text().trim(), 'default layout', `'layout' should be 'default layout'`);
});

test('layout can be set', function(assert) {
  assert.expect(1);
  this.set( 'eventTemplate', hbs`testing` );
  this.render(hbs`{{tt-calendar-month-event layout=eventTemplate}}`);
  assert.equal(this.$().text().trim(), 'testing', `'layout' should be 'testing'`);
});

test('has correct tag and class', function(assert) {
  assert.expect(1);
  this.render(hbs`{{tt-calendar-month-event}}`);
  assert.equal(this.$('div.event').length, 1);
});

test('style attribute binds correctly', function (assert) {
  assert.expect(1);
  this.set('style', 'left:10%;right:10%;');
  this.render(hbs`{{tt-calendar-month-event style=style}}`);
  assert.equal(this.$('div.event').attr('style'), 'left:10%;right:10%;', `'style' attribute should be 'left:10%;right:10%;'`);
});

test('description', function(assert) {
  assert.expect(2);

  var model = Ember.Object.create({
    event: Ember.Object.create({ description: '' })
  });
  this.set('model', model);
  this.render(hbs`{{tt-calendar-month-event model=model}}`);
  assert.equal(this.$().text().trim(), '');

  run(() => this.set( 'model.event.description', 'abc' ));
  assert.equal(this.$().text().trim(), 'abc');
});

test('continuedLeft class binding works', function(assert) {
  assert.expect(1);
  this.set('continuedLeft', true);
  this.render(hbs`{{tt-calendar-month-event continuedLeft=continuedLeft}}`);
  assert.equal(this.$('div.event.continued-left').length, 1);
});

test('continuedRight class binding works', function(assert) {
  assert.expect(1);
  this.set('continuedRight', true);
  this.render(hbs`{{tt-calendar-month-event continuedRight=continuedRight}}`);
  assert.equal(this.$('div.event.continued-right').length, 1);
});

test('continuedLeft computed property works', function(assert) {
  assert.expect(3);
  var date = new Date(2014,4,5,0,0,0);
  var time = date.getTime();
  var model = Ember.Object.create({
    start: time
  });
  var evt = Ember.Object.create({
    event: model,
    week: Ember.Object.create({
      start: date
    })
  });
  this.set('evt', evt);
  this.render(hbs`{{tt-calendar-month-event model=evt}}`);
  assert.equal( this.$('div.event.continued-left').length, 0 );

  run(() => model.decrementProperty( 'start' ));
  assert.equal( this.$('div.event.continued-left').length, 1 );

  run(() => model.incrementProperty( 'start' ));
  assert.equal( this.$('div.event.continued-left').length, 0 );
});

test('continuedRight computed property works', function(assert) {
  assert.expect(3);
  var date = new Date(2014,4,4,23,59,59);
  var time = date.getTime();
  var model = Ember.Object.create({
    end: time
  });
  var evt = Ember.Object.create({
    event: model,
    week: Ember.Object.create({
      end: date
    })
  });
  this.set('evt', evt);
  this.render(hbs`{{tt-calendar-month-event model=evt}}`);
  assert.equal( this.$('div.event.continued-right').length, 0 );

  run(() => model.incrementProperty( 'end' ));
  assert.equal( this.$('div.event.continued-right').length, 1 );

  run(() => model.decrementProperty( 'end' ));
  assert.equal( this.$('div.event.continued-right').length, 0 );


});

test('hover class binding works', function(assert) {
  assert.expect(3);

  var model = Ember.Object.create({
    event: Ember.Object.create({hover: false})
  });
  model.set('event.hover', false);
  this.set('model', model);
  this.render(hbs`{{tt-calendar-month-event model=model}}`);
  assert.equal(this.$('div.event.hover').length, 0);

  run(() => model.set('event.hover', true));
  assert.equal(this.$('div.event.hover').length, 1);

  run(() => model.set('event.hover', false));
  assert.equal(this.$('div.event.hover').length, 0);
});

test('selected class binding works', function(assert) {
  assert.expect(3);
  var that = this;
  this.set('selected', false);

  this.render(hbs`{{tt-calendar-month-event selected=selected}}`);
  assert.equal(this.$('div.event.selected').length, 0);

  run(() => that.set( 'selected', true ) );
  assert.equal(this.$('div.event.selected').length, 1);

  run(() => that.set( 'selected', false ) );
  assert.equal(this.$('div.event.selected').length, 0);
});

// test('weekStart', function(assert) {
//   assert.expect(1);
//
//   var evt = Ember.Object.create({
//     week: Ember.Object.create({
//       start: 12345,
//       end: null
//     })
//   });
//   this.set('evt', evt);
//   this.render(hbs`{{tt-calendar-month-event model=evt}}`);
//   assert.equal(this.$('div.event.continued-right').length, 1);
// });

test('click triggers select', function(assert) {
  assert.expect(1);
  var model = Ember.Object.create({
    event: Ember.Object.create({ id:1 })
  });

  this.set('model', model);
  this.set( 'select', (model) => assert.equal( model.get('id'), 1, `'model.id' should be 1`) );
  this.render(hbs`{{tt-calendar-month-event model=model select=select}}`);
  this.$('div.event').click();
});
