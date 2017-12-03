import Component from '@ember/component';
// import Ember from 'ember';

export default Component.extend({

  init() {
    this._super(...arguments);
    this.set('scene', 'crimescene');
  }

});