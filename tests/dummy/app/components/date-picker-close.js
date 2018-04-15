import Component from '@ember/component';

export default Component.extend({

  showDatePicker: true,

  // BEGIN-SNIPPET date-picker-close-action
  actions: {
    toggleDatePicker() {
      this.toggleProperty('showDatePicker');
    }
  }
  // END-SNIPPET
});
