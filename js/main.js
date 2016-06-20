"use strict";

var map = [
    {
        ref: "home",
        group: "Home",
        description: "Welcome to the world! The sky is blue and the grass is green.",
        actions: [
            {
                ref: "grassland",
                description: "Go east"
            },
            {
                ref: "forestedge",
                description: "Go southeast"
            }
        ]
    },
    {
        ref: "grassland",
        group: "Grassland",
        description: "Wow this place is boring. There isn't much to this place.",
        actions: [
            {
                ref: "home",
                description: "Go west"
            },
            {
                ref: "forestedge",
                description: "Go south"
            },
            {
                ref: "forest",
                description: "Go east"
            }
        ]
    },
    {
        ref: "forestedge",
        group: "Forest Edge",
        description: "You're finding your way around. This zone has some nice trees.",
        actions: [
            {
                ref: "home",
                description: "Go northwest"
            },
            {
                ref: "grassland",
                description: "Go north"
            },
            {
                ref: "forest",
                description: "Go northeast"
            }
        ]
    },
    {
        ref: "forest",
        group: "Forest",
        description: "You find yourself in a forest. It's dark and spooky.",
        actions: [
            {
                ref: "grassland",
                description: "Go west"
            },
            {
                ref: "forestedge",
                description: "Go southwest"
            }
        ]
    }
];

var getMemberByRef = function (array, ref) {
    for (var i in array) {
        if (array[i].ref === ref) return array[i];
    }
};

var Header = React.createClass({
    render: function () {
        return (
            <div>
                <div>
                    <button>Game</button>
                    <button>Player</button>
                    <button>Inventory</button>
                    <button>Map</button>
                    <button>Help</button>
                    <button>About</button>
                </div>
                <div>
                    <h1>{this.props.context.group}</h1>
                    <p>{this.props.context.description}</p>
                </div>
            </div>
        );
    }
});

var Actions = React.createClass({
    handleAction: function (ref) {
        this.props.onAction(ref);
    },
    render: function () {
        var buttons = [];
        this.props.context.actions.forEach(function (action) {
            buttons.push(<button onClick={this.handleAction.bind(this, action.ref)}>{action.description}</button>);
        }.bind(this));
        return (
            <div>{buttons}</div>
        );
    }
});

var Footer = React.createClass({
    render: function () {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">Copyright 2016 Matt Fugere. All rights reserved.</div>
                </div>
            </div>
        );
    }
});

var Game = React.createClass({
    getInitialState: function () {
        return {
            map: this.props.map,
            current: this.props.map[0].ref
        };
    },
    doAction: function (ref) {
        this.setState({ current: ref });
    },
    render: function () {
        return (
            <div class="container">
                <Header context={getMemberByRef(this.props.map, this.state.current)} />
                <Actions context={getMemberByRef(this.props.map, this.state.current)} onAction={this.doAction} />
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <Game map={map} />,
    document.getElementById("game")
);