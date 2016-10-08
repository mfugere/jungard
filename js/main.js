"use strict";

var GameModal = React.createClass({
    newGame: function () {
        this.props.onAction("options/newgame");
    },
    render: function () {
        var timeHrs = Math.floor(this.props.time);
        var timeMins = (this.props.time % timeHrs) * 60;
        var curTime = timeHrs.toString() + ":" + ((timeMins === 0) ? "00" : timeMins.toString());
        return (
            <div id="gameModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                        <div className="modal-header">
                            <h4 className="modal-title">Game Options</h4>
                        </div>
                        <div className="modal-body">
                            <p><b>Current time</b>:&nbsp;{curTime}</p>
                            <button className="btn btn-default" onClick={this.newGame} data-dismiss="modal">New Game</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var PlayerModal = React.createClass({
    getInitialState: function () {
        return {
            name: this.props.player.name, level: this.props.player.level,
            hp: this.props.player.hp, chp: this.props.player.chp,
            mp: this.props.player.mp, cmp: this.props.player.cmp,
            fp: this.props.player.fp, cfp: this.props.player.cfp,
            crg: this.props.player.crg, ccrg: this.props.player.ccrg,
            str: this.props.player.str, dex: this.props.player.dex,
            int: this.props.player.int, chr: this.props.player.chr,
            skillPoints: this.props.player.skillPoints
        };
    },
    componentWillReceiveProps: function () {
        this.setState(this.getInitialState());
    },
    componentDidUpdate: function () {
        $("[class^=chr-]").hide();
        $("." + this.props.mode).show();
        if (this.props.mode === "chr-view" && this.state.name !== this.props.player.name) this.setState(this.getInitialState()); 
    },
    onNameChange: function (e) {
        this.setState({ name: e.target.value });
        $(".error-name").hide();
    },
    modStat: function (statName, stat, mod, proxyMod) {
        var changes = {};
        changes[statName] = stat + mod;
        changes[proxyMod] = (mod > 0) ? this.state[proxyMod] + 10 : this.state[proxyMod] - 10;
        changes["skillPoints"] = this.state.skillPoints - mod;
        this.setState(changes);
    },
    rollStats: function () {
        $(".error-stats").hide();
        var newStats = {
            str: Math.floor(Math.random() * 4),
            dex: Math.floor(Math.random() * 4),
            int: Math.floor(Math.random() * 4),
            chr: Math.floor(Math.random() * 4)
        };
        newStats.hp = 10 + (newStats.str * 10);
        newStats.mp = newStats.int * 10;
        newStats.fp = 10 + (newStats.dex * 10);
        newStats.crg = newStats.chr * 10;
        this.setState(newStats);
    },
    save: function () {
        var valid = true;
        if (this.state.name === "") {
            valid = false;
            $(".error-name").show();
        }
        if (this.state.str === 0 && this.state.dex === 0 && this.state.int === 0 && this.state.chr === 0) {
            valid = false;
            $(".error-stats").show();
        }
        if (valid) {
            this.props.updatePlayer({
                name: this.state.name,
                hp: this.state.hp, chp: this.state.hp, mp: this.state.mp, cmp: this.state.mp,
                fp: this.state.fp, cfp: this.state.fp, crg: this.state.crg, ccrg: this.state.crg,
                str: this.state.str, dex: this.state.dex,int: this.state.int,chr: this.state.chr,
                skillPoints: this.state.skillPoints
            });
        }
    },
    render: function () {
        var statArr = [
            { name: "Skill points available", abbr: "skillPoints", attr: this.state.skillPoints, mod: false, canLose: false },
            { name: "Level", abbr: "level", attr: this.state.level, mod: false, canLose: false },
            { name: "Hit points", abbr: "hp", attr: this.state.hp, mod: false, canLose: true },
            { name: "Magic points", abbr: "mp", attr: this.state.mp, mod: false, canLose: true },
            { name: "Fatigue", abbr: "fp", attr: this.state.fp, mod: false, canLose: true },
            { name: "Courage", abbr: "crg", attr: this.state.crg, mod: false, canLose: true },
            { name: "Strength", abbr: "str", attr: this.state.str, mod: true, canLose: false, proxyMod: "hp" },
            { name: "Dexterity", abbr: "dex", attr: this.state.dex, mod: true, canLose: false, proxyMod: "fp" },
            { name: "Intelligence", abbr: "int", attr: this.state.int, mod: true, canLose: false, proxyMod: "mp" },
            { name: "Charisma", abbr: "chr", attr: this.state.chr, mod: true, canLose: false, proxyMod: "crg" }
        ];
        var statUI = statArr.map(function (stat, i) {
            var stripeClass = (i % 2 === 0) ? "evens" : "odds";
            var statUp = (this.state.skillPoints <= 0) ? "" :
                (<button type="button" className="btn btn-default" onClick={this.modStat.bind(this, stat.abbr, stat.attr, 1, stat.proxyMod)}>+</button>);
            var statDown = (stat.attr === this.props.player[stat.abbr]) ? "" :
                (<button type="button" className="btn btn-default" onClick={this.modStat.bind(this, stat.abbr, stat.attr, -1, stat.proxyMod)}>-</button>);
            var modifiers = (!stat.mod) ? "" : (
                <div className="chr-update col-xs-2">
                    {statDown}
                    {statUp}
                </div>
            );
            var currentStat = (!stat.canLose) ? "" : this.state["c" + stat.abbr] + " / ";
            return (
                <div key={stat.abbr + "Key"} className={stripeClass + " form-group"}>
                    <label className="col-xs-4 control-label">{stat.name}:&nbsp;</label>
                    <div className="col-xs-2">
                        <p className="form-control-static">{currentStat}{stat.attr}</p>
                    </div>
                    {modifiers}
                </div>
            );
        }, this);
        return (
            <div id="playerModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <button type="button" className="chr-view chr-update close" data-dismiss="modal"><span>&times;</span></button>
                        <div className="modal-header">
                            <h4 className="modal-title">Player Options</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <div className="row">
                                        <label for="charName" className="col-xs-4 control-label">Your name:&nbsp;</label>
                                        <div className="col-xs-8">
                                            <input type="text" className="chr-create form-control" id="charName" onChange={this.onNameChange} />
                                            <p className="chr-view chr-update form-control-static">{this.state.name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-offset-4 col-xs-8 help-block error-name">Please enter a name.</div>
                                    </div>
                                </div>
                                {statUI}
                                <div className="chr-create form-group">
                                    <div className="row">
                                        <div className="col-xs-offset-4 col-xs-8">
                                            <button type="button" className="btn btn-default" onClick={this.rollStats}>Roll Stats</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-offset-4 col-xs-8 help-block error-stats">Please roll your stats.</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <div className="pull-right">
                                <button className="chr-create chr-update btn btn-success" onClick={this.save}>Save</button>
                                <button className="chr-view chr-update btn btn-primary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var InventoryModal = React.createClass({
    getInitialState: function () {
        return { inventory: [] };
    },
    componentWillReceiveProps: function () {
        var detailedInventory = [];
        for (var i in this.props.player.inventory) {
            detailedInventory.push(getMemberByRef(this.props.objects, this.props.player.inventory[i]));
        }
        this.setState({ inventory: sortBy(detailedInventory, [ "group", "member" ]) });
    },
    equip: function (item) {
        var player = this.props.player;
        player.equipment[item.slot] = item;
        this.props.updatePlayer({ equipment: player.equipment });
    },
    unequip: function (slot) {
        var player = this.props.player;
        delete player.equipment[slot];
        this.props.updatePlayer({ equipment: player.equipment });
    },
    useItem: function (item) {
        // TODO
    },
    render: function () {
        var inventoryUI = this.state.inventory.map(function (item, i) {
            var stripeClass = (i % 2 === 0) ? "evens" : "odds";
            var itemAction;
            if (item.group === "equipment") {
                itemAction = (this.props.player.equipment[item.slot] &&
                    this.props.player.equipment[item.slot].ref === item.ref) ?
                    (<button className="btn btn-primary btn-xs" onClick={this.unequip.bind(this, item.slot)}>Unequip</button>) :
                    (<button className="btn btn-default btn-xs" onClick={this.equip.bind(this, item)}>Equip</button>);
            } else if (item.group === "items") {
                itemAction = (<button className="btn btn-default btn-xs" onClick={this.useItem.bind(this, item)}>Use</button>);
            }
            return (
                <div key={"invKey" + i} className={stripeClass + " row"}>
                    <span className="col-xs-4"><b>{item.member}</b></span>
                    <span className="col-xs-8">{itemAction}</span>
                </div>
            );
        }, this);
        return (
            <div id="inventoryModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                        <div className="modal-header">
                            <h4 className="modal-title">Your Inventory</h4>
                        </div>
                        <div className="modal-body">
                            {inventoryUI}
                        </div>
                        <div className="modal-footer">
                            <div className="pull-right">
                                <button className="btn btn-primary" data-dismiss="modal">Close</button>
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
                                <div className="panel-title">
                                    <h1>{this.props.context.member}&nbsp;<small>{this.props.context.group}</small></h1>
                                </div>
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
    handleAction: function (ref, actionMessage) {
        if (ref === "..") ref = this.props.context.location;
        if (ref.indexOf(this.props.context.ref) !== -1) {
            if (ref.indexOf("battle") !== -1) this.props.battle();
            else {
                var message = ref.replace(this.props.context.ref, "").substring(1);
                var messageSet = message.split("/");
                this.props.showMessage(messageSet[0], parseInt(messageSet[messageSet.length - 1]));
            }
        }
        else {
            this.props.onAction(ref, actionMessage);
        }
    },
    render: function () {
        var buttons = this.props.actions.map(function (action) {
            if (action.description) return (
                <button className="btn btn-default btn-lg btn-block"
                        key={action.ref}
                        onClick={this.handleAction.bind(this, action.ref, action.message)}>{action.description}
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
                    <div className="col-xs-12 text-center">Copyright 2016 Matt Fugere. All rights reserved.</div>
                </div>
            </div>
        );
    }
});

var Game = React.createClass({
    getInitialState: function () {
        return {
            time: 6.0,
            map: this.props.entities.map,
            actors: this.props.entities.actors,
            objects: this.props.entities.objects,
            player: {
                name: "",
                hp: 0, mp: 0, fp: 0, crg: 0, str: 0, dex: 0, chr: 0, int: 0,
                level: 1, exp: 0, skillPoints: 0, chp: 0, cmp: 0, cfp: 0, ccrg: 0,
                inventory: [], equipment: {}, activeStatus: [],
                ac: function (modifiers) {
                    var totalAc = this.dex + (modifiers["dex"] || 0);
                    var objKeys = Object.keys(this.equipment);
                    if (objKeys.length > 0) {
                        for (var i in objKeys) {
                            totalAc += this.equipment[objKeys[i]].stats["ac"] || 0;
                        }
                    }
                    return totalAc;
                },
                attackRoll: function () {
                    return (this.equipment["weapon"]) ? this.equipment["weapon"].stats["att"] : 2;
                }
            },
            current: this.props.entities.map[0],
            messages: [],
            mode: "chr-view",
            battling: false
        };
    },
    componentWillMount: function () {
        // Session load goes here.
    },
    componentDidMount: function () {
        if (this.state.player.name === "") {
            this.setState({ mode: "chr-create" }, function () {
                this.openMenu("Player");
            });
        }
    },
    componentDidUpdate: function () {
        var player = this.state.player;
        var messages = this.state.messages;
        if (player.cfp < 0) {
            if (this.state.current.ref.indexOf("dream") === -1) {
                player.cfp = 0;
                if (player.activeStatus.indexOf("fatigued") === -1) {
                    player.activeStatus.push("fatigued");
                    messages.push(getMemberByRef(this.props.entities.status, "status/fatigued").description);
                }
                else messages.push("You feel tired. You should get to bed.");
            } else {
                player.cfp = player.fp;
            }
            this.setState({ player: player, messages: messages });
        }
        if (player.name === "" && this.state.mode === "chr-view") {
            this.setState({ mode: "chr-create" }, function () {
                this.openMenu("Player");
            });
        }
    },
    updatePlayer: function (updates) {
        var player = this.state.player;
        for (var key in updates) {
            if (updates.hasOwnProperty(key)) {
                player[key] = updates[key];
            }
        }
        this.setState({ player: player, mode: "chr-view" });
    },
    enemyTurn: function (enemy) {
        var hitStatus = "";
        var player = this.state.player;
        var playerAc = player.ac(this.getModifiers());
        if (player.activeStatus.indexOf("defending") !== -1)
            player.activeStatus.splice(player.activeStatus.indexOf("defending"), 1);
        if (diceRoll(20) >= playerAc) {
            player.ccrg -= 2;
            var playerDamage = diceRoll(enemy.battle.str);
            player.chp -= playerDamage;
            hitStatus = "does " + playerDamage + " points of damage.";
        } else {
            hitStatus = "misses!";
        }
        this.setState({ player: player });
        for (var i in this.props.entities.battle) {
            if (this.props.entities.battle[i].ref === "battle/hit") {
                this.addMessages([ interpolate(this.props.entities.battle[i].value, [ enemy.member, hitStatus ]) ]);
            }
        }
        if (player.chp <= 0) {
            var realOrDream = (this.state.current.location.indexOf("real") === -1) ? "dream" : "real";
            player.chp = player.hp;
            this.setState({ battling: false, player: player }, function () {
                this.doAction("map/" + realOrDream + "/death");
            });
        }
    },
    doAction: function (ref, prevMessage) {
        this.setState({ time: this.state.time + 0.25 });
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
            var player = this.state.player;
            if (ref.indexOf("dream") === -1) player.cfp -= 1;
            for (var i in this.props.entities.battle) {
                if (this.props.entities.battle[i].ref === ref) {
                    actionMessage = this.props.entities.battle[i].value
                }
            }
            switch (ref) {
                case "battle/attack":
                    var hitStatus = "";
                    if (diceRoll(20) + (this.state.player.str + (this.getModifiers()["str"] || 0)) >= target.battle.ac) {
                        player.ccrg += 1;
                        if (player.ccrg > player.crg) player.ccrg = player.crg;
                        var attRoll = this.state.player.attackRoll();
                        var enemyDamage = diceRoll(attRoll);
                        target.battle.hp -= enemyDamage;
                        this.setState({ actors: actors, player: player });
                        hitStatus = "do " + enemyDamage + " points of damage.";
                        if (target.battle.hp <= 0) {
                            nextAction = "battle/win";
                        }
                    } else {
                        hitStatus = "miss!";
                    }
                    messages.push(interpolate(actionMessage, [ target.member, hitStatus ]));
                    break;
                case "battle/defend":
                    player.activeStatus.push("defending");
                    messages.push(getMemberByRef(this.props.entities.status, "status/defending").description);
                    this.setState({ player: player });
                    break;
                case "battle/flee":
                    this.setState({ current: getMemberByRef(this.state.map, target.location), battling: false });
                    messages.push(actionMessage);
                    break;
                case "battle/win":
                    player.exp += target.battle.exp;
                    player.ccrg += (ref.indexOf("dream") === -1) ? 1 : 2;
                    if (player.ccrg > player.crg) player.ccrg = player.crg;
                    messages.push(interpolate(actionMessage, [ target.member, target.battle.exp ]));
                    if (player.exp >= levelUpExp) {
                        player.level += 1;
                        player.skillPoints += levelUpPoints;
                        player.exp = player.exp % levelUpExp;
                        messages.push("You've ascended to Level " + player.level + "!");
                        this.setState({ mode: "chr-update" }, function () {
                            this.openMenu("Player");
                        });
                    }
                    this.kill(this.state.current.ref, this.state.current.location);
                    this.setState({ player: player, current: getMemberByRef(this.state.map, target.location), battling: false });
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
            var player = this.state.player;
            if (ref.indexOf("dream") === -1) player.cfp -= 1;
            var splitRef = ref.split("/");
            var newMessages = (prevMessage) ? [ prevMessage ] : [];
            var next = getMemberByRef(this.props.entities[ref.split("/")[0]], ref);
            if (!next.actions) {
                player.inventory.push(ref);
                this.kill(ref, next.location);
                this.setState({ messages: newMessages, player: player });
            } else {
                if (next.ref.indexOf("dream") !== -1) {
                    if (this.state.current.ref.indexOf("real") !== -1) {
                        player.chp = player.hp;
                        player.cmp = player.mp;
                        player.cfp = player.fp;
                        player.timeOfSleep = this.state.time;
                        player.activeStatus.splice(player.activeStatus.indexOf("fatigued"), 1);
                    } else if (timeDifference(this.state.time, player.timeOfSleep) >= 8 || player.ccrg <= 0) {
                        player.cfp = player.ccrg + (player.fp / 2);
                        if (player.cfp > player.fp) player.cfp = player.fp;
                        next = getMemberByRef(this.props.entities.map, "map/real/home");
                        newMessages.push("You wake up.");
                    }
                }
                this.setState({ current: next, messages: newMessages, player: player });
            }
        }
        if (nextAction) (nextAction === "battle/enemy") ? this.enemyTurn(target) : this.doAction(nextAction);
    },
    kill: function (ref, location) {
        var tableName = location.split("/")[0];
        var table = this.state[tableName];
        for (var i in table) {
            var actions = table[i].actions;
            for (var j in actions) {
                if (actions[j].ref === ref) delete actions[j];
            }
        }
        var updates = {};
        updates[tableName] = table;
        this.setState(updates);
    },
    showMessage: function (table, key, values) {
        var property = this.state.current[table][key];
        if (values !== undefined) addMessages([ interpolate(property[i].value, values) ]);
        else if (property.props) {
            var propsValues = [];
            for (var j in property.props) {
                var objRef = property.props[j].split("/");
                var objValue = this.state[objRef[0]];
                if (objRef.length > 1) {
                    for (var k = 1; k < objRef.length; k++) {
                        objValue = objValue[objRef[k]];
                    }
                }
                propsValues.push(objValue);
            }
            this.addMessages([ interpolate(property.value, propsValues) ]);
        }
        else this.addMessages([ property.value ]);
        this.setState({ dialog: property.answers });
    },
    addMessages: function (messages) {
        this.setState(function(prev, props) {
            var newMessages = prev.messages.concat(messages);
            return { messages: newMessages };
        });
    },
    getModifiers: function () {
        var modifiers = {};
        var active = this.state.player.activeStatus;
        for (var i in active) {
            var statusData = getMemberByRef(this.props.entities.status, "status/" + active[i]);
            var objKeys = Object.keys(statusData.effects);
            for (var j in objKeys) {
                if (modifiers[objKeys[j]]) modifiers[objKeys[j]] += statusData[objKeys[j]];
                else modifiers[objKeys[j]] = statusData[objKeys[j]];
            }
        }
        return modifiers;
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
        $("#" + modalName + "Modal").modal({ backdrop: "static", keyboard: false });
    },
    render: function () {
        var actions = this.state.current.actions;
        if (this.state.battling) actions = this.props.entities.battle
        else if (this.state.dialog) actions = this.state.dialog;
        return (
            <div>
                <Header context={this.state.current} messages={this.state.messages} options={this.props.entities.options} openMenu={this.openMenu} />
                <Actions context={this.state.current} actions={actions} onAction={this.doAction} showMessage={this.showMessage} battle={this.battle} />
                <Footer />
                <GameModal time={this.state.time} onAction={this.doAction} />
                <PlayerModal player={this.state.player} updatePlayer={this.updatePlayer} mode={this.state.mode} />
                <InventoryModal objects={this.state.objects} player={this.state.player} updatePlayer={this.updatePlayer} />
            </div>
        );
    }
});

ReactDOM.render(
    <Game entities={{ options: options, status: statusEffects, objects: objects, battle: battleActions, actors: actors, map: map }} />,
    document.getElementById("game")
);