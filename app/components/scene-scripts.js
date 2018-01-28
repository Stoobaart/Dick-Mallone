import Component from '@ember/component';
import Ember from 'ember';

const {
  get,
  inject: {service},
  Object: EmberObject,
  set,
  $,
} = Ember;

export default Component.extend({

  state: service('state-handler'),

  scene: "crime-scene",
  currentSpeach: [],
  convoInProgress: false,

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
    'crime-scene': {
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
        Usefullcupon: "I'm not gonna pour this back",
        Usesyringeon: "I should probably show this to Jenkins before contaminating it"
      },
      'used-syringe': {
        Look: "Hmmm, Could this be related? Or maybe some crack head left it here? This place is pretty seedy...",
        Pick: "Lesser detectives would use protective gear for this. Not me.",
        Talk: "I can't talk to that",
        Usecupon: "Even if I did need this, this cup wouldn't protect me from pricks"
      },
      'rodriguez': {
        Look: "Officer Rodriguez. He looks pretty shaken up. Didn't even know he smokes..",
        Pick: "It's not his birthday",
        Usebadgeon: "He's not going to be impressed",
        Usegunon: "The only thing I want to blow Rodriguez away with is my wit",
        Usecupon: "Why would he want this?",
        Usefullcupon: "He's too straight a cop to ever take the piss",
        Useshardson: "There's plenty of time for shanking later",
        Usesyringeon: "I should show this to Jenkins instead",
        convostarter: [
          { dick: "Officer Rodriguez. What's the deal here?" },
          { npc: "It's not great, Dick. Somebody got messed up here real good....or bad.. I'm so confused right now.."}
        ],
      },
      theVictim: [
        { npc: "Male Caucasian of unknown identity, roughly 35-40 years of age, decapitated and 5\"11...I think." }, 
        { dick: "How was he decapitated?" }, 
        { npc: "His head was twisted completely off. it would take someone with incredible strength to do this"}
      ],
      suspects: [
        { npc: "We have a possible suspect or witness down in lock up now. Some Crack head, that's his needle right there." }, 
        { dick: "I'll go shake him down after I look around" }, 
        { npc: "Good call. Something just feels wrong about all of this, Dick" }
      ],
      witnesses: [
        { npc: "None apart from the crack head we caught. I'm not sure if he even knows his own name though. Think he said it was Mahflnme" }, 
        { dick: "How can nobody have seen a man get his head removed?" }, 
        { npc: "Beats me, Dick. You'll need your head screwed on for this case ...sorry ...sigh." }
      ],
      bye: [
        { npc: "See ya later bud" }
      ],
    },
    'car-scene': {
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
        Usebadgeon: "That doesn't make sense",
        Usegunon: "It's better without holes in it",
      }
    },
    'station-scene': {
      'water-cooler': {
        Look: "A water dispenser. I'm not thirsty",
        Talk: "That doesn't make sense",
        Pick: "I don't need that much water, let alone any",
        Usebadgeon: "I could arrest this, but my reasoning in court would hold no water",
        Usegunon: "It already has a method to dispense water",
        Usecupon: "I don't need any water, plus I'm prety sure I'll need this cup somewhere else. hint hint",
        Usefullcupon: "I'll spill this on my shoes if I try",
        Useshardson: "That doesn't make sense"
      },
      'notice-board': {
        Look: "The weekly 'Hit list', this month's calendar, and some leaflets",
        Talk: "That doesn't make sense",
        Pick: "I don't need any leaflets",
        Usebadgeon: "That doesn't make sense",
        Usegunon: "I don't know why you'd try that",
        Usecupon: "That doesn't make sense",
        Usefullcupon: "And get everything wet? How will I know what's going on?",
        Useshardson: "That doesn't make sense"
      },
      'paper': {
        Look: "Some blank paper",
        Talk: "That doesn't make sense",
        Pick: "Maybe some of this blank paper will come in handy later",
        Usegunon: "I can borrow Jen's hole puncher if I get desperate. Which I am not",
        Usecupon: "That doesn't make sense",
        Usefullcupon: "I shouldn't make this soggy",
        Useshardson: "That doesn't make sense"
      },
      'filing-cabinets': {
        Look: "General files, or as I like to call them 'Jeneral files'",
        Talk: "That doesn't make sense",
        Pick: "Don't ruin Jen's files",
        Usebadgeon: "That doesn't make sense",
        Usegunon: "Don't ruin Jen's files",
        Usecupon: "That doesn't make sense",
        Usefullcupon: "Don't ruin Jen's files",
        Useshardson: "Don't ruin Jen's files",
        Usepaperon: "Not much point in filing an empty sheet of paper now, is there columbo?"
      },
      'interrogation-room': {
        Look: "This goes to the interrogation room"
      },
      'closed-analysis-room': {
        Look: "Jenkins is carrying out the autopsy, I should come back later, I know how much he hates being disturbed"
      },
      'analysis-room': {
        Look: "This goes to the Analysis room"
      },
      'Jen': {
        Look: "That's Jen, Don't let that sweet heart demeanor of hers trick you, she's made of sterner stuff",
        Talk: "Hey Jen, how you holdin' up?",
        Pick: "I sure aint no weinstein",
        Usebadgeon: "She's not going to be impressed",
        Usegunon: "She'll only stick it up me faster than I can pull the trigger",
        Usecupon: "She has plenty of cups behind her",
        Usefullcupon: "I'm sure there's a better use for this...",
        Useshardson: "There's plenty of time for shanking later",
        convostarter: [
          { dick: "Hi Jen, how has it been today, any drama?" }, 
          { npc: "Hey Dick. Pretty quiet today. Apart from that crack head that was brought in. What's up?"}
        ]
      },
      aboutCrackHead: [
        { npc: "He sure made a lot of noise. Screaming about aliens or robots or some insane shit" }, 
        { dick: "Damn crazies. What a waste of time" }
      ],
      aboutJenkins: [
        { npc: "Yeah, he said he wants to see you after the autopsy, he should be finished up soon" }, 
        { dick: "Alright then, thanks Jen" }
      ],
      bye: [
        { npc: "Until next time Mallone" }, 
        { dick: "Catch ya later, Jen" }
      ]
    },
    'interrogation-room-scene': {
      'crackhead': {
        Talk: "Alright buddy, time to spill it!",
        Look: "This guy must be able to give us some kind of i.d on the suspect",
        Pick: "When I said shake him down, I didn't mean literally",
        Usebadgeon: "He know's what time it is",
        Usegunon: "Only if he holds out on me",
        Usecupon: "He doesn't want that",
        Usefullcupon: "I found this at the scene",
        Useshardson: "He doesn't want this",
        Useblankpaperon: [
          { dick: "Can you sketch the thing that killed that man?" }
        ],
        convostarter: [
          { npc: "When can i get out of here? They're coming for me man! c'mon!!" }
        ]
      },
      'honest': [
        { npc: "Yeah man. sure thing. Are you sure that they aren't listening?" }, 
        { dick: "Who? Oh it doesn't matter who, this is a, err, safe zone, so don't worry" }, 
        { npc: "Anything you say chief" }
      ],
      'murder': [
        { npc: "I was hiding out in that old warehouse, when I heard a scream, so I climbed up to look out a window" }, 
        { npc: "It... shook that guy like a ragdoll" }, 
        { dick: "what do you mean.... it?" }, { npc: "It said that there was no hiding anymore, that they saw and heard everything" }, 
        { dick: "Can you describe it to me?" }, 
        { npc: "It was dark, I was high, I dunno man, I just need to get out of here" }
      ],
      'description': [
        { npc: "I dunno maaan, I mean, I do have a good eye for things, what with being a painter an all"}, 
        { dick: "So, can you give me a description or not? Things are gonna get rough otherwise!" }, 
        { npc: "Woah hey, ok man, look he was kinda average lookin'. I dunno, 5 feet 10, white guy, dark clothes" }, 
        { dick: "You're not giving me much to go on" }, 
        { npc: "I'm not good with my words maaaann. I'm an artist, not a talker" }, 
        { dick: "God damn it!" }
      ],
      'bye': [
        { npc: "Don't leave me here man!" }, 
        { dick: "Relax. You're safe here" }
      ]
    },
    'analysis-room-scene': {
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
      },
      'jenkins': {
        Talk: "Hey Jenkins, what have you got for me?",
        Look: "Jenkin's here does all our analysis. We'd be lost without him",
        Pick: "He doesn't like it when I pick him up",
        Usebadgeon: "I don't need to know how much semen is on this",
        Usegunon: "Let's hope it doesn't come to this",
        Usecupon: "I normally have to fill these up before giving them to Jenkins",
        Usefullcupon: "I found this at the scene",
        Useshardson: "He doesn't want this",
        Usepaperon: "He doesn't want this",
        convostarter: [
          { npc: "Hello Dick, I have some rather bizarre findings for you" },
        ]
      },
      'bizarre': [
        { dick: "What is so bizarre Doc?" }, 
        { npc: "To start with Dick, the victims blood seems to be changing on a molecular level" }, 
        { npc: "Secondly, it appears that the victims head was removed at a speed and with a strength that could only be attributed to industrial machinery" }, 
        { dick: "But that doesn't make any sense, somebody killed him with some kind of power tool?"}, 
        { npc: "Yes, that would be the only logical assumption"}
      ],
      'blood': [
        { dick: "Explain this blood changing stuff to me Jenkins" }, 
        { npc: "I've never seen anything like this before Dick. You won't believe how strange this is" }, 
        { dick: "Try me" }, 
        { npc: "It appears to be undergoing some form of metamorphosis" }, 
        { npc: "Nothing like this exists in nature Dick, I could only posit that this is caused by some kind of advanced nanites that I am yet to detect" }, 
        { dick: "Is it safe?" }, 
        { npc: "I have placed the samples into quarantine for now" }
      ],
      'anything-else': [
        { dick: "Anything else bizzarre to report Jenkins?" }, 
        { npc: "Nothing for now, but I should have further findings shortly. Perhaps you should speak to the witness in interrogation for now?" }, 
        { dick: "I already have, but I guess I should probably check back in on him" }, 
        { npc: "Return after you've done that Dick, I may have more once I have analysed blood directly from the body" }
      ],
      'bye': [
        { dick: "I'll be back" }, 
        { npc: "Ok Dick, I'll have something more illuminating for you next time" }
      ]

    }
  }),

  playerSpeach(line) {
    $(".player-speak").toggle();
    $(".player-speach").html(line);
  },

  npcSpeach(line) {
    $(".npc-speak").toggle();
    $(".npc-speach").html(line);
  },

  speakClear() {
    $(".player-speak").hide();
    $(".npc-speak").hide();
    let currentSpeach = get(this, 'currentSpeach');
    let mutatedCurrentSpeach = [...currentSpeach];
    if(mutatedCurrentSpeach.length === 0) {
      if(get(this, 'convoInProgress') === true) {
        return $(".options").show();
      }
      return;
    } else if(mutatedCurrentSpeach[0].hasOwnProperty('dick')) {
      this.sendAction('playerSpeach', mutatedCurrentSpeach[0].dick);
    } else {
      this.sendAction('npcSpeach', mutatedCurrentSpeach[0].npc);
    }
    mutatedCurrentSpeach.shift();
    set(this, 'currentSpeach', mutatedCurrentSpeach);
  },

  convo(scene, targetId, convoOptionChosen, usedOn) {
    set(this, 'convoInProgress', true);
    const squashedTargetId = targetId.replace(/\s/g, '');
    let topic = null;
    if (convoOptionChosen) {
      topic = `${scene}.${targetId}`;
    } else if (usedOn) {
      set(this, 'convoInProgress', false);
      topic = `${scene}.${squashedTargetId}.${usedOn}`;
    } else {
      topic = `${scene}.${targetId}.convostarter`;
    }
    set(this, 'currentSpeach', get(this, 'scripts').get(topic));
    let currentSpeach = get(this, 'currentSpeach');
    let mutatedCurrentSpeach = [...currentSpeach];

    if(mutatedCurrentSpeach[0].hasOwnProperty('dick')) {
      this.sendAction('playerSpeach', mutatedCurrentSpeach[0].dick);
    } else {
      this.sendAction('npcSpeach', mutatedCurrentSpeach[0].npc);
    }
    mutatedCurrentSpeach.shift();
    set(this, 'currentSpeach', mutatedCurrentSpeach);
  },

  convoOption(e) {
    $(".options").hide();
    const scene = get(this, 'scene');
    const targetId = e.target.id;
    $(e.target).addClass("grey");
    this.convo(scene, targetId, true);
    set(this, `state.${targetId}Covered`, true);
    if(targetId === 'bye') {
      $(".options").hide();
      set(this, 'convoInProgress', false);
    }
  },
});