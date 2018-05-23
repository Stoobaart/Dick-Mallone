import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import $ from 'jquery';
import { get, set, observer } from '@ember/object';

export default Component.extend({
  state: service('state-handler'),

  gunUsedOnGate: observer('state.usegunongate', function() {
    if (get(this, 'state.usegunongate')) {
      this.openGate();
    } else {
      $("#player")
        .stop()
        .css({top: 391, left: 100})
        .html('<img class="playerSprite" src="sprites/dickRight.png">')
        .fadeIn(500)
    }
  }),

  gateOpened: alias('state.gateOpened'),

  didInsertElement() {
    this._super(...arguments);
    $("#player").stop();
    set(this, 'scene', 'docks-scene');
    if (get(this, 'state.previousScene') === 'car-scene') {
      $("#player").css({top: 391, left: 100}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    } else if (get(this, 'state.previousScene') === 'pier-scene') {
      $("#player").css({top: 441, left: 1209}).html('<img class="playerSprite" src="sprites/dickLeft.png">');
    }
    $("#player").fadeIn(500);
    $('#waves')[0].play();
    $('#rainSoundFx')[0].play();
    get(this, 'state.usegunongate');
  },

  openGate() {
    $('#gunShot')[0].play();
    $(".gate-door").addClass("gateAnimation");
    later(() => {
      set(this, 'state.gateOpened', true);
    }, 1000);
  },

});
