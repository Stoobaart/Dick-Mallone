import $ from 'jquery';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { set, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  state: service('state-handler'),

  pickedupblankpaper: alias('state.pickedupblankpaper'),

  paperUsed: alias('state.blankpaperUsed'),

  jenkinsVanished: alias('state.jenkinsVanished'),

  whereIsJenkinsCovered: alias('state.whereIsJenkinsCovered'),

  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'station-scene');

    if (get(this, 'state.previousScene') === 'car-scene') {
      $("#player").css({top: 441, left: 1180.5}).html('<img class="playerSprite" src="sprites/dickLeft.png">');
    } else if (get(this, 'state.previousScene') === 'interrogation-room-scene') {
      $("#player").css({top: 371, left: 160.5}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    } else if (get(this, 'state.previousScene') === 'analysis-room-scene') {
      $("#player").css({top: 350, left: 360}).html('<img class="playerSprite" src="sprites/dick.png">');
    }

    $("#player").fadeIn(500);
    $("#rainSoundFx")[0].pause();
    $('#policeStationSceneMusic')[0].play();
    $('#stationDoor')[0].play();
  },

  didRender() {
    this._super(...arguments);
    if(get(this, 'state.blankpaperUsed') && !(get(this, 'state.analysisUnlocked'))) {
      this.analysisRoomUnlocked();
    }
  },

  willDestroyElement() {
    $('#policeStationSceneMusic')[0].pause();
  },

  analysisRoomUnlocked() {
    set(this, 'state.analysisUnlocked', true);
    later(() => {
      this.npcSpeach("Dick, Jenkins has finished the autopsy and would like to see you now");
    }, 1000)
  },
});
