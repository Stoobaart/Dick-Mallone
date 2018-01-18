import Component from '@ember/component';
import Ember from 'ember';

const {
  $,
  computed: {alias},
  get,
  inject: {service},
  run: {later},
  set
} = Ember;

export default Component.extend({

  state: service('state-handler'),

  paperUsed: alias('state.paperUsed'),

  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'station-scene');

    if (get(this, 'state.previousScene') === 'car-scene') {
      $("#player").css({top: 441, left: 1180.5}).html('<img class="playerSprite" src="sprites/dickLeft.png">');
    } else if (get(this, 'state.previousScene') === 'interrogation-room-scene') {
      $("#player").css({top: 371, left: 160.5}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    } else if (get(this, 'state.previousScene') === 'analysis-room-scene') {
      $("#player").css({top: 225, left: 360}).html('<img class="playerSprite" src="sprites/dick.png">');
    }

    $("#player").fadeIn(500);
    $("#rainSoundFx")[0].pause();
    $('#policeStationSceneMusic')[0].play();
    $('#stationDoor')[0].play();

    if(get(this, 'state.paperUsed') && !(get(this, 'state.analysisUnlocked'))) {
      this.analysisRoomUnlocked();
    }
  },

  willDestroyElement() {
    $('#policeStationSceneMusic')[0].pause();
  },

  analysisRoomUnlocked() {
    set(this, 'state.analysisUnlocked', true);
    later(() => {
      this.sendAction('npcSpeach', "Dick, Jenkins has finished the autopsy and would like to see you now");
    }, 1500)
  },

  actions: {
    stationWalk(e) {
      const wallY = $(".wall-corner").position().top;
      const wallX = $(".wall-corner").position().left;
      const dickPositionY = $("#player").position().top;
      const dickPositionX = $("#player").position().left;
      if ((dickPositionX > wallX) && (e.y < wallY) || (dickPositionY < wallY) && (e.x > wallX)) {
        return;
      } else {
        this.sendAction('walk');
      }
    }
  }
});
