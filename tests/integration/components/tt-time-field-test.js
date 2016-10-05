import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-time-field', 'Integration | Component | tt time field', {
  integration: true
});

test('it has correct tagName and classNames', function(assert) {
  this.render(hbs`{{tt-time-field}}`);
  assert.equal(this.$('input.ember-text-field.tt-time-field.no-select').length, 1);
});
