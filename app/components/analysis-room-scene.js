import { later } from '@ember/runloop';
import $ from 'jquery';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  state: service('state-handler'),

  bizarreCovered: alias('state.bizarreCovered'),

  bloodCovered: alias('state.bloodCovered'),

  portraitCovered: alias('state.pickedupportrait'),

  didInsertElement() {
    this._super(...arguments);
    set(this, 'scene', 'analysis-room-scene');
    $("#player")
      .stop()
      .css({top: 441, left: 1180.5})
      .html('<img class="playerSprite" src="sprites/dickLeft.png">')
      .fadeIn(500);
    $('#analysisRoomMusic')[0].play();
    $('#stationDoor')[0].play();

    if(!this.get('portraitCovered')) {
      later(() => {
        this.npcSpeach("Aaah welcome back Detective");
      }, 1000);
    } else {
      if(!get(this, 'state.jenkinsVanished')) {
        later(() => {
          this.playerSpeach("Where are you Jenkins?");
          set(this, 'state.jenkinsVanished', true);
        }, 1000);
      }
    }

  },

  willDestroyElement() {
    $('#analysisRoomMusic')[0].pause();
  }
});
