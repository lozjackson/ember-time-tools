import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('tt-date-field', 'Unit | Component | tt date field', {
  // Specify the other units that are required for this test
  // needs: [],
  unit: true
});


test('it renders', function(assert) {
  assert.expect(2);
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});

test('tagName should be input', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('tagName'), 'input');
});

test('size should be 14', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.get('size'), 14);
});

test('click() should blur the target element', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  let event = {
    target: {
      blur: () => assert.ok(true)
    }
  };
  component.click(event);
});

test('click() should call toggleDatePicker method', function(assert) {
  assert.expect(1);
  var component = this.subject({
    toggleDatePicker: () => assert.ok(true)
  });
  this.render();
  let event = {
    target: {
      blur: () => {}
    }
  };
  component.click(event);
});

test('keyPress() should return false', function(assert) {
  assert.expect(1);
  var component = this.subject();
  this.render();
  assert.equal(component.keyPress(), false);
});
