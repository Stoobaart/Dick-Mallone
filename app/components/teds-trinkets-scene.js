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
      id: 'entry',
      action: 'thingClicked',
      name: 'Michael',
      address: '19 Cestnut av.',
      date: '28th January'
    },{
      id: 'entry',
      action: 'thingClicked',
      name: 'Samuel',
      address: '135 Chobham Road',
      date: '3 feb'
    }, {
      id: 'jenkinsEntry',
      action: 'jenkinsEntryClicked',
      name: 'Jenkins',
      address: '218 Malbrook docks',
      date: '28 Feb'
    }, {
      id: 'entry',
      action: 'thingClicked',
      name: 'Davis Samsmith',
      address: '409b Wanville court',
      date: '09 March'
    }, {
      id: 'entry',
      action: 'thingClicked',
      name: 'Stu Smith',
      address: '791 Ball Street',
      date: '28th March'
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
    $('#tedsTrinketsMusic')[0].play();
    $('#stationDoor')[0].play();
    $('#rainSoundFx')[0].pause();
  },

  willDestroyElement() {
    $('#tedsTrinketsMusic')[0].pause();
  },

  tedGivenPortrait() {
    this.sendAction('startAScene', 'ted-portrait', 'ted');
    later(() => {
      set(this, 'state.portraitUsed', true);
    }, 4000);
  },

  actions: {
    openLogBook() {
      $('#page')[0].play();
      set(this, 'openedLogbook', true);
    },

    closeLogbook() {
      $('#page')[0].play();
      set(this, 'openedLogbook', false);
    },

    lookAtEntry() {
      set(this, 'verb', 'Look at');
    },

    thingClicked(e) {
      this.sendAction('thingClicked', e);
    },

    jenkinsEntryClicked() {
      this.sendAction('startAScene', 'entry-found', 'jenkinsEntry');
      later(() => {
        set(this, 'openedLogbook', false);
        set(this, 'state.docksFound', true);
      }, 2000)
    },
  }
});
