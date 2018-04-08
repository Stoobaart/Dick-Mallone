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
      "containerId": "pedestrian1",
      "filePath": "sprites/Pedestrian.png",
      "startPos": "81rem",
      "endPos": -50,
      "time": 12000
    },{
      "imgId": "ped2",
      "containerId": "pedestrian2",
      "filePath": "sprites/Pedestrian2.png",
      "startPos": "-3rem",
      "endPos": 1550,
      "time": 13000
    },{
      "imgId": "ped3",
      "containerId": "pedestrian3",
      "filePath": "sprites/Pedestrian3.png",
      "startPos": "81rem",
      "endPos": -50,
      "time": 11000
    },{
      "imgId": "ped4",
      "containerId": "pedestrian4",
      "filePath": "sprites/Pedestrian3.png",
      "startPos": "81rem",
      "endPos": -50,
      "time": 9000
    },{
      "imgId": "ped5",
      "containerId": "pedestrian5",
      "filePath": "sprites/Pedestrian5.png",
      "startPos": "-3rem",
      "endPos": 1550,
      "time": 14000
    },{
      "imgId": "ped6",
      "containerId": "pedestrian6",
      "filePath": "sprites/Pedestrian6.png",
      "startPos": "81rem",
      "endPos": -50,
      "time": 16000
    }
  ]),

  didInsertElement() {
    this._super(...arguments);
    set(this, 'scene', 'skyway-scene');
    if (get(this, 'state.previousScene') === 'car-scene') {
      $("#player")
        .stop()
        .css({top: 441, left: 108})
        .html('<img class="playerSprite" src="sprites/dickRight.png">')
        .fadeIn(500)
    } else if (get(this, 'state.previousScene') === 'skyway-market-scene') {
      $("#player")
        .stop()
        .css({top: 441, left: 1208})
        .html('<img class="playerSprite" src="sprites/dickLeft.png">')
        .fadeIn(500)
    }
    $(".skyway-entrance-scene, .rain-container-skyway").fadeIn(1000);
    later(() => {
      $('#skywaySceneMusic')[0].play();
      $("#rainSoundFx")[0].play();
    }, 50);
    this.playerSpeach("..I hate this place..");
    this.animatepedestrian(get(this, 'pedestrians')[0]);
    this.animatepedestrian(get(this, 'pedestrians')[1]);
    this.pedIntervalStart();
  },

  willDestroyElement() {
    this.pedIntervalEnd();
    $('#skywaySceneMusic')[0].pause();
  },

  pedIntervalStart() {
    window.timer = [];
    get(this, 'pedestrians').forEach((ped, index) => {
      const intervalTime = ped.time + 500;
      window.timer[index] = setInterval(() => {
        this.animatepedestrian(ped);
      }, intervalTime);
    });
  },

  pedIntervalEnd() {
    window.timer.forEach((timer) => {
      window.clearInterval(timer);
    });
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
