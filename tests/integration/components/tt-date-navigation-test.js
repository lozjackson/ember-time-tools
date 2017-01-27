import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-date-navigation', 'Integration | Component | tt date navigation', {
  integration: true
});

test('it renders', function(assert) {
  this.set('back', () => {});
  this.set('today', () => {});
  this.set('forward', () => {});
  this.render(hbs`{{tt-date-navigation back=back today=today forward=forward}}`);
  assert.equal(this.$('.uic-button-group.navigation.extra-small').length, 1);
});
