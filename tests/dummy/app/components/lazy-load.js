import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';

export default Component.extend(InViewportMixin, {

  showContent: false,

  didEnterViewport() {
    this.set('showContent', true);
  }
});
