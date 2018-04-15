import Component from '@ember/component';

export default Component.extend({

  showTimePicker: true,
  
  // BEGIN-SNIPPET time-picker-close-action
  actions: {
    toggleTimePicker() {
      this.toggleProperty('showTimePicker');
    }
  }
  // END-SNIPPET
});
