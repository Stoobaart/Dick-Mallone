import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { set, observer, get, computed } from '@ember/object';
import $ from 'jquery';
import Component from '@ember/component';

export default Component.extend({

  state: service('state-handler'),

  syringePickedUp: computed('state.pickedupsyringe', function() {
    return get(this, 'state.pickedupsyringe');
  }),

  crimeSceneCompleted: observer('state.pickedupshards', 'state.pickedupfullcup', 'state.pickedupsyringe', function() {
    if (get(this, 'state.pickedupshards') && get(this, 'state.pickedupfullcup') && get(this, 'state.pickedupsyringe')) {
      this.stationSceneUnlocked();
    }
  }),

  jenkinsVanished: alias('state.jenkinsVanished'),

  init() {
    this._super(...arguments);
    this.getProperties('state.pickedupshards', 'state.pickedupfullcup');
  },

  didInsertElement() {
    this._super(...arguments);
    set(this, 'scene', 'crime-scene');

    $("#npcRodriguez").fadeIn(500);
    $("#player").stop().fadeIn(500).css({top: 295, left: 250}).html('<img class="playerSprite" src="sprites/dick.png">');
    $(".scene-one, .rain-container").fadeIn(1000);

    $("#carDoor")[0].play();
    $("#crimeSceneMusic")[0].play();
    $("#rainSoundFx")[0].play();
  },

  willDestroyElement() {
    $("#crimeSceneMusic")[0].pause();
  },

  stationSceneUnlocked() {
    if(!(get(this, 'state.stationUnlocked'))) {
      set(this, 'state.stationUnlocked', true);
      later(() => {
        $(".player-speak").hide();
        this.sendAction('npcSpeach', "Dick I just had a call from Jen at the station, she says that crackhead is ready to talk now");
      }, 5000);
    } else {
      return;
    }
  }

});