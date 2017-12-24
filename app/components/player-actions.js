import Component from '@ember/component';
import Ember from 'ember';

const { 
  $,
  get,
  run: {
    later,
  }, 
  set,
} = Ember;

export default Component.extend({

  state: Ember.inject.service('state-handler'),

  verb: 'Walk to',

  helperText: null,

  walk() {
    set(this, 'verb', 'Walk to');
    if ($(".inventory").is(":visible")) {
      $(".inventory").slideUp(300);
    }
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
    if (get(this, 'verb') === "Walk to") {
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
    if (e.target.id === 'exit') {
      set(this, 'verb', 'Walk to');
    }
    const verb = get(this, 'verb');
    const scene = get(this, 'scene');
    const use = get(this, 'verb').indexOf("Use") != -1 ? true : false;
    if (verb === 'Look at') {
      this.lookAt(e.target.id, scene);
    } else if (verb === 'Pick up') {
      this.lookAt(e.target.id, scene, 'Pick');
      const pickupable = e.target.getAttribute('pickupable');
      if (pickupable === "true") {
        const use = e.target.getAttribute('use');
        this.pickUpObject(e.target.id, use);
      }
    } else if (verb === 'Talk to') {
      const thingType = e.target.getAttribute('data-type');
      this.talkTo(e.target.id, scene, thingType);
    } else if (use === true) {
      const usedOn = get(this, 'verb').replace(/\s/g, '');
      this.lookAt(e.target.id, scene, usedOn);
      this.useOn(e.target.id);
    } else if (verb === 'Walk to') {
      this.changeScene(e.target.id, scene);
    }
  },

  lookAt(targetId, scene, usedOn) {
    const squashedTargetId = targetId.replace(/\s/g, '');
    let desire;
    if (usedOn) {
      desire = `${scene}.${squashedTargetId}.${usedOn}`;
    } else {
      desire = `${scene}.${squashedTargetId}.Look`;
    }
    const line = get(this, 'scripts').get(desire);
    if (line) {
      $('.action-choice-btns, .walkable-area, .thing, .helper').hide();
      this.sendAction('playerSpeach', line);
      later(() => {
        $('.action-choice-btns, .walkable-area, .thing, .helper').toggle();
      }, line.length * 50);
    }
  },

  useOn(targetId) {
    if ($(".inventory").is(":visible")) {
      $(".inventory").slideUp(300);
    }
    get(this, 'state').remove(targetId);
    set(this, 'verb', 'Walk to');
    this.clearHelper();
  },

  pickUpObject(targetId, use) {
    const id = `${targetId}`;
    const url = `images/${targetId}.png`;
    const item = Ember.Object.create(
      {
        "name": targetId, 
        "url": url,
        "id": id,
        "use": use,
      }
    );
    get(this, 'state').add(item);
    set(this, 'verb', 'Walk to');
    this.clearHelper();
  },

  talkTo(targetId, scene, thingType) {
    const desire = `${scene}.${targetId}.Talk`;
    const line = get(this, 'scripts').get(desire);
    if (line) {
      $('.action-choice-btns, .walkable-area, .thing, .helper').hide();
      this.sendAction('playerSpeach', line);
      if(thingType === "person") {
        later(() => {
          this.sendAction('convo', targetId);
        }, 3000)
      } else {
        $('.action-choice-btns, .walkable-area, .thing, .helper').toggle();
      }
    }
  },

  changeScene(targetLocale, scene) {
    const scenes = ['exit', 'crime', 'car'];
    let sceneName = null;
    scenes.forEach((area) => {
      if (area === targetLocale) {
        if (targetLocale === 'exit') {
          sceneName = `${get(this, 'previousScene')}-scene`;
        } else {
          sceneName = `${targetLocale}-scene`;
        }
        set(this, 'scene', scene);
        set(this, 'componentName', sceneName);
        $("#crimeSceneMusic")[0].pause();
        $("#player").hide();
        set(this, 'previousScene', scene);
      }
    });
  },

  helper(e) {
    const verb = get(this, 'verb');
    set(this, 'helperText', e.target.id);
  },

  clearHelper() {
    set(this, 'helperText', null);
  }

});
