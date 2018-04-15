import Controller from '@ember/controller';

export default Controller.extend({

  selection: null,

  // BEGIN-SNIPPET date-picker-actions
  actions: {
    selectDate(date) {
      this.set('selection', date);
    }
  }
  // END-SNIPPET
});
