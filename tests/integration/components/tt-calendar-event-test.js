import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-calendar-event', 'Integration | Component | tt calendar event', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('model', { description: 'foo' });
  this.render(hbs`{{tt-calendar-event model=model}}`);

  assert.equal(this.$().text().trim(), 'foo');

  this.set('model.description', 'bar');
  assert.equal(this.$().text().trim(), 'bar');
});

test('it has the correct tagName and className', function(assert) {
  this.render(hbs`{{tt-calendar-event}}`);
  assert.equal(this.$('li.calendar-event').length, 1);
});
