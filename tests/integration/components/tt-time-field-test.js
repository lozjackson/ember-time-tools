import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-time-field', 'Integration | Component | tt time field', {
  integration: true
});

test('it has correct tagName and classNames', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{tt-time-field}}`);

  assert.equal(this.$('input.tt-time-field.no-select').length, 1);
});
