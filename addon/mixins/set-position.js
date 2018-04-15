/**
  @module ember-ui-components
*/
import Mixin from '@ember/object/mixin';
import getMousePosition from 'ember-ui-components/utils/get-mouse-position';
import setPosition from 'ember-ui-components/utils/set-position';

/**
  @class SetPositionMixin
  @namespace Mixins
*/
export default Mixin.create({

  /**
    @property classNameBindings
    @type {Array}
    @private
    @default `['setPositionByCursor:fixed']`
  */
  classNameBindings: ['setPositionByCursor:fixed'],

  /**
    If set to `true` the position of the datepicker will be set to the position
    of the mouse click.  If false, then the position will be set to the bottom/left
    corner of the destinationElement.

    @property setPositionByCursor
    @type {Boolean}
    @default `false`
  */
  setPositionByCursor: false,

  /**
    ## setPosition
    Set the left/top css properties of an element.
    `element` should be a reference to an HTML element.  Either a string selector
    that can be used with jQuery, or a jQuery selection object.
    If `position` is not specified, then the current mouse position will be used.
    `position` should be an Ember.Object with `x` and `y` properties.
    Both `x` and `y` should be numbers
    @method setPosition
    @param {String|Object} element
    @param {Object} position
    @private
  */
  setPosition,

  /**
    @method didInsertElement
    @private
  */
  didInsertElement() {
    this._super(...arguments);
    if (this.get('setPositionByCursor')) {
      this.setPosition(this.$(), getMousePosition(window.event));
    }
  },
});
