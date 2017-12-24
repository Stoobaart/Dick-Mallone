import Component from '@ember/component';
import Ember from 'ember';

const { get, set } = Ember;

export default Component.extend({

  state: Ember.inject.service('state-handler'),

  componentName: null,

  init() {
    this._super(...arguments);
    set(this, 'componentName', get(this, 'state').componentName + '-scene');
  }
	
});
