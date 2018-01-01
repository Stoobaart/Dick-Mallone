import Component from '@ember/component';
import Ember from 'ember';

const { get, run: {later}, set, $ } = Ember;

export default Component.extend({

	state: Ember.inject.service('state-handler'),

	cupPickedUp: Ember.computed('state.pickedupcup', function() {
		return get(this, 'state.pickedupcup');
	}),

  travelMapOpened: Ember.computed('state.travelMapOpened', function() {
    return get(this, 'state.travelMapOpened');
  }),

	didInsertElement() {
    this._super(...arguments);
    get(this, 'cupPickedUp');
    set(this, 'scene', 'car');
    $("#carDoor")[0].play();
    $(".car-foreground, .map").fadeIn(750);
    $(".rain-container, .car-background, .exit-car").fadeIn(2000);

    later(() => {
      $(".car-foreground, .cup, .map").addClass('shake');
    }, 1500);
  },

  actions: {
    travel(e) {
      if (e.target.id === get(this, 'state.previousScene')) {
        alert("Already here");
      } else {
        debugger;
        const sceneName = `${e.target.id}-scene`;
        set(this, 'state.componentName', sceneName);
        $("#player").hide();
      }
    }
  }

});