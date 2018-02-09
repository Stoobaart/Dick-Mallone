import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { later } from '@ember/runloop';
import $ from 'jquery';

export default Component.extend({
  state: service('state-handler'),

   didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'skyway-scene');
    if (get(this, 'state.previousScene') === 'car-scene') {
      $("#player").css({top: 441, left: 108}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    }
    $(".skyway-entrance-scene, .rain-container-skyway").fadeIn(1000);
    $("#player").fadeIn(500);
    later(() => {
      $('#skywaySceneMusic')[0].play();
      $("#rainSoundFx")[0].play();
    }, 50);
    this.sendAction('playerSpeach', "..I hate this place..")
    this.animatepedestrian1();
    this.animatepedestrian2();
    setInterval(() => {
      this.animatepedestrian1();
    }, 12050);
    setInterval(() => {
      this.animatepedestrian2();
    }, 13050);
  },

  willDestroyElement() {
    $('#skywaySceneMusic')[0].pause();
  },

  animatepedestrian1() {
    $('#pedestrian1').show().animate({
      left: -50
    }, 12000, function() {
      $('#pedestrian1').hide().css("left", "81rem");
    });
  },

  animatepedestrian2() {
    $('#pedestrian2').show().animate({
      left: 1550
    }, 12000, function() {
      $('#pedestrian2').hide().css("left", "-3rem");
    });
  }

});
