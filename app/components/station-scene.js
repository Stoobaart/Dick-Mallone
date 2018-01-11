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
    set(this, 'scene', 'station');
    
    if (get(this, 'state.previousScene') === 'car') {
      $("#player").css({top: 441, left: 1180.5}).html('<img class="playerSprite" src="sprites/dickLeft.png">');
    } else if (get(this, 'state.previousScene') === 'interrogation-room') {
      $("#player").css({top: 371, left: 130.5}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    } else if (get(this, 'state.previousScene') === 'analysis-room') {
      $("#player").css({top: 371, left: 110.5}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    }

    $("#player").fadeIn(500);
    $('#policeStationSceneMusic')[0].play();
    $('#stationDoor')[0].play();
    $('#rainSoundFx')[0].pause();
    $('#interrogationRoomMusic')[0].pause();

    if(get(this, 'state.paperUsed')) {
      this.analysisRoomUnlocked();
    }
  },

  analysisRoomUnlocked() {
    later(() => {
      $('.walkable-area, .thing, .footer-bar').hide();
      this.sendAction('npcSpeach', "Dick, Jenkins has finished the autopsy and would like to see you now");
      later(() => {
        $('.walkable-area, .thing, .footer-bar').show();
      }, 3000)
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