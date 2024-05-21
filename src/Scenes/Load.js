class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load the character sprite atlas
        this.load.atlas("platformer_characters", "tilemap-characters_packed.png", "tilemap-characters-packed.json");

        // Load tile map
        this.load.image("tilemap_tiles", "tilemap_packed.png");
        this.load.tilemapTiledJSON("ANIMEBOYW2CH", "ANIMEBOYW2CH.tmj");
        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });
        // Load background image
        this.load.image("background_tiles", "tilemap-backgrounds_packed.png");

        // Load particle effects
        this.load.multiatlas("kenny-particles", "kenny-particles.json");

        // Load sound effects
        this.load.audio("confirmation", "confirmation_002.ogg");
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
            frames: [{ frame: "tile_0002.png" }],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "platformer_characters",
            frames: [{ frame: "tile_0003.png" }],
        });

        this.scene.start("platformerScene");
    }
}
