import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-picker-item', 'Integration | Component | tt picker item', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{tt-picker-item}}`);
  assert.equal(this.$().text().trim(), '');
  assert.equal(this.$('td').length, 1);

  this.render(hbs`
    {{#tt-picker-item}}
      template block text
    {{/tt-picker-item}}
  `);
  assert.equal(this.$().text().trim(), 'template block text');
});
