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

  // npcSpeach(words) {
  //   $(".npcSpeach").html(words);
  //   $(".npcPortrait, .npcSpeach").toggle();
  //   npcSpeakClear();
  // },

  // clear speach after a few seconds
  speakClear(line) {
    const words = line;
    later(() => {
      $(".player-speak").toggle();
    }, words.length * 60);
  },

});
