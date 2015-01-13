var game = new Phaser.Game(640, 640, Phaser.AUTO, 'jungard', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('player', 'img/player.png');
    game.load.image('floor', 'img/floor.png');
}

var player;
var cursors;
var floor;
var buttons = {};

function create() {

    floor = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'floor');

    game.physics.startSystem(Phaser.Physics.ARCADE);

    player = game.add.sprite(32, 32, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.setSize(32, 32, 0, 0);
    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
    }
    else if (cursors.up.isDown) {
        player.body.velocity.y = -150;
    }
    else if (cursors.down.isDown) {
        player.body.velocity.y = 150;
    }
}

function render() {

}