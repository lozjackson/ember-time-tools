import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-month-option', 'Integration | Component | tt month option', {
  integration: true
});

test('it has the correct tagName', function(assert) {
  this.render(hbs`{{tt-month-option}}`);
  assert.equal(this.$('td').length, 1);
});

test('it has the correct classNames', function(assert) {
  this.render(hbs`{{tt-month-option}}`);
  assert.equal(this.$('.option').length, 1);
});

test('monthName', function(assert) {
  this.render(hbs`{{tt-month-option value=4}}`);
  assert.equal(this.$().text().trim(), 'MAY');
});

test('classNameBindings - monthSelected', function(assert) {
  this.set('monthSelected', false);
  this.render(hbs`{{tt-month-option monthSelected=monthSelected}}`);
  assert.equal(this.$('.month-selected').length, 0);

  this.set('monthSelected', true);
  assert.equal(this.$('.month-selected').length, 1);

  this.set('monthSelected', false);
  assert.equal(this.$('.month-selected').length, 0);
});

test('monthSelected', function(assert) {
  this.set('selectedMonth', 5);
  this.render(hbs`{{tt-month-option value="6" selectedMonth=selectedMonth}}`);
  assert.equal(this.$('.month-selected').length, 0);

  this.set('selectedMonth', 6);
  assert.equal(this.$('.month-selected').length, 1);

  this.set('selectedMonth', 7);
  assert.equal(this.$('.month-selected').length, 0);
});

test('click calls setMonth', function(assert) {
  assert.expect(1);
  this.set('actions.setMonth', year => assert.equal(year, 5));
  this.render(hbs`{{tt-month-option value="5" setMonth=(action "setMonth")}}`);
  this.$('.option').click();
});
