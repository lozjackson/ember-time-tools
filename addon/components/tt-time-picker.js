/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-time-picker';
import ClickOutsideMixin from 'ember-ui-components/mixins/click-outside';
import SetPositionMixin from 'ember-time-tools/mixins/set-position';

const { computed } = Ember;

/**
  @class TimePickerComponent
  @uses Mixins.SetPositionMixin
  @namespace Time
*/
export default Ember.Component.extend(ClickOutsideMixin, SetPositionMixin, {

  layout,

  /**
    @property classNames
    @type {Array}
    @private
    @default `['tt-time-picker', 'container']`
  */
  classNames: ['tt-time-picker', 'container'],

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
    @property displayFormat
    @type {String}
    @default `hh:mm a`
  */
  displayFormat: 'hh:mm a',

  /**
    ## Time interval

    The `timeInterval` specifies the interval used for the time picker.  An interval
    of 10 will produce a time picker that will have times every ten minutes starting
    on the hour.  If set to 30, the default, the time picker will have half-hour
    intervals.

    @property timeInterval
    @type {Integer}
    @default `30`
  */
  timeInterval: 30,

  /**
    @property selectedTime
    @type {Object}
  */
  selectedTime: null,

  /**
    ## Scroll to selected time

    With this property set to `true` the time picker will scroll to display the
    selected time.  If that is not the desired behaviour then you can set
    `scrollToSelectedTime` to `false`.

    ```
    {{time-picker scrollToSelectedTime=false}}
    ```

    @property scrollToSelectedTime
    @type {Boolean}
    @default `true`
  */
  scrollToSelectedTime: true,

  /**
    This computed property takes the `selectedTime` property, which is a javascript
    `Date` object and returns an object with `hour` and `minute` properties.

    @property _selectedTime
    @type {Object}
    @private
  */
  _selectedTime: computed('selectedTime', function () {
    let selectedTime = this.get('selectedTime');
    if (!selectedTime) { return selectedTime; }
    if (Ember.typeOf(selectedTime) !== 'date') {
      selectedTime = new Date(selectedTime);
    }
    return { hour: selectedTime.getHours(), minute: selectedTime.getMinutes() };
  }),

  /**
    This is an array of time objects. Each object has two properties: `hour` and
    `minute`.  There is one object for each time slot available on the time picker.

    ```
    [
      { hour: 0, minute: 0 },
      { hour: 0, minute: 30 },
      { hour: 1, minute: 0 },
      { hour: 1, minute: 30 },
      { hour: 2, minute: 0 },
      // ...
    ]
    ```

    @property times
    @type {Array}
    @private
  */
  times: Ember.computed('timeInterval', function() {
    let i, d, output = [];
    let interval = this.get('timeInterval') || 1;
    let divisions = 60 / interval;
    for (i = 0; i < 24; i++) {
      for (d = 0; d < divisions; d++) {
        output.push({ hour: i, minute: interval * d });
      }
    }
    return output;
  }),

  /**
    @method handleClickOutside
    @private
  */
  handleClickOutside() {
    if (this.get('isDestroyed') || this.get('isDestroying')) { return; }
    this.sendAction('close');
  },

  /**
    @method didInsertElement
    @private
  */
  didInsertElement() {
    this._super(...arguments);
    if (this.get('scrollToSelectedTime')) {
      this.scrollToElement('.tt-time-picker li.time-selected');
    }
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
    @private
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
      this.set('selectedTime', time);
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
