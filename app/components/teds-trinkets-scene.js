import Component from '@ember/component';
import $ from 'jquery';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { get, set, observer } from '@ember/object';

export default Component.extend({

  state: service('state-handler'),

  npcName: 'ted',

  showLogBook: alias('state.portraitUsed'),

  openedLogbook: false,

  logBookEntries: [
    {
      name: 'Jenkins',
      address: '218 Malbrook docks',
      date: '28 jan'
    },{
      name: 'Samuel',
      address: '135 Chobham Road',
      date: '3 feb'
    }, {
      name: 'Michael',
      address: '19 Cestnut av.',
      date: '28th December'
    }, {
      name: 'Davis Samsmith',
      address: '409b Wanville court',
      date: '09 January'
    }
  ],

  portraitUsedObserver: observer('state.portraitUsed', function() {
    this.tedGivenPortrait();
  }),

  init() {
    this._super(...arguments);
    get(this, 'state.portraitUsed');
  },

  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'teds-trinkets-scene');
    $("#player").css({top: 391, left: 208}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    $("#player").fadeIn(500);
    // $('#')[0].play();
  },

  tedGivenPortrait() {
    this.sendAction('startAScene', 'ted-portrait', 'ted');
    later(() => {
      set(this, 'state.portraitUsed', true);
    }, 4000)
  },

  actions: {
    openLogBook() {
      set(this, 'openedLogbook', true);
    }
  }
});
