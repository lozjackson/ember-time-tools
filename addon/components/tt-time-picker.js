/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-time-picker';

/**
  @class TimePickerComponent
  @namespace Time
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
    ### Output

    Options:

    * date - javascript `Date` object.
    * timestamp - number of seconds.
    * object - `Ember.Object` with `year`, `month` and `date` properties.

    @property output
    @type {String}
    @default 'date'
  */
  output: 'date',

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
      timesArray.pushObject({ hour: i, minute: 0 });
      timesArray.pushObject({ hour: i, minute: 30 });
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

  /**
    @method _selectTime
    @param {Object} time A POJO with properties for `hour` and `minute`.
  */
  _selectTime(time) {
    let output = this.get('output');
    let date = new Date(0);
    date.setHours(time.hour);
    date.setMinutes(time.minute);

    if (output) {
      switch(output) {
        default:
        case 'date':
          time = date;
          break;
        case 'timestamp':
          time = date.getTime();
          break;
        case 'object':
          time = Ember.Object.create({
            hour: date.getHours(),
            minute: date.getMinutes(),
            _date: date,
            timestamp: date.getTime()
          });
          break;
      }
    }

    if (this.get('select')) {
      this.sendAction('select', time);
    } else {
      this.set('selectedTime', time)
    }
  },

  actions: {

    /**
      @method selectTime
      @param {Object} time
    */
    selectTime(time) {
      this._selectTime(time);
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
