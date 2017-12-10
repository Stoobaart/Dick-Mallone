import Component from '@ember/component';
import Ember from 'ember';

const {
  get,
  Object: EmberObject,
  run: {
    later,
  },
  set,
  $,
} = Ember;

export default Component.extend({
  scene: "crimescene",
  waitToSpeak: 0,
  numberOfLinesSpoken: 0,
  lines: [],
  turn: 'npc',

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
      theVictim: ["Male Caucasian of unknown identity, roughly 35-40 years of age, decapitated and 5\"11...I think.", "How was he decapitated?", "His head was twisted completely off. it would take someone with incredible strength to do this"],
      suspects: ["We have a possible suspect or witness down in lock up now. Some Crack head, that's his needle right there.", "I'll go shake him down after I look around", "Good call. Something just feels wrong about all of this, Dick"],
      witnesses: ["None apart from the crack head we caught. I'm not sure if he even knows his own name though. Think he said it was Mahflnme", "How can nobody have seen a man get his head removed?", "Beats me, Dick. You'll need your head screwed on for this case ...sorry ...sigh."],
      bye: ["See ya later bud"],
    }
  }),

  convo(target) {
    const context = this;
    const targetConvo = target + "Convo";
    this.sendAction(targetConvo, context);
  },

  rodriguezConvo(context) {
    const _this = context;
    $(".player-action").html("");
    _this.sendAction('npcSpeach', "It's not great, Dick. Somebody got messed up here real good....or bad.. I'm so confused right now..");
    later(() => {
      $(".options").toggle();
    }, 5500);
  },

  convoOption(e) {
    $(".options").toggle();
    $(e.target).addClass("grey");
    set(this, 'turn', 'npc');
    set(this, 'numberOfLinesSpoken', 0);
    set(this, 'lines', []);
    set(this, 'waitToSpeak', 0);

    const scene = get(this, 'scene');
    const topic = scene + '.' + e.target.id;
    const conversation = get(this, 'scripts').get(topic);
    set(this, 'lines', conversation);

    conversation.forEach((line) => {
      const newWaitToSpeak = get(this, 'waitToSpeak') + line.length;
      set(this, 'waitToSpeak', newWaitToSpeak);
      const numberOfLinesSpoken = get(this, 'numberOfLinesSpoken') +1;

      if (get(this, 'numberOfLinesSpoken') === 0) {
        set(this, 'turn', 'dick');
        set(this, 'numberOfLinesSpoken', numberOfLinesSpoken);
        this.sendAction("npcSpeach", line);
        if(e.target.id === 'bye') {
          later(() => {
            $('.action-choice-btns, .walkable-area').toggle();
          }, line.length * 50);
        }
        return;
      }

      if (get(this, 'turn') === 'dick') {
        set(this, 'turn', 'npc');
        set(this, 'numberOfLinesSpoken', numberOfLinesSpoken);
        later(() => {
          this.sendAction("playerSpeach", line);
        }, newWaitToSpeak * 47);
      } else if (get(this, 'turn') === 'npc') {
        set(this, 'turn', 'dick');
        set(this, 'numberOfLinesSpoken', numberOfLinesSpoken);
        later(() => {
          this.sendAction("npcSpeach", line);
        }, newWaitToSpeak * 43);
      }

      if (get(this, 'lines.length') === get(this, 'numberOfLinesSpoken')) {
        later(() => {
          if(!(e.target.id === 'bye')) {
            $(".options").toggle();
          }
        }, newWaitToSpeak * 65)
        
      }

    });

  },
  
});
