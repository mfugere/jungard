"use strict";

var map = [
    {
        id: 0,
        area: "Home",
        description: "Welcome to the world! The sky is blue and the grass is green.",
        paths: [ 1, 2 ]
    },
    {
        id: 1,
        area: "Grassland",
        description: "Wow this place is boring. There isn't much to this place.",
        paths: [ 0, 2, 3 ]
    },
    {
        id: 2,
        area: "Forest Edge",
        description: "You're finding your way around. This zone has some nice trees.",
        paths: [ 0, 1, 3 ]
    },
    {
        id: 3,
        area: "Forest",
        description: "You find yourself in a forest. It's dark and spooky.",
        paths: [ 1, 2 ]
    }
];

var Play = React.createClass({
    getInitialState: function () {
        return { zone: this.props.zones[0] };
    },
    onNextZone: function () {
        var nextZone = this.props.zones[this.state.zone.id + 1];
        if (nextZone) this.setState({ zone: this.props.zones[this.state.zone.id + 1]});
    },
    render: function () {
        return (
            <div className="play">
                <h3>{this.state.zone.area}</h3>
                <p>{this.state.zone.description}</p>
                <button onClick={this.onNextZone}>Next Zone</button>
            </div>
        );
    }
});

ReactDOM.render(
    <Play zones={map} />,
    document.getElementById("container")
);