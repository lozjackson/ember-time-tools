import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-time-picker', 'Integration | Component | tt time picker', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{tt-time-picker}}`);
  assert.equal(this.$('.tt-time-picker.container').length, 1);
});
