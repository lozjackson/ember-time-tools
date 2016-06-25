import Ember from 'ember';

export default Ember.Component.extend({

  showDatePicker: true,

  // BEGIN-SNIPPET date-picker-close-action
  actions: {
    toggleDatePicker() {
      this.toggleProperty('showDatePicker');
    }
  }
  // END-SNIPPET
});
