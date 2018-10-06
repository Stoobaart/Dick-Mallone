import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({

  state: service('state-handler'),

  initialised: false,

  componentName: alias('state.componentName'),

});
