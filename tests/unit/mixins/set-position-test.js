import EmberObject from '@ember/object';
import SetPositionMixin from 'ember-time-tools/mixins/set-position';
import { module, test } from 'qunit';
import { typeOf } from '@ember/utils';

module('Unit | Mixin | set position');

test('it works', function(assert) {
  let SetPositionObject = EmberObject.extend(SetPositionMixin);
  let subject = SetPositionObject.create();
  assert.deepEqual(subject.get('classNameBindings'), ['setPositionByCursor:fixed']);
});

test('setPositionByCursor', function(assert) {
  let SetPositionObject = EmberObject.extend(SetPositionMixin);
  let subject = SetPositionObject.create();
  assert.equal(subject.get('setPositionByCursor'), false);
});

test('setPosition should be a function', function(assert) {
  let SetPositionObject = EmberObject.extend(SetPositionMixin);
  let subject = SetPositionObject.create();
  assert.equal(typeOf(subject.setPosition), 'function');
});

test('didInsertElement', function(assert) {

  assert.expect(2);
  window.event = { clientX: 10, clientY: 20 };
  let _element = {};
  let SetPositionObject = EmberObject.extend(SetPositionMixin);
  let subject = SetPositionObject.create({
    $: () => _element,
    setPosition: (element, position) => {
      assert.equal(element, _element);
      assert.deepEqual(position, EmberObject.create({ x: 10, y: 20 }));
    }
  });
  subject.didInsertElement(); // should not fire `setPosition`

  subject.set('setPositionByCursor', true);
  subject.didInsertElement(); // should fire `setPosition`

  subject.set('setPositionByCursor', false);
  subject.didInsertElement(); // should not fire `setPosition`
});
