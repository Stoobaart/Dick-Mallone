import Component from '@ember/component';
import Ember from 'ember';

const { get, set } = Ember;

export default Component.extend({

  state: Ember.inject.service('state-handler'),

  componentName: Ember.computed('state.componentName', function() {
    return get(this, 'state.componentName') + '-scene';
  })
});
