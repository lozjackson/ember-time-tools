
import Ember from 'ember';

export default Ember.Controller.extend({

  selection: null,

  // BEGIN-SNIPPET time-picker-actions
  actions: {
    selectTime(time) {
      this.set('selection', time);
    }
  }
  // END-SNIPPET
});
