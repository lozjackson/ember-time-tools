import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-time-slot', 'Integration | Component | tt time slot', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{tt-time-slot}}`);

  assert.equal(this.$().text().trim(), '');

  assert.equal(this.$('li').length, 1);

  // Template block usage:"
  this.render(hbs`
    {{#tt-time-slot}}
      template block text
    {{/tt-time-slot}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
