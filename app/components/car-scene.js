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
    set(this, 'state.previousScene', get(this, 'scene'));
    set(this, 'scene', 'car');
    $("#carDoor")[0].play();
    $("#rainSoundFx")[0].play();
    $(".car-foreground, .map").fadeIn(750);
    $(".rain-container, .car-background, .exit-car").fadeIn(2000);

    later(() => {
      $(".car-foreground, .cup, .map").addClass('shake');
    }, 1500);
  },

  actions: {
    travel(e) {
      debugger;
      if (e.target.id === 'station' && !get(this, 'state.pickedupshards') || e.target.id === 'station' && !get(this, 'state.pickedupfullcup')) {
        $('.walkable-area, .thing, .footer-bar').hide();
        this.sendAction('playerSpeach', "I should investigate the scene a little more");
        return later(() => {
          $('.walkable-area, .thing, .footer-bar').show();
        }, 2500);
      }
      if (e.target.id === get(this, 'state.previousScene')) {
        $('.walkable-area, .thing, .footer-bar').hide();
        this.sendAction('playerSpeach', "I'm already here");
        return later(() => {
          $('.walkable-area, .thing, .footer-bar').show();
        }, 1000);
      } else {
        this.toggleProperty('state.travelMapOpened');
        this.sendAction('changeScene', e.target.id, get(this, 'scene'));      
      }
    }
  }

});