import Component from '@ember/component';
import Ember from 'ember';

const {
  get,
  Object: EmberObject,
  run: {
    later,
  },
  set,
  setProperties,
  $,
} = Ember;

export default Component.extend({

  previousScene: null,
  scene: "crime",
  waitToSpeak: 0,
  numberOfLinesSpoken: 0,
  turn: 'npc',

  scripts: EmberObject.create({
    itemsInInventory: {
      badge: { 
        Look: "This is my badge"
      },
      gun: {
        Look: "My trusty Pistola. Just make sure it's pointed in the right direction"
      },
      shardsItem: {
        Look: "Maybe I should've bagged and tagged this..."
      },
      cupItem: {
        Look: "It's empty..."
      }
    },
    crime: {
      victim: {
        Look: "Looks like the last known whereabouts of our victim... a John Doe",
        Pick: "There's nothing to pick up",
        Talk: "Don't you think that's a little late?",
      },
      shards: {
        Look: "Shards of glass... There's blood everywhere",
        Pick: "Hope I don't get hep or something. Aaah I guess it's too late anyways..",
        Talk: "I can't talk to that"
      },
      head: {
        Look: "There are ways to get ahead in life, and this aint one of 'em, unless you're the murderer...Then this is Exactly how you get a head",
        Pick: "There's nothing to pick up",
        Talk: "Don't you think that's a little late?"
      },
      car: {
        Look: "My wheels, she aint much to look at, but it beats walking",
        Pick: "What do I look like, the Hulk?",
        Talk: "Hey baby.... Love you too"
      },
      brokenwindow: {
        Look: "I guess this is where these shards of glass came from. What does this have to do with the murder? Could this be a robbery gone wrong?",
        Pick: "It's too high up",
        Talk: "I can't talk to that"
      },
      handprint: {
        Look: "This rain has washed away any liftable prints. Damn it.",
        Pick: "There's nothing to pick up",
        Talk: "I can't talk to that"
      },
      urine: {
        Look: "A puddle of urine... I should scoop some up for analysis",
        Pick: "Eeeew, I'm not using my hands for this",
        Talk: "I can't talk to that"
      },
      syringe: {
        Look: "Hmmm, Could this be related? Or maybe some crack head left it here? This place is pretty seedy...",
        Pick: "I don't think this is pertinent to the crime",
        Talk: "I can't talk to that"
      },
      rodriguez: {
        Look: "Officer Rodriguez. He looks pretty shaken up. Didn't even know he smokes..",
        Talk: "Officer Rodriguez. What's the deal here?",
        Pick: "It's not his birthday",
        Usebadgeon: "He's not going to be impressed",
        Usegunon: "The only thing I want to blow Rodriguez away with is my wit"
      },
      theVictim: ["Male Caucasian of unknown identity, roughly 35-40 years of age, decapitated and 5\"11...I think.", "How was he decapitated?", "His head was twisted completely off. it would take someone with incredible strength to do this"],
      suspects: ["We have a possible suspect or witness down in lock up now. Some Crack head, that's his needle right there.", "I'll go shake him down after I look around", "Good call. Something just feels wrong about all of this, Dick"],
      witnesses: ["None apart from the crack head we caught. I'm not sure if he even knows his own name though. Think he said it was Mahflnme", "How can nobody have seen a man get his head removed?", "Beats me, Dick. You'll need your head screwed on for this case ...sorry ...sigh."],
      bye: ["See ya later bud", "Catch you back at the station"],
    },
    car: {
      map: {
        Look: "My sat nav. Old but still gets the job done",
        Talk: "It's not voice activated",
        Pick: "I'll only ever need it in the car",
        Usebadgeon: "What the hell are you doing?",
        Usegunon: "I still need my directions",
      },
      cup: {
        Look: "This beverage holder has seen one too many instants",
        Talk: "Hello cup. How are you? ....Yep...still inanimate",
        Pick: "I should find the trash for this",
        Usebadgeon: "Nope",
        Usegunon: "It's better without holes in it",
      }
    }
  }),

  convo(target) {
    const targetConvo = target + "Convo";
    this.sendAction(targetConvo, this);
  },

  rodriguezConvo(context) {
    const _this = context;
    $(".player-action").hide();
    _this.sendAction('npcSpeach', "It's not great, Dick. Somebody got messed up here real good....or bad.. I'm so confused right now..");
    later(() => {
      $(".options").toggle();
    }, 5500);
  },

  convoOption(e) {
    $(".options").toggle();
    $(e.target).addClass("grey");
    setProperties(this, {
      'turn': 'npc',
      'numberOfLinesSpoken': 0,
      'waitToSpeak': 0,
    });

    const scene = get(this, 'scene');
    const topic = scene + '.' + e.target.id;
    const targetId = e.target.id;
    const conversation = get(this, 'scripts').get(topic);

    conversation.forEach((line) => {
      const newWaitToSpeak = get(this, 'waitToSpeak') + line.length;
      set(this, 'waitToSpeak', newWaitToSpeak);
      const numberOfLinesSpoken = get(this, 'numberOfLinesSpoken') +1;

      if (get(this, 'numberOfLinesSpoken') === 0) {
        setProperties(this, {
          'turn': 'dick',
          'numberOfLinesSpoken': numberOfLinesSpoken,
        });
        return this.sendAction("npcSpeach", line);
      }

      if (get(this, 'turn') === 'dick') {
        setProperties(this, {
          'turn': 'npc',
          'numberOfLinesSpoken': numberOfLinesSpoken,
        });
        later(() => {
          this.sendAction("playerSpeach", line);
        }, newWaitToSpeak * 47);
      } else if (get(this, 'turn') === 'npc') {
        setProperties(this, {
          'turn': 'dick',
          'numberOfLinesSpoken': numberOfLinesSpoken
        });
        later(() => {
          this.sendAction("npcSpeach", line);
        }, newWaitToSpeak * 43);
      }

      if (conversation.length === get(this, 'numberOfLinesSpoken')) {
        if(targetId === 'bye') {
          later(() => {
            $('.action-choice-btns, .walkable-area, .thing, .helper, .player-action').toggle();
          }, newWaitToSpeak * 65);
        } else {
          later(() => {
            $(".options").toggle();
          }, newWaitToSpeak * 65);
        }
      }

    });
  },
});