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
        ref: "actors/jim",
        group: "Jim",
        description: "You see a man. He's wearing a baseball cap and has a wooden leg.",
        location: "map/kaeliane",
        dialog: [
            {
                key: "intro",
                value: "Hey buddy, my name is Jim!"
            }
        ],
        actions: [
            {
                ref: "actors/jim/dialog/intro",
                description: "Introduce yourself!"
            },
            {
                ref: "..",
                description: "Walk away"
            }
        ]
    },
    {
        ref: "actors/spider",
        group: "Spider",
        description: "A spider is crawling about.",
        location: "map/lakelullabyne",
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
        ref: "map/home",
        group: "Kaelia",
        member: "Home",
        description: "You're home! You feel comfortable and safe here.",
        actions: [
            {
                ref: "map/kaeliase",
                description: "Exit"
            }
        ]
    },
    {
        ref: "map/kaeliase",
        group: "Chamomile Plains",
        member: "Southeast Kaelia Town",
        description: "Your hometown is nestled amidst rolling plains and a tranquil lake.",
        actions: [
            {
                ref: "map/home",
                preview: "Your house looks as welcoming as ever.",
                description: "Enter your house"
            },
            {
                ref: "map/kaeliane",
                description: "Go north"
            },
            {
                ref: "map/kaeliasw",
                description: "Go west"
            }
        ]
    },
    {
        ref: "map/kaeliasw",
        group: "Chamomile Plains",
        member: "Southwest Kaelia Town",
        description: "The southeastern part of town is a bit busier, as many shops are here.",
        actions: [
            {
                ref: "map/kaeliagoods",
                preview: "The Kaelia General Goods store is in the center of the town.",
                description: "Enter the goods store"
            },
            {
                ref: "map/kaeliase",
                description: "Go east"
            }
        ]
    },
    {
        ref: "map/kaeliagoods",
        group: "Kaelia",
        member: "Kaelia General Goods",
        description: "You enter the general goods store, where you can buy a number of odds and ends.",
        actions: [
            {
                ref: "map/kaeliasw",
                description: "Exit"
            }
        ]
    },
    {
        ref: "map/kaeliane",
        group: "Chamomile Plains",
        member: "Northeast Kaelia Town",
        description: "Many enter town through the northeast corner, and also rest at the local inn.",
        actions: [
            {
                ref: "map/chamomilearms",
                preview: "Down the road is the Chamomile Arms, a local pub.",
                description: "Enter the pub"
            },
            {
                ref: "actors/jim",
                preview: "You see a man.",
                description: "Approach man"
            },
            {
                ref: "map/lakelullabyne",
                description: "Leave town and go east"
            },
            {
                ref: "map/kaeliase",
                description: "Go south"
            }
        ]
    },
    {
        ref: "map/chamomilearms",
        group: "Kaelia",
        member: "The Chamomile Arms",
        description: "Once you enter the pub, you immediately smell fresh food and drink, and hear lively conversation.",
        actions: [
            {
                ref: "map/kaeliane",
                description: "Exit"
            }
        ]
    },
    {
        ref: "map/lakelullabyne",
        group: "Chamomile Plains",
        member: "Lake Lullaby, Northeast Shores",
        description: "The shores of Lake Lullaby are always gentle, as though it were glass rather than water.",
        actions: [
            {
                ref: "map/kaeliane",
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
        ref: "map/death",
        group: "You died!",
        description: "Your eyelids draw shut as you gasp for your last breath of air. Remember that death is not the end, but only a transition.",
        actions: [
            {
                ref: "options/newgame",
                description: "Start a new game"
            }
        ]
    }
];