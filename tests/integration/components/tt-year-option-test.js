import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-year-option', 'Integration | Component | tt year option', {
  integration: true
});

test('it has the correct tagName', function(assert) {
  this.render(hbs`{{tt-year-option}}`);
  assert.equal(this.$('td').length, 1);
});

test('it has the correct classNames', function(assert) {
  this.render(hbs`{{tt-year-option}}`);
  assert.equal(this.$('.option').length, 1);
});

test('value - change decade', function(assert) {
  this.render(hbs`{{tt-year-option}}`);
  this.set('decade', '2010');
  this.render(hbs`
    {{tt-year-option decade=decade}}
  `);
  assert.equal(this.$().text().trim(), '2010');

  this.set('decade', '2020');
  assert.equal(this.$().text().trim(), '2020');

  this.set('decade', '2030');
  assert.equal(this.$().text().trim(), '2030');

  this.set('decade', '2000');
  assert.equal(this.$().text().trim(), '2000');
});

test('value - change unit', function(assert) {
  this.render(hbs`{{tt-year-option}}`);
  this.set('unit', 0);
  this.render(hbs`
    {{tt-year-option decade="2010" unit=unit}}
  `);
  assert.equal(this.$().text().trim(), '2010');

  this.set('unit', '2');
  assert.equal(this.$().text().trim(), '2012');

  this.set('unit', '5');
  assert.equal(this.$().text().trim(), '2015');

  this.set('unit', '8');
  assert.equal(this.$().text().trim(), '2018');
});

test('classNameBindings - yearSelected', function(assert) {
  this.set('yearSelected', false);
  this.render(hbs`{{tt-year-option yearSelected=yearSelected}}`);
  assert.equal(this.$('.year-selected').length, 0);

  this.set('yearSelected', true);
  assert.equal(this.$('.year-selected').length, 1);

  this.set('yearSelected', false);
  assert.equal(this.$('.year-selected').length, 0);
});

test('yearSelected', function(assert) {
  this.set('selectedYear', 2010);
  this.render(hbs`{{tt-year-option decade="2010" unit="2" selectedYear=selectedYear}}`);
  assert.equal(this.$('.year-selected').length, 0);

  this.set('selectedYear', 2012);
  assert.equal(this.$('.year-selected').length, 1);

  this.set('selectedYear', 2002);
  assert.equal(this.$('.year-selected').length, 0);
});

test('click calls setYear', function(assert) {
  assert.expect(1);
  this.set('actions.setYear', year => assert.equal(year, 2015));
  this.render(hbs`{{tt-year-option decade="2010" unit="5" setYear=(action "setYear")}}`);
  this.$('.option').click();
});
