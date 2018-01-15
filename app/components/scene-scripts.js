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

  scene: "crime",
  waitToSpeak: 0,
  numberOfLinesSpoken: 0,
  turn: 'npc',

  scripts: EmberObject.create({
    itemsInInventory: {
      'badge': {
        Look: "This is my badge",
        Usefullcupon: "I don't want to get this wet",
        Usecupon: "What are you doing?"
      },
      'gun': {
        Look: "My trusty Pistola. Just make sure it's pointed in the right direction",
        Usefullcupon: "I don't want to get this wet",
        Usecupon: "What are you doing?"
      },
      'shards': {
        Look: "Maybe I should've bagged and tagged this...",
        Usefullcupon: "I don't want to get this wet",
        Usecupon: "This doesn't need to be in that"
      },
      'cup': {
        Look: "It's empty...",
        Usegunon: "I shouldn't make any holes"
      },
      'full-cup': {
        Look: "It's full",
        Usegunon: "I shouldn't make any holes"
      }
    },
    crime: {
      'victim': {
        Look: "Looks like the last known whereabouts of our victim... a John Doe",
        Pick: "There's nothing to pick up",
        Talk: "Don't you think that's a little late?",
        Usecupon: "That doesn't make sense"
      },
      'shards': {
        Look: "Shards of glass... There's blood everywhere",
        Pick: "Hope I don't get hep or something. Aaah I guess it's too late anyways..",
        Talk: "I can't talk to that",
        Usecupon: "I can just pick one up"
      },
      'head': {
        Look: "There are ways to get ahead in life, and this aint one of 'em, unless you're the murderer...Then this is Exactly how you get a head",
        Pick: "There's nothing to pick up",
        Talk: "Don't you think that's a little late?",
        Usecupon: "That doesn't make sense"
      },
      'car': {
        Look: "My wheels, she aint much to look at, but it beats walking",
        Pick: "What do I look like, the Hulk?",
        Talk: "Hey baby.... Love you too",
        Usefullcupon: "She only runs on diesel",
        Usecupon: "That doesn't make sense"
      },
      'broken-window': {
        Look: "I guess this is where these shards of glass came from. What does this have to do with the murder? Could this be a robbery gone wrong?",
        Pick: "It's too high up",
        Talk: "I can't talk to that",
        Usecupon: "That doesn't make sense"
      },
      'hand-print': {
        Look: "This rain has washed away any liftable prints. Damn it.",
        Pick: "There's nothing to pick up",
        Talk: "I can't talk to that",
        Usecupon: "I'm sure Jenkins has already got a sample"
      },
      'urine': {
        Look: "A puddle of urine... I should scoop some up for analysis",
        Pick: "Eeeew, I'm not using my hands for this",
        Talk: "I can't talk to that",
        Usecupon: "Let's scoop some up. Hmmm... still warm.",
        Usefullcupon: "I'm not gonna pour this back"
      },
      'syringe': {
        Look: "Hmmm, Could this be related? Or maybe some crack head left it here? This place is pretty seedy...",
        Pick: "Lesser detectives would use protective gear for this. Not me.",
        Talk: "I can't talk to that",
        Usecupon: "Even if I did need this, this cup wouldn't protect me from pricks"
      },
      'rodriguez': {
        convostarter: "It's not great, Dick. Somebody got messed up here real good....or bad.. I'm so confused right now..",
        Look: "Officer Rodriguez. He looks pretty shaken up. Didn't even know he smokes..",
        Talk: "Officer Rodriguez. What's the deal here?",
        Pick: "It's not his birthday",
        Usebadgeon: "He's not going to be impressed",
        Usegunon: "The only thing I want to blow Rodriguez away with is my wit",
        Usecupon: "Why would he want this?",
        Usefullcupon: "He's too straight a cop to ever take the piss",
        Useshardson: "There's plenty of time for shanking later"
      },
      theVictim: ["Male Caucasian of unknown identity, roughly 35-40 years of age, decapitated and 5\"11...I think.", "How was he decapitated?", "His head was twisted completely off. it would take someone with incredible strength to do this"],
      suspects: ["We have a possible suspect or witness down in lock up now. Some Crack head, that's his needle right there.", "I'll go shake him down after I look around", "Good call. Something just feels wrong about all of this, Dick"],
      witnesses: ["None apart from the crack head we caught. I'm not sure if he even knows his own name though. Think he said it was Mahflnme", "How can nobody have seen a man get his head removed?", "Beats me, Dick. You'll need your head screwed on for this case ...sorry ...sigh."],
      bye: ["See ya later bud", "Catch you back at the station"],
    },
    car: {
      'map': {
        Talk: "It's not voice activated",
        Pick: "I'll only ever need it in the car",
        Usebadgeon: "What the hell are you doing?",
        Usegunon: "I still need my directions",
        Usecupon: "That doesn't make sense"
      },
      'cup': {
        Look: "This beverage holder has seen one too many instants",
        Talk: "Hello cup. How are you? ....Yep...still inanimate",
        Pick: "I should find the trash for this",
        Usebadgeon: "Nope",
        Usegunon: "It's better without holes in it",
      }
    },
    station: {
      'Jen': {
        convostarter: "Hey Dick. Pretty quiet today. Apart from that crack head that was brought in. What's up?",
        Look: "That's Jen, Don't let that sweet heart demeanor of hers trick you, she's made of sterner stuff",
        Talk: "Hey Jen, how you holdin' up?",
        Pick: "I sure aint no weinstein",
        Usebadgeon: "She's not going to be impressed",
        Usegunon: "She'll only stick it up me faster than I can pull the trigger",
        Usecupon: "She has plenty of cups behind her",
        Usefullcupon: "I'm sure there's a better use for this...",
        Useshardson: "There's plenty of time for shanking later"
      },
      'water-cooler': {
        Look: "A water dispenser. I'm not thirsty",
        Talk: "Nope",
        Pick: "I don't need that much water, let alone any",
        Usebadgeon: "I could arrest this, but my reasoning in court would hold no water",
        Usegunon: "It already has a method to dispense water",
        Usecupon: "I don't need any water, plus I'm prety sure I'll need this cup somewhere else. hint hint",
        Usefullcupon: "I'll spill this on my shoes if I try",
        Useshardson: "Nope"
      },
      'notice-board': {
        Look: "The weekly 'Hit list', this month's calendar, leaflets, and some blank paper",
        Talk: "Nope",
        Pick: "Maybe some of this blank paper will come in handy later",
        Usebadgeon: "Nope",
        Usegunon: "I don't know why you'd try that",
        Usecupon: "That doesn't make sense",
        Usefullcupon: "And get everything wet? How will I know what's going on?",
        Useshardson: "Nope"
      },
      'filing-cabinets': {
        Look: "General files, or as I like to call them 'Jeneral files'",
        Talk: "Nope",
        Pick: "Don't ruin Jen's files",
        Usebadgeon: "Nope",
        Usegunon: "Don't ruin Jen's files",
        Usecupon: "That doesn't make sense",
        Usefullcupon: "Don't ruin Jen's files",
        Useshardson: "Don't ruin Jen's files",
        Usepaperon: "Not much point in filing an empty sheet of paper now, is there columbo?"
      },
      'interrogation-room': {
        Look: "This goes to the interrogation room"
      },
      'analysis-room-closed': {
        Look: "Jenkins is carrying out the autopsy, I should come back later, I know how much he hates being disturbed"
      },
      'analysis-room': {
        Look: "This goes to the Analysis room"
      },
      aboutCrackHead: ["He sure made a lot of noise. Screaming about aliens or robots or some insane shit", "Damn crazies. What a waste of time"],
      aboutJenkins: ["Yeah, he said he's waiting for you in analysis", "Alright then, thanks Jen"],
      bye: ["Until next time Mallone", "Catch ya later, Jen"]
    },
    'interrogation-room': {
      'crackhead': {
        convostarter: "When can i get out of here? They're coming for me man! c'mon!!",
        Talk: "Alright buddy, time to spill it!",
        Look: "",
        Pick: "",
        Usebadgeon: "He know's what time it is",
        Usegunon: "Only if he holds out on me",
        Usecupon: "He doesn't want that",
        Usefullcupon: "I found this at the scene",
        Useshardson: "He doesn't want this",
        Usepaperon: "Can you sketch the thing that killed that man?"
      },
      'honest': ["Yeah man. sure thing. Are you sure that they aren't listening?", "Who? Oh it doesn't matter who, this is a, err, safe zone, so don't worry",  "Anything you say chief"],
      'murder': ["I was hiding out in that old warehouse, when I heard a scream, so I climbed up to look out a window", "Please, do go on", "It... shook that guy like a ragdoll", "what do you mean.... it?", "It said that there was no hiding anymore, that they saw and heard everything", "Can you describe it to me?", "It was dark, I was high, I dunno man, I just need to get out of here"],
      'blah': ["", ""],
      'bye': ["Don't leave me here man!", "Relax. You're safe here"]
    },
    'analysis-room': {
      'jenkins': {
        convostarter: "Hello Dick, I have some rather bizarre findings for you",
        Talk: "Hey Jenkins, what have you got for me?",
        Look: "Jenkin's here does all our analysis. We'd be lost without him",
        Pick: "He doesn't like it when I pick him up",
        Usebadgeon: "I don't need to know how much semen is on this",
        Usegunon: "Let's hope it doesn't come to this",
        Usecupon: "I normally have to fill these up before giving them to Jenkins",
        Usefullcupon: "I found this at the scene",
        Useshardson: "He doesn't want this",
        Usepaperon: "He doesn't want this"
      },
      'gurney': {
        Look: "Dead as a door nail",
        Talk: "Not only does he not have a head or a mouth to talk out of, but he's also dead",
        Pick: "I don't need to carry any dead weight",
        Usebadgeon: "That doesn't make any sense",
        Usegunon: "He's already dead",
        Usecupon: "That doesn't make any sense",
        Usefullcupon: "That doesn't make any sense",
        Useshardson: "That doesn't make any sense",
        Usepaperon: "That doesn't make any sense"
      },
      'lab-cabinets': {
        Look: "Scientific stuff, if I knew what any of tis was for, we wouldn't need Jenkins",
        Pick: "it's fixed to the wall, nor do I need any of the contents",
        Usebadgeon: "Always keep your badge on you at all times",
        Usegunon: "That doesn't make any sense",
        Usecupon: "I'll keep this on me for now",
        Usefullcupon: "I'll keep this on me for now",
        Useshardson: "That doesn't make any sense",
        Usepaperon: "That doesn't make any sense"
      },
      'lab-cupboards': {
        Look: "Chemicals, test tubes, beakers, etc..",
        Pick: "it's fixed to the wall, nor do I need any of the contents",
        Usebadgeon: "Always keep your badge on you at all times",
        Usegunon: "That doesn't make any sense",
        Usecupon: "I'll keep this on me for now",
        Usefullcupon: "I'll keep this on me for now",
        Useshardson: "That doesn't make any sense",
        Usepaperon: "That doesn't make any sense"
      },
      'biohazards': {
        Look: "I can't see much from here, but I don't want to get too close",
        Usebadgeon: "That doesn't make any sense",
        Usegunon: "Woah! That's a really bad idea, whatever is in there needs to stay in there",
        Usecupon: "That doesn't make any sense",
        Usefullcupon: "That's probably a great place to put this, but I should check with Jenkins first",
        Useshardson: "I don't want to make any holes",
        Usepaperon: "That doesn't make any sense"
      }
    }
  }),

  convo(target) {
    const scene = get(this, 'scene');
    const desire = `${scene}.${target}.convostarter`;
    const line = get(this, 'scripts').get(desire);
    this.sendAction('npcSpeach', line);
    later(() => {
      $(".options").toggle();
    }, 5000);
  },

  convoOption(e) {
    $(".options").toggle();
    $(e.target).addClass("grey");
    setProperties(this, {
      'turn': 'npc',
      'numberOfLinesSpoken': 0,
      'waitToSpeak': 0,
    });
    const topic = `${get(this, 'scene')}.${e.target.id}`;
    const targetId = e.target.id;
    const conversation = get(this, 'scripts').get(topic);

    conversation.forEach((line) => {
      const previousWaitToSpeak = get(this, 'waitToSpeak');
      let newWaitToSpeak = get(this, 'waitToSpeak') + line.length;
      if ((newWaitToSpeak - previousWaitToSpeak) < 30) {
        newWaitToSpeak *= 1.5;
      }
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
        }, newWaitToSpeak * 33);
      } else if (get(this, 'turn') === 'npc') {
        setProperties(this, {
          'turn': 'dick',
          'numberOfLinesSpoken': numberOfLinesSpoken
        });
        later(() => {
          this.sendAction("npcSpeach", line);
        }, newWaitToSpeak * 33);
      }

      if (conversation.length === get(this, 'numberOfLinesSpoken')) {
        if(targetId === 'bye') {
          return;
        } else {
          later(() => {
            $(".options").toggle();
          }, newWaitToSpeak * 45);
        }
      }

    });
  },
});