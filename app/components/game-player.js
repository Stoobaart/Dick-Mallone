import Component from '@ember/component';
import Ember from 'ember';

const { get } = Ember;

export default Component.extend({

  state: Ember.inject.service('state-handler'),

  componentName: Ember.computed.alias('state.componentName'),

});
