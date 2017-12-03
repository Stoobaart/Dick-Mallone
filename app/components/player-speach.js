import Component from '@ember/component';
import Ember from 'ember';

const {
  $,
  run: {
    later,
  },
} = Ember;

export default Component.extend({

  // player speach function
  playerSpeach(line) {
    $(".player-speak").toggle();
    $(".player-speach").html(line);
    this.sendAction('speakClear', line);
  },

  // npc speach function
  npcSpeach(line) {
    $(".npc-speak").toggle();
    $(".npc-speach").html(line);
    this.sendAction('npcSpeakClear', line);
  },

  // clear speach after x seconds
  speakClear(line) {
    later(() => {
      $(".player-speak").toggle();
    }, line.length * 60);
  },

  npcSpeakClear(line) {
    later(() => {
      $(".npc-speak").toggle();
    }, line.length * 55);
  },

});
