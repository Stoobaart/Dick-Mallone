import Component from '@ember/component';
import Ember from 'ember';

const {
  $,
  computed: {alias},
  inject: {service},
  set
} = Ember;

export default Component.extend({

  state: service('state-handler'),

  bizarreCovered: alias('state.bizarreCovered'),

  bloodCovered: alias('state.bloodCovered'),

  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'analysis-room-scene');
    $("#player").css({top: 441, left: 1180.5}).html('<img class="playerSprite" src="sprites/dickLeft.png">');
    $("#player").fadeIn(500);
    $('#analysisRoomMusic')[0].play();
    $('#stationDoor')[0].play();
    Ember.run.later(() => {
      this.sendAction('npcSpeach', "Aaah welcome back Detective");
    }, 1000);
  },

  willDestroyElement() {
    $('#analysisRoomMusic')[0].pause();
  }
});
