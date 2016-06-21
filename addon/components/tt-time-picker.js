/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-time-picker';

/**
  @class TimePickerComponent
  @namespace Components
*/
export default Ember.Component.extend({

  layout,

  /**
    @property classNames
    @type {Array}
    @private
  */
  classNames: ['time-picker', 'container'],

  /**
    @property selectedTime
    @type {Object}
  */
  selectedTime: null,

  /**
    @property times
    @type {Array}
    @private
  */
  times: Ember.computed(function() {
    let timesArray = Ember.A();
    for (let i = 0; i < 24; i++) {
      timesArray.pushObject({ hours: i, mins: 0 });
      timesArray.pushObject({ hours: i, mins: 30 });
    }
    return timesArray;
  }),

  /**
    @method didInsertElement
    @private
  */
  didInsertElement() {
    this.scrollToElement('.time-picker li.time-selected');
  },

  /**
		Scrolls the page so that the element is in view.

		@method scrollToElement
		@param {String} selector This should be a css selector.  ie. 'div.selected-item'
    @private
	*/
	scrollToElement(selector) {
		Ember.run.scheduleOnce('afterRender', this, function () {
			let items = Ember.$(selector);
			if (items.length > 0) {
				items[0].scrollIntoView();
			}
		});
	},

  actions: {

    /**
      @method selectTime
      @param {Object} time
    */
    selectTime(time) {
      this.sendAction("select", time);
    },

    /**
      ACTION - Send action 'close'.
      @method close
    */
    close() {
      this.sendAction('close');
    }
  }
});
