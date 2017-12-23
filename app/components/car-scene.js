import Component from '@ember/component';
import Ember from 'ember';

const { set, $ } = Ember;

export default Component.extend({

	state: Ember.inject.service('state-handler'),

	cupPickedUp: Ember.computed('state.pickedupcup', function() {
		return this.get('state.pickedupcup');
	}),

	didInsertElement() {
    this._super(...arguments);
    this.get('cupPickedUp');
    set(this, 'scene', 'car');
    $("#carDoor")[0].play();
    $(".car-foreground, .map").fadeIn(750);
    $(".rain-container, .car-background, .exit-car").fadeIn(2000);
  },

});