import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-event-container', 'Integration | Component | tt event container', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tt-event-container}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tt-event-container}}
      template block text
    {{/tt-event-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('has correct tag and class', function(assert) {
  assert.expect(1);
  this.render(hbs`{{tt-event-container}}`);
  assert.equal(this.$('div.event-container').length, 1);
});
