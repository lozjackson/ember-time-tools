import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';

export default Ember.Component.extend(InViewportMixin, {

  showContent: false,

  didEnterViewport() {
    this.set('showContent', true);
  }
});
