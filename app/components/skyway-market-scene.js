import { A } from '@ember/array';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set, computed } from '@ember/object';
import { later } from '@ember/runloop';
import $ from 'jquery';

export default Component.extend({
  state: service('state-handler'),

  npcName: 'drummer',

  isDrummer: computed('npcName', function() {
    return get(this, 'npcName') === 'drummer';
  }),

  usebadgeoncook: alias('state.usebadgeoncook'),

  cookPressured: alias('state.pressureCovered'),

  pedestrians: A([
    {
      "imgId": "ped1",
      "containerId": "pedestrian1-market",
      "filePath": "sprites/Pedestrian7.png",
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
      "filePath": "sprites/Pedestrian9.png",
      "startPos": "81rem",
      "endPos": -50,
      "time": 11000
    },{
      "imgId": "ped4",
      "containerId": "pedestrian4-market",
      "filePath": "sprites/Pedestrian10.png",
      "startPos": "-3rem",
      "endPos": 1550,
      "time": 11000
    }
  ]),

  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    $("#rainSoundFx")[0].pause();
    set(this, 'scene', 'skyway-market-scene');
    if (get(this, 'state.previousScene') === 'skyway-scene') {
      $("#player").css({top: 441, left: 108}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    } else if (get(this, 'state.previousScene') === 'teds-trinkets-scene') {
      $("#player").css({top: 441, left: 1108}).html('<img class="playerSprite" src="sprites/dickLeft.png">');
    }
    $(".skyway-market-bg-scene, .skyway-market-fg-scene, .rain-container-skyway").fadeIn(1000);
    $("#player").fadeIn(500);
    later(() => {
      $('#drummerMusic')[0].play();
    }, 50);
    this.animatepedestrian(get(this, 'pedestrians')[0]);
    this.animatepedestrian(get(this, 'pedestrians')[1]);
    this.pedIntervalStart();
    get(this, 'usebadgeoncook');
  },

  willDestroyElement() {
    this.pedIntervalEnd();
    $('#drummerMusic')[0].pause();
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
  },

  actions: {
    setNpc(e) {
      set(this, 'npcName', e.target.id);
    }
  }

});
