import Component from '@ember/component';
import Ember from 'ember';

const { get, set } = Ember;

export default Component.extend({

  state: Ember.inject.service('state-handler'),

  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'station');
    const startY = ($("#exit").position().top) + 730;
    const startX = ($("#exit").position().left) - 50;
    
    if (get(this, 'state.previousScene') === 'car') {
      $("#player").css({top: 441, left: 1180.5}).html('<img class="playerSprite" src="sprites/dickLeft.png">');
    } else if (get(this, 'state.previousScene') === 'interrogation-room') {
      $("#player").css({top: 371, left: 110.5}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    } else if (get(this, 'state.previousScene') === 'analysis-room') {
      $("#player").css({top: 371, left: 110.5}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    }

    $("#player").fadeIn(500);
    $('#policeStationSceneMusic')[0].play();
    $('#stationDoor')[0].play();
    $('#rainSoundFx')[0].pause();
    $('#interrogationRoomMusic')[0].pause();
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
