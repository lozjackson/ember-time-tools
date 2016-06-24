import Ember from 'ember';

export default Ember.Component.extend({

  showTimePicker: true,
  
  // BEGIN-SNIPPET time-picker-close-action
  actions: {
    toggleTimePicker() {
      this.toggleProperty('showTimePicker');
    }
  }
  // END-SNIPPET
});
