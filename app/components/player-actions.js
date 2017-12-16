import Component from '@ember/component';
import Ember from 'ember';

const { 
  $,
  computed,
  get,
  observer,
  run: {
    later,
  }, 
  set,
} = Ember;

export default Component.extend({

  state: Ember.inject.service('state-handler'),

  verb: 'Walk',

  walk() {
    set(this, 'verb', 'Walk');
    $(".player-action").html("Walk to");
    // When the player clicks somewhere on the screen (walkable area)

    // player can walk in front or behind
    const rodPos = $("#npcRodriguez").position().top;
    const dickPos = event.pageY - 200;
    if(dickPos <= rodPos){
      $("#npcRodriguez").addClass("behind");
    } else {
      $("#npcRodriguez").removeClass("behind");
    }

    // store the current position of the player Sprite
    const playerPositionX = $("#player").position().left
    const playerPositionY = $("#player").position().top

    // get the difference of where the player has clicked, minus where the sprite is
    const playerPositionXDiff = event.pageX - playerPositionX;
    const playerPositionYDiff = event.pageY - playerPositionY;

    const timeToWalk = (Math.abs(playerPositionXDiff) + Math.abs(playerPositionYDiff)) * 5;
    // if the sprite is being told to move right of it's original position...
    if (get(this, 'verb') === "Walk") {
      if((playerPositionXDiff > 0) && ((Math.abs(playerPositionXDiff)) > (Math.abs(playerPositionYDiff)))) {
        // use the correct (facing the correct direction) image
        $("#player").html('<img class="playerSprite" src="sprites/dickRight.png">');
        // and add the class which is linked to the animation
        $(".playerSprite").addClass("walkRightAnim");
        // Same logic for each other direction
      } else if ((playerPositionYDiff > 0 ) && ((Math.abs(playerPositionXDiff)) < (Math.abs(playerPositionYDiff)))) {
        $("#player").html('<img class="playerSprite" src="sprites/dick.png">');
        $(".playerSprite").addClass("walkDownAnim");
      } else if ((playerPositionYDiff < 0 ) && ((Math.abs(playerPositionXDiff)) < (Math.abs(playerPositionYDiff)))) {
        $("#player").html('<img class="playerSprite" src="sprites/dickUp.png">');
        $(".playerSprite").addClass("walkUpAnim");
      } else if ((playerPositionXDiff < 0) && ((Math.abs(playerPositionXDiff)) > (Math.abs(playerPositionYDiff)))) {
        $("#player").html('<img class="playerSprite" src="sprites/dickLeft.png">');
        $(".playerSprite").addClass("walkLeftAnim");
      }
      // run the animation (.stop is there to allow you to change direction before the end of each animation)
      $('#player').stop().animate({
          top: event.pageY,
          left: event.pageX
       }, timeToWalk, function () {
        // when the sprite reaches the clicked location, stop the animation
        $(".playerSprite").removeClass("walkRightAnim walkLeftAnim walkUpAnim walkDownAnim");
       });
    }
  },

  thingClicked(e) {
    const verb = get(this, 'verb');
    const scene = get(this, 'scene');
    if (verb === 'Walk') {
      return;
    } else if (verb === 'Look' || verb === 'Pick') {
      const desire = scene + '.' + e.target.id + '.' + verb;
      const line = get(this, 'scripts').get(desire);
      if (line) {
        $('.action-choice-btns, .walkable-area, .thing').hide();
        this.sendAction('playerSpeach', line);
        later(() => {
          $('.action-choice-btns, .walkable-area, .thing').toggle();
        }, line.length * 50);
      }

      // Handle if thing clicked is pickupable
      const pickupable = e.target.getAttribute('pickupable');
      if (pickupable === "true") {
        const name = e.target.id;
        const url = "images/" + name + ".png";
        const item = Ember.Object.create(
          {
            "name": name, 
            "url": url
          }
        );
        get(this, 'state').add(item);
      }
    } else if (verb === 'Talk') {
      const desire = scene + '.' + e.target.id + '.' + verb;
      const line = get(this, 'scripts').get(desire);
      if (line) {
        $('.action-choice-btns, .walkable-area, .thing').hide();
        this.sendAction('playerSpeach', line);
        later(() => {
          const target = e.target.id;
          this.sendAction('convo', target);
        }, 3000)
      }
    }
  },

});
