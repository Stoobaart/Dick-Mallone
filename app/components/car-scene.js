import Component from '@ember/component';
import Ember from 'ember';

const {
  computed,
  computed: {
    alias
  },
  get,
  inject: {
    service
  },
  run: {later},
  set,
  $
} = Ember;

export default Component.extend({

	state: service('state-handler'),

	cupPickedUp: computed('state.pickedupcup', function() {
		return get(this, 'state.pickedupcup');
	}),

  travelMapOpened: alias('state.travelMapOpened'),

	didInsertElement() {
    this._super(...arguments);
    get(this, 'cupPickedUp');
    set(this, 'state.previousScene', get(this, 'scene'));
    set(this, 'scene', 'car-scene');
    $('#player').hide();
    $("#carDoor")[0].play();
    $(".car-foreground, .map").fadeIn(750);
    $(".rain-container, .car-background, .exit-car").fadeIn(2000);

    later(() => {
      $("#rainSoundFx")[0].play();
      $(".car-foreground, .cup, .map").addClass('shake');
    }, 1500);
  },

  willDestroyElement() {
    set(this, 'state.travelMapOpened', false);
  },

  actions: {
    travel(e) {
      if (e.target.id === 'station' && !get(this, 'state.pickedupshards') || e.target.id === 'station' && !get(this, 'state.pickedupfullcup')) {
        return this.sendAction('playerSpeach', "I should investigate the scene a little more");
      }
      if ((e.target.id + '-scene') === get(this, 'state.previousScene')) {
        this.sendAction('playerSpeach', "I'm already here");
      } else {
        this.sendAction('changeScene', e.target.id, get(this, 'scene'));
      }
    },

    closeMap() {
      this.toggleProperty('state.travelMapOpened');
    }
  }

});