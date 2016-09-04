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

var objects = [
    {
        ref: "objects/shortsword",
        group: "sword",
        description: "This sword describes my sex life: short, simple, and not very effective.",
        stats: [
            {
                key: "Attack",
                value: 6
            }
        ]
    },
    {
        ref: "objects/leatherarmor",
        group: "leather armor",
        description: "This is a simple light body and leg armor.",
        stats: [
            {
                key: "Defense",
                value: 8
            }
        ]
    },
    {
        ref: "objects/leatherboots",
        group: "leather armor",
        description: "This boots are light and provide some defense.",
        stats: [
            {
                key: "Defense",
                value: 4
            }
        ]
    }
]

var actors = [
    {
        ref: "actors/eannon",
        member: "Eannon",
        description: "The bartender of the Chamomile Arms is busy polishing glasses, as one would expect.",
        location: "map/real/chamomilearms",
        dialog: [
            {
                key: "intro",
                value: "Welcome to the Chamomile Arms, friend. Name's Eannon. Take a seat anywhere."
            }
        ],
        actions: [
            {
                ref: "actors/eannon/dialog/intro",
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
        location: "map/real/kaeliagoods",
        dialog: [
            {
                key: "intro",
                value: "Cheers, mate. You'll find whatever you need here, so take a look around!"
            }
        ],
        actions: [
            {
                ref: "actors/olis/dialog/intro",
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
        location: "map/real/kaeliasw",
        dialog: [
            {
                key: "intro",
                value: "I don't know what you're thinking, but I ain't up to nothing."
            }
        ],
        actions: [
            {
                ref: "actors/zopha/dialog/intro",
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
        location: "map/real/kaeliase",
        dialog: [
            {
                key: "intro",
                value: "Mind your own business, please."
            }
        ],
        actions: [
            {
                ref: "actors/junia/dialog/intro",
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
        location: "map/real/kaeliane",
        dialog: [
            {
                key: "intro",
                value: "Hey there. Fancy a duel?"
            }
        ],
        actions: [
            {
                ref: "actors/felsie/dialog/intro",
                description: "Introduce yourself"
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
        location: "map/real/lakelullabyne",
        battle: {
            hp: 10,
            str: 4,
            ac: 10,
            init: 1,
            exp: 100
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
        key: "attack",
        value: "You attack the {0} and {1}"
    },
    {
        ref: "battle/defend",
        description: "Defend",
        key: "defend",
        value: "You hunker down."
    },
    {
        ref: "battle/flee",
        description: "Flee",
        key: "flee",
        value: "You run away!"
    },
    {
        ref: "battle/hit",
        key: "hit",
        value: "The {0} attacks you and {1}"
    },
    {
        ref: "battle/win",
        key: "win",
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
                ref: "actors/spider",
                preview: "You see a large spider.",
                description: "Approach spider"
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
                ref: "map/real/kaeliase",
                description: "Exit"
            }
        ]
    }
];