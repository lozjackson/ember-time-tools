
import Ember from 'ember';

export default Ember.Controller.extend({

  selection: null,

  // BEGIN-SNIPPET date-picker-actions
  actions: {
    selectDate(date) {
      this.set('selection', date);
    }
  }
  // END-SNIPPET
});
