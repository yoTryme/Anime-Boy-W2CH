class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    preload() {
    }

    create() {
        // Get the Canvas center point
        const canvasCenterX = this.scale.width / 2;
        const canvasCenterY = this.scale.height / 2;

        // Display "Game Over" message
        this.add.text(canvasCenterX, canvasCenterY, "Game Over", {
            fontSize: '64px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.add.text(canvasCenterX, canvasCenterY + 100, "Press T restart", {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-T', () => {
            this.scene.start('platformerScene'); // Switch back to the main game scene
        });
    }
}

