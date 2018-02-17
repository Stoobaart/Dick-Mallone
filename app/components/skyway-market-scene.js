import { A } from '@ember/array';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { later } from '@ember/runloop';
import $ from 'jquery';

export default Component.extend({
  state: service('state-handler'),

  pedestrians: A([
    {
      "imgId": "ped1",
      "containerId": "pedestrian1-market",
      "filePath": "sprites/Pedestrian.png",
      "startPos": "81rem",
      "endPos": -50,
      "time": 13000
    },{
      "imgId": "ped2",
      "containerId": "pedestrian2-market",
      "filePath": "sprites/Pedestrian2.png",
      "startPos": "-3rem",
      "endPos": 1550,
      "time": 13000
    },{
      "imgId": "ped3",
      "containerId": "pedestrian3-market",
      "filePath": "sprites/Pedestrian3.png",
      "startPos": "81rem",
      "endPos": -50,
      "time": 11000
    }
  ]),

  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'skyway-market-scene');
    if (get(this, 'state.previousScene') === 'skyway-scene') {
      $("#player").css({top: 441, left: 108}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    }
    $(".skyway-market-bg-scene, .skyway-market-fg-scene, .rain-container-skyway").fadeIn(1000);
    $("#player").fadeIn(500);
    later(() => {
      $("#rainSoundFx")[0].pause();
      $('#drummerMusic')[0].play();
    }, 50);
    this.animatepedestrian(get(this, 'pedestrians')[0]);
    this.animatepedestrian(get(this, 'pedestrians')[1]);
    get(this, 'pedestrians').forEach((ped) => {
      const intervalTime = ped.time + 20;
      setInterval(() => {
        this.animatepedestrian(ped);
      }, intervalTime);
    });
  },

  willDestroyElement() {
    $('#drummerMusic')[0].pause();
  },

  animatepedestrian(ped) {
    $(`.${ped.imgId}`).show();
    $(`#${ped.containerId}`).animate({
      left: ped.endPos
    }, ped.time, function() {
      $(`.${ped.imgId}`).hide();
      $(`#${ped.containerId}`).css("left", `${ped.startPos}`);
    });
  }


});
