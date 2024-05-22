class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");
    }

    init() {
        this.ACCELERATION = 500;
        this.DRAG = 500;
        this.JUMP_VELOCITY = -550;
        this.physics.world.gravity.y = 1500;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0; 
    }

    create() {
        // 创建Tilemap
        this.map = this.add.tilemap("ANIMEBOYW2CH",18, 18, 60, 20);

        this.tileset = this.map.addTilesetImage("kenny_tilemap_packed", "tilemap_tiles");

        // 创建背景图层
        this.backgroundLayer = this.map.createLayer("background", this.tileset, 0, 0);

        // 创建地面和平台图层
        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 0);
        this.groundLayer.setCollisionByProperty({ 
            collides: true 
        });

        // 创建对象层
        this.coins = this.map.createFromObjects("coin and flag", {
             name: "coin", key: "tilemap_sheet", frame: 151 
            });
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
        this.coinGroup = this.add.group(this.coins);

        this.flag = this.map.createFromObjects("coin and flag", { 
            name: "flag", key: "tilemap_sheet", frame: 112 
        })[0];
        this.physics.world.enable(this.flag, Phaser.Physics.Arcade.STATIC_BODY);

        // 创建玩家
        this.player = this.physics.add.sprite(30, 285, "platformer_characters", "tile_0022.png");
        this.player.setCollideWorldBounds(true);

        // 添加碰撞检测
        this.physics.add.collider(this.player, this.groundLayer);
        this.physics.add.overlap(this.player, this.coinGroup, this.collectCoin, null, this);
        this.physics.add.overlap(this.player, this.flag, this.completeLevel, null, this);

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        // 创建粒子效果
        this.walkEmitter = this.add.particles(0,0,"kenny-particles", {
            frame: ['flame_01.png', 'flame_04.png'],
            scale: { start: 0.03, end: 0.1 },
            maxAliveParticles: 111,
            lifespan: 350,
            alpha: { start: 1, end: 0.1 },
            on: false
        });
        this.walkEmitter.stop();        

        this.jumpEmitter = this.add.particles(0,0,"kenny-particles", {
            frame: ['trace_05.png', 'trace_06.png'],
            scale: { start: 0.03, end: 0.1 },
            maxAliveParticles: 200,
            lifespan: 300,
            alpha: { start: 1, end: 0.1 },
            on: false
        });
        this.jumpEmitter.stop();        

        // 预加载音效
        this.confirmationSound = this.sound.add("confirmation");
        this.jumpSound = this.sound.add("jumpsound"); 
        // 设置摄像机
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
        this.cameras.main.setDeadzone(300, 300);
        this.cameras.main.setZoom(this.SCALE);

        // 键盘输入
        this.cursors = this.input.keyboard.createCursorKeys();
        this.tKey = this.input.keyboard.addKey('T');
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setAccelerationX(-this.ACCELERATION);
            this.player.resetFlip();
            this.player.anims.play('walk', true);
            this.walkEmitter.startFollow(this.player, this.player.displayWidth / 2 - 10, this.player.displayHeight / 2 - 5, false);
            
            this.walkEmitter.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            if (this.player.body.blocked.down) {
                this.walkEmitter.start();
            }
        } else if (this.cursors.right.isDown) {
            this.player.setAccelerationX(this.ACCELERATION);
            this.player.setFlip(true, false);
            this.player.anims.play('walk', true);
            this.walkEmitter.startFollow(this.player, this.player.displayWidth / 2 - 10, this.player.displayHeight / 2 - 5, false);
            
            this.walkEmitter.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            if (this.player.body.blocked.down) {
                this.walkEmitter.start();
            }
        } else {
            this.player.setAccelerationX(0);
            this.player.setDragX(this.DRAG);
            this.player.anims.play('idle');
            this.walkEmitter.stop();
        }

        if (!this.player.body.blocked.down) {
            this.player.anims.play('jump');
        }
        if (this.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.player.body.setVelocityY(this.JUMP_VELOCITY);
            
            this.jumpEmitter.setPosition(this.player.x, this.player.y);
            this.jumpEmitter.start();
            this.jumpSound.play();
        } 
        else {

            this.jumpEmitter.stop();    
        }

        if (Phaser.Input.Keyboard.JustDown(this.tKey)) {
            this.scene.restart();
        }
    }

    collectCoin(player, coin) {
        coin.destroy();
    }

    completeLevel(player, flag) {
        // 播放音效
        this.confirmationSound.play();

        // 切换到游戏结束场景
        this.scene.start('GameOverScene');
    }
}
