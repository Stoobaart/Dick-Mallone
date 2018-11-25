import Component from '@ember/component';
import $ from 'jquery';
import { alias } from '@ember/object/computed';
import { get, set, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Component.extend({

  state: service('state-handler'),

  gunUsedOnGate: observer('state.usegunonrigdoor', function() {
    if (get(this, 'state.usegunonrigdoor')) {
      this.openRigDoor();
    } else {
      $("#player")
        .stop()
        .css({top: 351, left: 400})
        .html('<img class="playerSprite" src="sprites/dickRight.png">')
        .fadeIn(500)
    }
  }),

  rigDoorOpened: alias('state.rigDoorOpened'),

  didInsertElement() {
    this._super(...arguments);
    $("#player").stop();
    set(this, 'scene', 'rig-entrance-scene');
    if (get(this, 'state.previousScene') === 'rig-interior-scene') {
      $("#player").css({top: 351, left: 400}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    } else {
      $("#player").css({top: 351, left: 1209}).html('<img class="playerSprite" src="sprites/dickLeft.png">');
    }
    $("#player").fadeIn(500);
    $('#waves')[0].play();
    $('#rainSoundFx')[0].play();
  },

  openRigDoor() {
    $('#gunShot')[0].play();
    // $(".gate-door").addClass("gateAnimation");
    later(() => {
      set(this, 'state.rigDoorOpened', true);
    }, 1000);
  },
});
