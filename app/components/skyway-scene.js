import Component from '@ember/component';
// import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import $ from 'jquery';

export default Component.extend({

   didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'skyway-scene');
    $("#player").fadeIn(500);
    $("#rainSoundFx")[0].pause();
    $("#carDoor")[0].play();
  },

});
