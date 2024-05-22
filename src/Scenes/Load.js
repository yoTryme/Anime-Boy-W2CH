class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load the character sprite atlas
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        // Load tile map
        this.load.image("tilemap_tiles", "tilemap_packed.png");
        this.load.tilemapTiledJSON("ANIMEBOYW2CH", "ANIMEBOYW2CH.tmj");
        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });
        
        // Load background image
        this.load.image("background_tiles", "tilemap-backgrounds_packed.png");
        this.load.spritesheet("background_sheet", "tilemap-backgrounds_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });
        // Load particle effects
        this.load.multiatlas("kenny-particles", "kenny-particles.json");

        // Load sound effects
        this.load.audio("confirmation", "confirmation_002.ogg");
        this.load.audio("jumpsound", "jumpsound.ogg");

    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('platformer_characters', { 
                prefix: "tile_", 
                start: 0, 
                end: 1, 
                suffix: ".png", 
                zeroPad: 4 
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            defaultTextureKey: "platformer_characters",
            frames: [{ frame: "tile_0000.png" }],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "platformer_characters",
            frames: [{ frame: "tile_0001.png" }],
        });

        this.scene.start("platformerScene");
    }
}