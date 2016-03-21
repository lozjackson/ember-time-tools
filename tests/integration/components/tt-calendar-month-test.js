import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-calendar-month', 'Integration | Component | tt calendar month', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{tt-calendar-month}}`);

  assert.equal(this.$('div.tt-calendar-month.tt-calendar-container').length, 1);
});
