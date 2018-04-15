import Controller from '@ember/controller';

export default Controller.extend({

  selection: null,

  timeInterval: 30,

  // BEGIN-SNIPPET time-picker-actions
  actions: {
    selectTime(time) {
      this.set('selection', time);
    }
  }
  // END-SNIPPET
});
