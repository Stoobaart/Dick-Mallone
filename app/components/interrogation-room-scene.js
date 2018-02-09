import $ from 'jquery';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { set, observer, get, computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  state: service('state-handler'),

  paperUsedObserver: observer('state.blankpaperUsed', function() {
    this.crackheadGivenPaper();
  }),

  jenkinsConvoCompleted: computed('state.anythingelseCovered', function() {
    if (get(this, 'state.anythingelseCovered') && !get(this, 'state.pickedupportrait')) {
      this.crackheadFinishedDrawing();
    }
  }),

  init() {
    this._super(...arguments);
    get(this, 'state.blankpaperUsed');
  },

  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'interrogation-room-scene');
    $("#player").css({top: 441, left: 980.5}).html('<img class="playerSprite" src="sprites/dickLeft.png">');
    $("#player").fadeIn(500);
    $('#interrogationRoomMusic')[0].play();
    $('#stationDoor')[0].play();
    get(this, 'jenkinsConvoCompleted');
  },

  willDestroyElement() {
    $('#interrogationRoomMusic')[0].pause();
  },

  crackheadGivenPaper() {
    later(() => {
      $(".player-speak").hide();
      this.sendAction('npcSpeach', "Okay, I'll try my best chief, come back in a little while");
    }, 3000)
  },

  crackheadFinishedDrawing() {
    later(() => {
      $(".player-speak").hide();
      this.sendAction('startAScene', 'crackhead-portrait', 'crackhead');
      get(this, 'state').add('portrait');
    }, 2000)
  }

});
