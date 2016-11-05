var levelUpExp = 100;
var levelUpPoints = 2;

var options = [
    {
        ref: "options/game",
        name: "Game",
        icon: "tower"
    },
    {
        ref: "options/player",
        name: "Player",
        icon: "user"
    },
    {
        ref: "options/inventory",
        name: "Inventory",
        icon: "list-alt"
    },
    {
        ref: "options/map",
        name: "Map",
        icon: "map-marker"
    },
    {
        ref: "options/help",
        name: "Help",
        icon: "question-sign"
    },
    {
        ref: "options/about",
        name: "About",
        icon: "info-sign"
    }
];

var statusEffects = [
    {
        ref: "status/defending",
        description: "You hunker down.",
        effects: { dex: 2 }
    },
    {
        ref: "status/fatigued",
        description: "Fatigue sets in. You feel weaker, both mentally and physically.",
        effects: {
            str: -2,
            dex: -2,
            int: -2,
            cha: -2
        }
    }
];

var objects = [
    {
        ref: "objects/shortsword",
        group: "equipment",
        slot: "weapon",
        member: "Shortsword",
        location: [ "map/real/home" ],
        description: "This sword describes my sex life: short, simple, and not very effective.",
        stats: {
            att: 6
        },
        cost: 20
    },
    {
        ref: "objects/leatherarmor",
        group: "equipment",
        slot: "body",
        member: "Leather armor",
        location: [ "objects/chest1" ],
        description: "This is a simple light body and leg armor.",
        stats: {
            ac: 8
        },
        cost: 15
    },
    {
        ref: "objects/leatherboots",
        group: "equipment",
        slot: "feet",
        member: "Leather boots",
        location: [ "objects/chest1" ],
        description: "These boots are light and provide some defense.",
        stats: {
            ac: 4
        },
        cost: 10
    },
    {
        ref: "objects/healthpotion",
        group: "items",
        member: "Health potion",
        description: "This potion restores some health.",
        effects: {
            chp: 10
        },
        cost: 10
    },
    {
        ref: "objects/chest1",
        member: "Chest",
        location: [ "map/real/home" ],
        description: "It's an old chest!",
        actions: [
            {
                ref: "objects/leatherarmor",
                description: "Pick up the leather armor",
                preview: "Inside the chest you find some armor.",
                message: "You pick up the armor."
            },
            {
                ref: "objects/leatherboots",
                description: "Pick up the leather boots",
                preview: "There are some boots in here.",
                message: "You pick up the boots."
            },
            {
                ref: "..",
                description: "Close the chest"
            }
        ]
    }
];

var actors = [
    {
        ref: "actors/eannon",
        member: "Eannon",
        description: "The bartender of the Chamomile Arms is busy polishing glasses, as one would expect.",
        location: [ "map/real/chamomilearms" ],
        dialog: [
            {
                value: "Good to see you again, {0}. Take a seat anywhere.",
                props: [
                    "player/name"
                ]
            }
        ],
        actions: [
            {
                ref: "actors/eannon/dialog/0",
                description: "Introduce yourself"
            },
            {
                ref: "..",
                description: "Walk away"
            }
        ]
    },
    {
        ref: "actors/olis",
        member: "Olis",
        description: "The shopkeep smiles at you as you enter. He appears to have a shiny silver tooth.",
        location: [ "map/real/kaeliagoods" ],
        dialog: [
            {
                value: "Cheers, mate. You'll find whatever you need here, so take a look around!",
                answers: [
                    {
                        description: "Buy",
                        ref: "actors/olis/buy"
                    },
                    {
                        description: "Sell",
                        ref: "actors/olis/sell"
                    },
                    {
                        description: "I'm done",
                        ref: "actors/olis/dialog/1"
                    }
                ]
            },
            {
                value: "Let me know if there's anything else you need!"
            }
        ],
        inventory: [ "objects/healthpotion" ],
        actions: [
            {
                ref: "actors/olis/dialog/0",
                description: "Introduce yourself"
            },
            {
                ref: "..",
                description: "Walk away"
            }
        ]
    },
    {
        ref: "actors/zopha",
        member: "Zopha",
        description: "A shady-looking woman is leaning up against a house, glaring at passers by.",
        location: [ "map/real/kaeliasw" ],
        dialog: [
            {
                value: "I don't know what you're thinking, but I ain't up to nothing.",
                answers: [
                    {
                        description: "Sorry, just testing this dialog feature.",
                        ref: "actors/zopha/dialog/1"
                    }
                ]
            },
            {
                value: "Yeah, works fine. Now get outta here."
            }
        ],
        actions: [
            {
                ref: "actors/zopha/dialog/0",
                description: "Introduce yourself"
            },
            {
                ref: "..",
                description: "Walk away"
            }
        ]
    },
    {
        ref: "actors/junia",
        group: "Junia",
        description: "You notice a girl pacing by the town wall, seemingly waiting for someone.",
        location: [ "map/real/kaeliase" ],
        dialog: [
            {
                value: "Mind your own business, please."
            }
        ],
        actions: [
            {
                ref: "actors/junia/dialog/0",
                description: "Introduce yourself"
            },
            {
                ref: "..",
                description: "Walk away"
            }
        ]
    },
    {
        ref: "actors/felsie",
        member: "Felsie",
        description: "A local sellsword, Felsie, is at the grindstone, sharpening her blade.",
        location: [ "map/real/kaeliane" ],
        dialog: [
            {
                value: "Hey there, {0}. Fancy a duel?",
                props: [
                    "player/name"
                ]
            }
        ],
        actions: [
            {
                ref: "actors/felsie/dialog/0",
                description: "Introduce yourself"
            },
            {
                ref: "..",
                description: "Walk away"
            }
        ]
    },
    {
        ref: "actors/snail",
        member: "Snail",
        description: "A snail is crawling about.",
        location: [ "map/real/lakelullabyne" ],
        battle: {
            hp: 10,
            str: 4,
            ac: 10,
            init: 1,
            exp: 20
        },
        actions: [
            {
                ref: "actors/snail/battle",
                description: "Fight!"
            },
            {
                ref: "..",
                description: "Walk away"
            }
        ]
    },
    {
        ref: "actors/spider",
        member: "Spider",
        description: "A spider is crawling about.",
        location: [ "map/dream/lakelullabyne" ],
        battle: {
            hp: 10,
            str: 4,
            ac: 10,
            init: 1,
            exp: 20
        },
        actions: [
            {
                ref: "actors/spider/battle",
                description: "Fight!"
            },
            {
                ref: "..",
                description: "Walk away"
            }
        ]
    }
];

var battleActions = [
    {
        ref: "battle/attack",
        description: "Attack",
        value: "You attack the {0} and {1}"
    },
    {
        ref: "battle/defend",
        description: "Defend",
        value: "You hunker down."
    },
    {
        ref: "battle/flee",
        description: "Flee",
        value: "You run away!"
    },
    {
        ref: "battle/hit",
        value: "The {0} attacks you and {1}"
    },
    {
        ref: "battle/win",
        value: "You defeated the {0}! You obtained {1} experience points."
    }
];

var map = [
    {
        ref: "map/real/home",
        group: "Kaelia",
        member: "Home",
        description: "You're home! You feel comfortable and safe here.",
        actions: [
            {
                ref: "map/dream/home",
                preview: "Your bed looks inviting.",
                description: "Go to bed",
                message: "You wake up, feeling rested."
            },
            {
                ref: "objects/shortsword",
                preview: "Your trusty shortsword is hanging on the wall.",
                description: "Pick up sword",
                message: "You pick up the sword."
            },
            {
                ref: "objects/chest1",
                preview: "A dusty old chest is pushed up against your bed.",
                description: "Open the chest"
            },
            {
                ref: "map/real/kaeliase",
                description: "Exit"
            }
        ]
    },
    {
        ref: "map/real/kaeliase",
        group: "Chamomile Plains",
        member: "Southeast Kaelia Town",
        description: "Your hometown is nestled amidst rolling plains and a tranquil lake.",
        actions: [
            {
                ref: "map/real/home",
                preview: "Your house looks as welcoming as ever.",
                description: "Enter your house"
            },
            {
                ref: "actors/junia",
                preview: "You see a woman.",
                description: "Approach woman"
            },
            {
                ref: "map/real/kaeliane",
                description: "Go north"
            },
            {
                ref: "map/real/kaeliasw",
                description: "Go west"
            }
        ]
    },
    {
        ref: "map/real/kaeliasw",
        group: "Chamomile Plains",
        member: "Southwest Kaelia Town",
        description: "The southeastern part of town is a bit busier, as many shops are here.",
        actions: [
            {
                ref: "map/real/kaeliagoods",
                preview: "The Kaelia General Goods store is in the center of the town.",
                description: "Enter the goods store"
            },
            {
                ref: "actors/zopha",
                preview: "You see a woman.",
                description: "Approach woman"
            },
            {
                ref: "map/real/kaeliase",
                description: "Go east"
            }
        ]
    },
    {
        ref: "map/real/kaeliagoods",
        group: "Kaelia",
        member: "Kaelia General Goods",
        description: "You enter the general goods store, where you can buy a number of odds and ends.",
        actions: [
            {
                ref: "actors/olis",
                preview: "You see the shopkeep.",
                description: "Approach shopkeep"
            },
            {
                ref: "map/real/kaeliasw",
                description: "Exit"
            }
        ]
    },
    {
        ref: "map/real/kaeliane",
        group: "Chamomile Plains",
        member: "Northeast Kaelia Town",
        description: "Many enter town through the northeast corner, and also rest at the local inn.",
        actions: [
            {
                ref: "map/real/chamomilearms",
                preview: "Down the road is the Chamomile Arms, a local pub.",
                description: "Enter the pub"
            },
            {
                ref: "actors/felsie",
                preview: "You see a woman.",
                description: "Approach woman"
            },
            {
                ref: "map/real/lakelullabyne",
                description: "Leave town and go east"
            },
            {
                ref: "map/real/kaeliase",
                description: "Go south"
            }
        ]
    },
    {
        ref: "map/real/chamomilearms",
        group: "Kaelia",
        member: "The Chamomile Arms",
        description: "Once you enter the pub, you immediately smell fresh food and drink, and hear lively conversation.",
        actions: [
            {
                ref: "actors/eannon",
                preview: "You see the inkeeper.",
                description: "Approach inkeeper"
            },
            {
                ref: "map/real/kaeliane",
                description: "Exit"
            }
        ]
    },
    {
        ref: "map/real/lakelullabyne",
        group: "Chamomile Plains",
        member: "Lake Lullaby, Northeast Shores",
        description: "The shores of Lake Lullaby are always gentle, as though it were glass rather than water.",
        actions: [
            {
                ref: "map/real/kaeliane",
                description: "Go west into Kaelia Town"
            },
            {
                ref: "actors/snail",
                preview: "You see a large snail.",
                description: "Approach snail"
            }
        ]
    },
    {
        ref: "map/real/death",
        group: "Game over",
        member: "You died!",
        description: "Your eyelids draw shut as you gasp for your last breath of air. Remember that death is not the end, but only a transition.",
        actions: [
            {
                ref: "options/newgame",
                description: "Start a new game"
            }
        ]
    },
    {
        ref: "map/dream/home",
        group: "Kaelia",
        member: "Home",
        description: "You're home! You feel cold and uneasy.",
        actions: [
            {
                ref: "map/dream/kaeliase",
                description: "Exit"
            }
        ]
    },
    {
        ref: "map/dream/kaeliase",
        group: "Chamomile Plains",
        member: "Southeast Kaelia Town",
        description: "Your hometown is nestled amidst foggy plains and a tumultuous lake.",
        actions: [
            {
                ref: "map/dream/home",
                preview: "Your house looks as welcoming as ever.",
                description: "Enter your house"
            },
            {
                ref: "map/dream/kaeliane",
                description: "Go north"
            },
            {
                ref: "map/dream/kaeliasw",
                description: "Go west"
            }
        ]
    },
    {
        ref: "map/dream/kaeliasw",
        group: "Chamomile Plains",
        member: "Southwest Kaelia Town",
        description: "The southeastern part of town has some broken-down shops. You hear a dull hum from nowhere in particular here. It doesn't sound human.",
        actions: [
            {
                ref: "map/dream/kaeliagoods",
                preview: "The Kaelia General Goods store is in the center of the town.",
                description: "Enter the goods store"
            },
            {
                ref: "map/dream/kaeliase",
                description: "Go east"
            }
        ]
    },
    {
        ref: "map/dream/kaeliagoods",
        group: "Kaelia",
        member: "Kaelia General Goods",
        description: "You enter the general goods store, where you can buy a number of odds and ends.",
        actions: [
            {
                ref: "map/dream/kaeliasw",
                description: "Exit"
            }
        ]
    },
    {
        ref: "map/dream/kaeliane",
        group: "Chamomile Plains",
        member: "Northeast Kaelia Town",
        description: "A warm gust blows through the northeast gates.",
        actions: [
            {
                ref: "map/dream/chamomilearms",
                preview: "Down the road is the Chamomile Arms, a local pub.",
                description: "Enter the pub"
            },
            {
                ref: "map/dream/lakelullabyne",
                description: "Leave town and go east"
            },
            {
                ref: "map/dream/kaeliase",
                description: "Go south"
            }
        ]
    },
    {
        ref: "map/dream/chamomilearms",
        group: "Kaelia",
        member: "The Chamomile Arms",
        description: "Once you enter the pub, you immediately hear grumbling and loud coughing. You feel a sickness in the air.",
        actions: [
            {
                ref: "map/dream/kaeliane",
                description: "Exit"
            }
        ]
    },
    {
        ref: "map/dream/lakelullabyne",
        group: "Chamomile Plains",
        member: "Lake Lullaby, Northeast Shores",
        description: "The shores of Lake Lullaby are always rough, as though something below the opaque waves is incredibly restless.",
        actions: [
            {
                ref: "map/dream/kaeliane",
                description: "Go west into Kaelia Town"
            },
            {
                ref: "actors/spider",
                preview: "You see a large spider.",
                description: "Approach spider"
            }
        ]
    },
    {
        ref: "map/dream/death",
        group: "Dream over",
        member: "You died!",
        description: "Your eyelids draw shut as you gasp for your last breath of air. Remember that death is not the end, but only a transition.",
        actions: [
            {
                ref: "map/real/home",
                description: "Wake up"
            }
        ]
    },
];