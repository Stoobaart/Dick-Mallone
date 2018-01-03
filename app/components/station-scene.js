import Component from '@ember/component';
import Ember from 'ember';

const { set } = Ember;

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    set(this, 'scene', 'station');
    set(this, 'previousScene', 'car');
    const startY = ($("#exit").position().top) + 730;
    const startX = ($("#exit").position().left) - 50;
    
    $("#player").css({top: 441, left: 1180.5}).html('<img class="playerSprite" src="sprites/dickLeft.png">');

    $("#player").fadeIn(500);
    $('#policeStationSceneMusic')[0].play();
    $('#stationDoor')[0].play();
    $('#rainSoundFx')[0].pause();
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
