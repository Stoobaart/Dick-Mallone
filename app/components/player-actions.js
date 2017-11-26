import Component from '@ember/component';
import Ember from 'ember';

const { get, set } = Ember;

export default Component.extend({

  verb: 'Walk',

  walk() {
    set(this, 'verb', 'Walk');
    Ember.$(".player-action").html("Walk to");
    // When the player clicks somewhere on the screen (walkable area)

    // store the current position of the player Sprite
    const playerPositionX = Ember.$("#player").position().left
    const playerPositionY = Ember.$("#player").position().top

    // get the difference of where the player has clicked, minus where the sprite is
    const playerPositionXDiff = event.pageX - playerPositionX;
    const playerPositionYDiff = event.pageY - playerPositionY;

    const timeToWalk = (Math.abs(playerPositionXDiff) + Math.abs(playerPositionYDiff)) * 5;
    // if the sprite is being told to move right of it's original position...
    if (get(this, 'verb') === "Walk") {
      if((playerPositionXDiff > 0) && ((Math.abs(playerPositionXDiff)) > (Math.abs(playerPositionYDiff)))) {
        // use the correct (facing the correct direction) image
        Ember.$("#player").html('<img class="playerSprite" src="sprites/dickRight.png">');
        // and add the class which is linked to the animation
        Ember.$(".playerSprite").addClass("walkRightAnim");
        // Same logic for each other direction
      } else if ((playerPositionYDiff > 0 ) && ((Math.abs(playerPositionXDiff)) < (Math.abs(playerPositionYDiff)))) {
        Ember.$("#player").html('<img class="playerSprite" src="sprites/dick.png">');
        Ember.$(".playerSprite").addClass("walkDownAnim");
      } else if ((playerPositionYDiff < 0 ) && ((Math.abs(playerPositionXDiff)) < (Math.abs(playerPositionYDiff)))) {
        Ember.$("#player").html('<img class="playerSprite" src="sprites/dickUp.png">');
        Ember.$(".playerSprite").addClass("walkUpAnim");
      } else if ((playerPositionXDiff < 0) && ((Math.abs(playerPositionXDiff)) > (Math.abs(playerPositionYDiff)))) {
        Ember.$("#player").html('<img class="playerSprite" src="sprites/dickLeft.png">');
        Ember.$(".playerSprite").addClass("walkLeftAnim");
      }
      // run the animation (.stop is there to allow you to change direction before the end of each animation)
      Ember.$('#player').stop().animate({
          top: event.pageY,
          left: event.pageX
       }, timeToWalk, function () {
        // when the sprite reaches the clicked location, stop the animation
        Ember.$(".playerSprite").removeClass("walkRightAnim walkLeftAnim walkUpAnim walkDownAnim");
       });
    }
  },

  thingClicked(e) {
    if (get(this, 'verb') === 'Walk') {
      return;
    } else {
      const scene = get(this, 'scene');
      const desire = scene + '.' + e.target.id + '.' + get(this, 'verb');
      const line = get(this, 'scripts').get(desire);
      this.sendAction('playerSpeach', line);
    }
  }
});
