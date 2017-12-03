import Component from '@ember/component';
import Ember from 'ember';

const {
  get,
  Object: EmberObject,
  run: {
    later,
  },
} = Ember;

export default Component.extend({
  scene: "crimescene",

  scripts: EmberObject.create({
    crimescene: {
      victim: {
        Look: "Looks like the last known whereabouts of our victim... a John Doe"
      },
      shards: {
        Look: "Shards of glass... There's blood everywhere"
      },
      head: {
        Look: "There are ways to get ahead in life, and this aint one of 'em, unless you're the murderer...Then this is Exactly how you get a head"
      },
      car: {
        Look: "My wheels, she aint much to look at, but it beats walking"
      },
      brokenwindow: {
        Look: "I guess this is where these shards of glass came from. What does this have to do with the murder? Could this be a robbery gone wrong?"
      },
      handprint: {
        Look: "I should run this for prints back at HQ"
      },
      urine: {
        Look: "A puddle of urine... I should scoop some up for analysis"
      },
      syringe: {
        Look: "Hmmm, Could this be related? Or maybe some crack head left it here? This place is pretty seedy..."
      },
      rodriguez: {
        Look: "Officer Rodriguez. He looks pretty shaken up. Didn't even know he smokes..",
        Talk: "Officer Rodriguez. What's the deal here?"
      },
      theVictim: "Male Caucasian of unknown identity, roughly 35-40 years of age, broken knee, decapitated and 5\"11...I think.",
    }
  }),

  convo(target) {
    const context = this;
    const targetConvo = target + "Convo";
    this.sendAction(targetConvo, context);
  },

  rodriguezConvo(context) {
    const _this = context;
    // $(".walk, .look, .talk, .pickUp").prop('disabled', true);
    $(".player-action").html("");
    _this.sendAction('npcSpeach', "It's not great, Dick. Somebody got messed up here real good....or bad.. I'm so confused right now..");
    later(() => {
      $(".options").toggle();
    }, 5500);
  },

  convoOption(e) {
    $(".options").toggle();
    $(e.target).addClass("grey");
    const scene = get(this, 'scene');
    const topic = scene + '.' + e.target.id;
    const line = get(this, 'scripts').get(topic);
    this.sendAction("npcSpeach", line);
    later(() => {
      $(".options").toggle();
    }, line.length * 55);
  }
});
