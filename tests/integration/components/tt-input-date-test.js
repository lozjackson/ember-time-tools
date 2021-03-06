import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-input-date', 'Integration | Component | tt input date', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{tt-input-date}}`);
  assert.equal(this.$('.input-date').length, 1);
});

test('displayFormat', function(assert) {
  let date = new Date(1977,7,24);
  this.set('date', date);

  this.render(hbs`{{tt-input-date value=date}}`);

  assert.equal(this.$('input').val(), 'Wed 24/08/1977');
});

test('placeholder', function(assert) {
  this.set('placeholder', 'foo');
  this.render(hbs`{{tt-input-date placeholder=placeholder}}`);
  assert.equal(this.$('input').attr('placeholder'), 'foo');

  this.set('placeholder', 'bar');
  assert.equal(this.$('input').attr('placeholder'), 'bar');
});

test('change displayFormat', function(assert) {
  let date = new Date(1977,7,24);
  this.set('displayFormat', 'ddd DD/MM/YYYY');
  this.set('date', date);

  this.render(hbs`{{tt-input-date value=date displayFormat=displayFormat}}`);

  assert.equal(this.$('input').val(), 'Wed 24/08/1977');

  this.set('displayFormat', 'DD/MM/YYYY');
  assert.equal(this.$('input').val(), '24/08/1977');

  this.set('displayFormat', 'Do MMMM, YYYY');
  assert.equal(this.$('input').val(), '24th August, 1977');

  this.set('displayFormat', 'ddd Do, MMM YYYY');
  assert.equal(this.$('input').val(), 'Wed 24th, Aug 1977');
});

test('disabled', function(assert) {

  this.render(hbs`{{tt-input-date disabled=disabled}}`);
  assert.equal(this.$('input').attr('disabled'), undefined);

  this.set('disabled', true);
  assert.equal(this.$('input').attr('disabled'), 'disabled');

  this.set('disabled', false);
  assert.equal(this.$('input').attr('disabled'), undefined);
});
