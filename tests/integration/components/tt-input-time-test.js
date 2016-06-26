import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tt-input-time', 'Integration | Component | tt input time', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{tt-input-time}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#tt-input-time}}
      template block text
    {{/tt-input-time}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('displayFormat', function(assert) {
  let time = new Date(0);
  time.setHours(15);
  time.setMinutes(5);
  this.set('time', time);

  this.render(hbs`{{tt-input-time value=time}}`);

  assert.equal(this.$('input').val(), '3:05 pm');
});

test('change displayFormat', function(assert) {
  let time = new Date(0);
  time.setHours(15);
  time.setMinutes(5);
  this.set('displayFormat', 'h:mm a');
  this.set('time', time);

  this.render(hbs`{{tt-input-time value=time displayFormat=displayFormat}}`);

  assert.equal(this.$('input').val(), '3:05 pm');

  this.set('displayFormat', 'h');
  assert.equal(this.$('input').val(), '3');

  this.set('displayFormat', 'H');
  assert.equal(this.$('input').val(), '15');

  this.set('displayFormat', 'H:mm');
  assert.equal(this.$('input').val(), '15:05');
});
