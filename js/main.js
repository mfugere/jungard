"use strict";

var GameModal = React.createClass({
    render: function () {
        return (
            <div id="gameModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                        <div className="modal-header">
                            <h4 className="modal-title">Game Options</h4>
                        </div>
                        <div className="modal-body">Test</div>
                    </div>
                </div>
            </div>
        );
    }
});

var PlayerModal = React.createClass({
    getInitialState: function () {
        return {
            name: this.props.player.name,
            str: this.props.player.str,
            dex: this.props.player.dex,
            int: this.props.player.int,
            chr: this.props.player.chr
        };
    },
    onNameChange: function (e) {
        this.setState({ name: e.target.value });
    },
    rollStats: function () {
        this.setState({
            str: Math.floor(Math.random() * 6),
            dex: Math.floor(Math.random() * 6),
            int: Math.floor(Math.random() * 6),
            chr: Math.floor(Math.random() * 6),
        });
    },
    save: function () {
        this.props.updatePlayer({
            name: this.state.name,
            str: this.state.str,
            dex: this.state.dex,
            int: this.state.int,
            chr: this.state.chr
        });
    },
    render: function () {
        return (
            <div id="playerModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                        <div className="modal-header">
                            <h4 className="modal-title">Player Options</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label for="charName" className="col-xs-4 control-label">Your name:&nbsp;</label>
                                    <div className="col-xs-8">
                                        <input type="text" className="form-control" id="charName" onChange={this.onNameChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-4 control-label">Strength:&nbsp;</label>
                                    <div className="col-xs-8">
                                        <p className="form-control-static">{this.state.str}</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-4 control-label">Dexterity:&nbsp;</label>
                                    <div className="col-xs-8">
                                        <p className="form-control-static">{this.state.dex}</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-4 control-label">Intelligence:&nbsp;</label>
                                    <div className="col-xs-8">
                                        <p className="form-control-static">{this.state.int}</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-xs-4 control-label">Charisma:&nbsp;</label>
                                    <div className="col-xs-8">
                                        <p className="form-control-static">{this.state.chr}</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-xs-offset-2 col-xs-10">
                                        <button type="button" className="btn btn-default" onClick={this.rollStats}>Roll Stats</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <div className="pull-right">
                                <button className="btn btn-success" data-dismiss="modal" onClick={this.save}>Save</button>
                                <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var MenuBar = React.createClass({
    openMenu: function (name) {
        this.props.openMenu(name);
    },
    render: function () {
        var menuItems = this.props.options.map(function (option) {
            return (
                <div key={option.ref} className="row">
                    <button className="col-xs-12 btn btn-default" onClick={this.openMenu.bind(this, option.name)}>
                        <span className={"glyphicon glyphicon-" + option.icon}></span>
                        &nbsp;{option.name}
                    </button>
                </div>
            );
        }, this);
        return (
            <div className="col-xs-4">
                <div>{menuItems}</div>
            </div>
        );
    }
});

var Header = React.createClass({
    componentDidUpdate: function () {
        $(".messages").scrollTop($(".messages")[0].scrollHeight);
    },
    render: function () {
        var previews = this.props.context.actions.map(function (action) {
            if (action.preview) return (<p key={action.ref + "/preview"}>{action.preview}</p>);
        });
        var messages = this.props.messages.map(function (message, i) {
            return (<p key={"message" + i}>{message}</p>);
        });
        return (
            <div className="container panel panel-default">
                <div className="row panel-body">
                    <MenuBar options={this.props.options} openMenu={this.props.openMenu} />
                    <div className="col-xs-8">
                        <div className="row panel panel-default">
                            <div className="panel-heading">
                                <div className="panel-title">{this.props.context.group}</div>
                            </div>
                            <div className="panel-body messages">
                                <p>{this.props.context.description}</p>
                                <div>{previews}</div>
                                <div>{messages}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var Actions = React.createClass({
    handleAction: function (ref) {
        if (ref === "..") ref = this.props.context.location;
        if (ref.indexOf(this.props.context.ref) !== -1) {
            if (ref.indexOf("battle") !== -1) this.props.battle();
            else {
                var message = ref.replace(this.props.context.ref, "").substring(1);
                var messageSet = message.split("/");
                this.props.showMessage(messageSet[0], messageSet[messageSet.length - 1]);
            }
        }
        else this.props.onAction(ref);
    },
    render: function () {
        var buttons = this.props.actions.map(function (action) {
            if (action.description) return (
                <button className="btn btn-default btn-lg btn-block"
                        key={action.ref}
                        onClick={this.handleAction.bind(this, action.ref)}>{action.description}
                </button>
            );
        }, this);
        return (
            <div className="container panel panel-default">
                <div className="row panel-heading">
                    <div className="panel-title">Available Actions</div>
                </div>
                <div className="row panel-body">
                    <div className="col-xs-12">{buttons}</div>
                </div>
            </div>
        );
    }
});

var Footer = React.createClass({
    render: function () {
        return (
            <div className="container panel panel-default">
                <div className="row panel-body">
                    <div className="col-xs-12">Copyright 2016 Matt Fugere. All rights reserved.</div>
                </div>
            </div>
        );
    }
});

var Game = React.createClass({
    getInitialState: function () {
        return {
            map: this.props.entities.map,
            actors: this.props.entities.actors,
            player: {
                name: "",
                hp: 20, crg: 0, str: 0, dex: 0, chr: 0, int: 0,
                level: 1, exp: 0,
                weapon: getMemberByRef(this.props.entities.objects, "objects/shortsword"),
                armor: [
                    getMemberByRef(this.props.entities.objects, "objects/leatherarmor"),
                    getMemberByRef(this.props.entities.objects, "objects/leatherboots")
                ],
                activeEffects: {},
                ac: function () {
                    var totalAc = this.dex;
                    for (var i in this.armor) {
                        for (var j in this.armor[i].stats) {
                            if (this.armor[i].stats[j].key === "Defense") totalAc += this.armor[i].stats[j].value;
                        }
                    }
                    return totalAc;
                },
                attackRoll: function () {
                    for (var i in this.weapon.stats) {
                        if (this.weapon.stats[i].key === "Attack") return this.weapon.stats[i].value;
                    }
                }
            },
            current: this.props.entities.map[0],
            messages: [],
            battling: false
        };
    },
    componentWillMount: function () {
        // Session load goes here.
    },
    componentDidMount: function () {
        if (this.state.player.name === "") $("#playerModal").modal();
    },
    updatePlayer: function (updates) {
        var player = this.state.player;
        for (var key in updates) {
            if (updates.hasOwnProperty(key)) {
                player[key] = updates[key];
            }
        }
        this.setState({ player: player });
    },
    enemyTurn: function (enemy) {
        var hitStatus = "";
        var player = this.state.player;
        var playerAc = player.ac();
        if (player.activeEffects.ac) {
            playerAc += player.activeEffects.ac;
            delete player.activeEffects.ac;
        }
        if (diceRoll(20) >= playerAc) {
            var playerDamage = diceRoll(enemy.battle.str);
            player.hp -= playerDamage;
            this.setState({ player: player });
            hitStatus = "does " + playerDamage + " points of damage.";
        } else {
            hitStatus = "misses!";
        }
        for (var i in this.props.entities.battle) {
            if (this.props.entities.battle[i].ref === "battle/hit") {
                this.addMessages([ interpolate(this.props.entities.battle[i].value, [ enemy.group, hitStatus ]) ]);
            }
        }
        if (player.hp <= 0) {
            this.setState({ battling: false }, function () {
                this.doAction("map/death");
            });
        }
    },
    doAction: function (ref) {
        if (ref === "options/newgame") {
            this.setState(this.getInitialState());
            return;
        }
        var nextAction;
        if (this.state.battling) {
            var messages = [];
            var actionMessage;
            var actors = this.state.actors;
            var target = this.state.current;
            for (var i in this.props.entities.battle) {
                if (this.props.entities.battle[i].ref === ref) {
                    actionMessage = this.props.entities.battle[i].value
                }
            }
            switch (ref) {
                case "battle/attack":
                    var hitStatus = "";
                    if (diceRoll(20) + this.state.player.str >= target.battle.ac) {
                        var enemyDamage = diceRoll(this.state.player.attackRoll());
                        target.battle.hp -= enemyDamage;
                        this.setState({ actors: actors });
                        hitStatus = "do " + enemyDamage + " points of damage.";
                        if (target.battle.hp <= 0) {
                            nextAction = "battle/win";
                        }
                    } else {
                        hitStatus = "miss!";
                    }
                    messages.push(interpolate(actionMessage, [ target.group, hitStatus ]));
                    break;
                case "battle/defend":
                    var player = this.state.player;
                    player.activeEffects.ac = 2;
                    this.setState({ player: player });
                    messages.push(actionMessage);
                    break;
                case "battle/flee":
                    this.setState({ current: getMemberByRef(this.state.map, target.location), battling: false });
                    messages.push(actionMessage);
                    break;
                case "battle/win":
                    var player = this.state.player;
                    player.exp += target.battle.exp;
                    this.setState({ current: getMemberByRef(this.state.map, target.location), battling: false });
                    messages.push(interpolate(actionMessage, [ target.group, target.battle.exp ]));
                    if (player.exp >= levelUpExp) {
                        player.level += 1;
                        player.exp = player.exp % levelUpExp;
                        messages.push("You've ascended to Level " + player.level + "!");
                    }
                    this.kill(this.state.current.ref);
                    break;
                default:
                    break;
            }
            if (target.battle.hp > 0 && (ref === "battle/attack" || ref === "battle/defend")) {
                nextAction = "battle/enemy";
            }
            this.addMessages(messages);
        }
        else {
            var splitRef = ref.split("/");
            var next = getMemberByRef(this.props.entities[ref.split("/")[0]], ref);
            this.setState({ current: next, messages: [] });
        }
        if (nextAction) (nextAction === "battle/enemy") ? this.enemyTurn(target) : this.doAction(nextAction);
    },
    kill: function (ref) {
        var map = this.props.entities.map;
        for (var i in map) {
            var actions = map[i].actions;
            for (var j in actions) {
                if (actions[j].ref === ref) delete actions[j];
                this.setState({ map: map });
            }
        }
    },
    showMessage: function (table, key, values) {
        var property = this.state.current[table];
        for (var i in property) {
            if (property[i].key === key) {
                if (values !== undefined) addMessages([ interpolate(property[i].value, values) ]);
                else this.addMessages([ property[i].value ]);
            }
        }
    },
    addMessages: function (messages) {
        this.setState(function(prev, props) {
            var newMessages = prev.messages.concat(messages);
            return { messages: newMessages };
        });
    },
    battle: function () {
        this.setState({ battling: !this.state.battling }, function () {
            var tInit = diceRoll(20) + this.state.current.battle.init;
            var pInit = diceRoll(20) + this.state.player.dex;
            if (tInit > pInit) this.enemyTurn(this.state.current);
        });
    },
    openMenu: function (name) {
        var modalName = name.toLowerCase();
        $("#" + modalName + "Modal").modal();
    },
    render: function () {
        var actions = (this.state.battling) ? this.props.entities.battle : this.state.current.actions;
        return (
            <div>
                <Header context={this.state.current} messages={this.state.messages} options={this.props.entities.options} openMenu={this.openMenu} />
                <Actions context={this.state.current} actions={actions} onAction={this.doAction} showMessage={this.showMessage} battle={this.battle} />
                <Footer />
                <GameModal />
                <PlayerModal player={this.state.player} updatePlayer={this.updatePlayer} />
            </div>
        );
    }
});

ReactDOM.render(
    <Game entities={{ options: options, objects: objects, battle: battleActions, actors: actors, map: map }} />,
    document.getElementById("game")
);