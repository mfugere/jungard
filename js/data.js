var levelUpExp = 100;

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

"Game", "Player", "Inventory", "Map", "Help", "About"

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
        location: "map/forest",
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
        location: "map/deepforest",
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
        group: "Home",
        description: "Welcome to the world! The sky is blue and the grass is green.",
        actions: [
            {
                ref: "map/grassland",
                description: "Go east"
            },
            {
                ref: "map/forestedge",
                description: "Go southeast"
            }
        ]
    },
    {
        ref: "map/grassland",
        group: "Grassland",
        description: "Wow this place is boring. There isn't much to this place.",
        actions: [
            {
                ref: "map/home",
                description: "Go west"
            },
            {
                ref: "map/forestedge",
                description: "Go south"
            },
            {
                ref: "map/forest",
                description: "Go east"
            }
        ]
    },
    {
        ref: "map/forestedge",
        group: "Forest Edge",
        description: "You're finding your way around. This zone has some nice trees.",
        actions: [
            {
                ref: "map/home",
                description: "Go northwest"
            },
            {
                ref: "map/grassland",
                description: "Go north"
            },
            {
                ref: "map/forest",
                description: "Go northeast"
            }
        ]
    },
    {
        ref: "map/forest",
        group: "Forest",
        description: "You find yourself in a forest. It's dark and spooky.",
        actions: [
            {
                ref: "map/grassland",
                description: "Go west"
            },
            {
                ref: "map/forestedge",
                description: "Go southwest"
            },
            {
                ref: "map/deepforest",
                description: "Go east"
            },
            {
                ref: "actors/jim",
                preview: "You see a man.",
                description: "Approach man"
            }
        ]
    },
    {
        ref: "map/deepforest",
        group: "Deep Forest",
        description: "You're now in a dark part of the forest. It's darker and spookier.",
        actions: [
            {
                ref: "map/forest",
                description: "Go west"
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