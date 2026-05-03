const WIDTH = 640;
const HEIGHT = 360;

class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("ocean", "assets/bg/ocean.png");
  }

  create() {
    this.scene.start("SplashScene");
  }
}

class SplashScene extends Phaser.Scene {
  constructor() {
    super("SplashScene");
  }

  create() {
    const bg = this.add.tileSprite(0, 0, WIDTH, HEIGHT, "ocean")
      .setOrigin(0, 0)
      .setTint(0x6e4dff);

    this.add.rectangle(
      WIDTH/2,
      HEIGHT/2,
      WIDTH,
      HEIGHT,
      0x000000,
      0.45
    );

    const title = this.add.text(
      WIDTH/2,
      150,
      "Para May 💜",
      {
        fontSize: "40px",
        fontStyle: "bold",
        color: "#ffffff"
      }
    ).setOrigin(0.5).setAlpha(0);

    const sub = this.add.text(
      WIDTH/2,
      210,
      "feito com carinho por Lucas",
      {
        fontSize: "20px",
        color: "#dca8ff"
      }
    ).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: [title, sub],
      alpha: 1,
      duration: 1200
    });

    this.time.addEvent({
      delay: 2600,
      callback: () => {
        this.scene.start("MenuScene");
      }
    });

    this.time.addEvent({
      delay: 700,
      loop: true,
      callback: () => {
        const bubble = this.add.circle(
          Phaser.Math.Between(30, WIDTH-30),
          HEIGHT+10,
          Phaser.Math.Between(3,7),
          0xffffff,
          0.35
        );

        this.tweens.add({
          targets: bubble,
          y: -20,
          alpha: 0,
          duration: Phaser.Math.Between(2500,4200),
          onComplete: () => bubble.destroy()
        });
      }
    });

    this.bg = bg;
  }

  update() {
    this.bg.tilePositionX += 0.35;
  }
}

class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {
    this.load.image("ocean", "assets/bg/ocean.png");
  }

  create() {
    const bg = this.add.tileSprite(0,0,WIDTH,HEIGHT,"ocean")
      .setOrigin(0,0)
      .setTint(0x7a5cff);

    this.add.rectangle(
      WIDTH/2,
      HEIGHT/2,
      WIDTH,
      HEIGHT,
      0x000000,
      0.35
    );

    this.add.text(WIDTH/2, 82, "MAY", {
      fontSize: "46px",
      fontStyle: "bold",
      color: "#dca8ff",
      stroke: "#ffffff",
      strokeThickness: 4
    }).setOrigin(0.5);

    this.add.text(WIDTH/2, 130, "e o Mar dos Doces", {
      fontSize: "24px",
      color: "#ffffff"
    }).setOrigin(0.5);

    const playBtn = this.add.rectangle(
      WIDTH/2,
      220,
      210,
      58,
      0x38bfff
    ).setInteractive();

    this.add.text(WIDTH/2, 220, "JOGAR", {
      fontSize: "28px",
      fontStyle: "bold",
      color: "#fff"
    }).setOrigin(0.5);

    const creditsBtn = this.add.rectangle(
      WIDTH/2,
      295,
      210,
      52,
      0x6b7dff
    ).setInteractive();

    this.add.text(WIDTH/2, 295, "CRÉDITOS", {
      fontSize: "22px",
      fontStyle: "bold",
      color: "#fff"
    }).setOrigin(0.5);

    playBtn.on("pointerdown", () => {
      this.scene.start("GameScene");
    });

    creditsBtn.on("pointerdown", () => {
      this.scene.start("CreditsScene");
    });

    this.time.addEvent({
      delay: 700,
      loop: true,
      callback: () => {
        const bubble = this.add.circle(
          Phaser.Math.Between(30, WIDTH-30),
          HEIGHT+10,
          Phaser.Math.Between(3,7),
          0xffffff,
          0.35
        );

        this.tweens.add({
          targets: bubble,
          y: -20,
          alpha: 0,
          duration: Phaser.Math.Between(2500,4200),
          onComplete: () => bubble.destroy()
        });
      }
    });

    this.bg = bg;
  }

  update() {
    this.bg.tilePositionX += 0.4;
  }
}

class CreditsScene extends Phaser.Scene {
  constructor() {
    super("CreditsScene");
  }

  create() {
    this.add.rectangle(
      WIDTH/2,
      HEIGHT/2,
      WIDTH,
      HEIGHT,
      0x081826
    );

    this.add.text(WIDTH/2, 110, "CRÉDITOS", {
      fontSize: "34px",
      fontStyle: "bold",
      color: "#fff"
    }).setOrigin(0.5);

    this.add.text(WIDTH/2, 180, "Feito por Lucas 💜", {
      fontSize: "28px",
      color: "#dca8ff"
    }).setOrigin(0.5);

    const back = this.add.rectangle(
      WIDTH/2,
      285,
      180,
      50,
      0x38bfff
    ).setInteractive();

    this.add.text(WIDTH/2, 285, "VOLTAR", {
      fontSize: "22px",
      fontStyle: "bold",
      color: "#fff"
    }).setOrigin(0.5);

    back.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });
  }
}
class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("ocean", "assets/bg/ocean.png");

    this.load.image("idle", "assets/may/idle.png");
    this.load.image("up", "assets/may/swim_up.png");
    this.load.image("down", "assets/may/swim_down.png");
    this.load.image("turbo", "assets/may/turbo.png");
    this.load.image("shield", "assets/may/shield.png");
    this.load.image("magnet", "assets/may/magnet.png");

    this.load.image("lucas", "assets/lucas/idle.png");

    this.load.image("prestigio", "assets/items/prestigio.png");
    this.load.image("ferrero", "assets/items/ferrero.png");
    this.load.image("shield_power", "assets/items/shield_power.png");
    this.load.image("turbo_power", "assets/items/turbo_power.png");
    this.load.image("magnet_power", "assets/items/magnet_power.png");
    this.load.image("heart", "assets/items/heart.png");

    this.load.image("jellyfish", "assets/obstacles/jellyfish.png");
    this.load.image("coral", "assets/obstacles/coral.png");
    this.load.image("rock", "assets/obstacles/rock.png");

    this.load.audio("calm", "assets/audio/calm.mp3");
    this.load.audio("epic", "assets/audio/epic.mp3");
    this.load.audio("collect", "assets/audio/collect.wav");
    this.load.audio("collect_big", "assets/audio/collect_big.wav");
    this.load.audio("damage", "assets/audio/damage.wav");
    this.load.audio("power", "assets/audio/power.wav");
    this.load.audio("click", "assets/audio/click.wav");
    this.load.audio("win", "assets/audio/win.wav");
  }

  create() {
    this.score = 0;
    this.lives = 3;
    this.activePower = null;
    this.powerTimer = 0;
    this.invulnerable = false;
    this.winTriggered = false;
    this.moveUp = false;
    this.moveDown = false;
    this.musicChanged = false;

    this.bg = this.add.tileSprite(0, 0, WIDTH, HEIGHT, "ocean").setOrigin(0, 0);

    this.player = this.physics.add.sprite(120, HEIGHT / 2, "idle");
    this.player.setCollideWorldBounds(true);

    this.collectibles = this.physics.add.group();
    this.obstacles = this.physics.add.group();

    this.physics.add.overlap(this.player, this.collectibles, this.collectItem, null, this);
    this.physics.add.overlap(this.player, this.obstacles, this.hitObstacle, null, this);

    this.time.addEvent({
      delay: 1000,
      callback: this.spawnCollectible,
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 1700,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    this.scoreText = this.add.text(20, 20, "Pontos: 0 / 100", {
      fontSize: "22px",
      color: "#fff",
      stroke: "#000",
      strokeThickness: 5
    });

    this.livesText = this.add.text(20, 50, "❤️❤️❤️", {
      fontSize: "22px"
    });

    this.powerText = this.add.text(20, 82, "Poder: nenhum", {
      fontSize: "16px",
      color: "#bffcff"
    });

    this.calmMusic = this.sound.add("calm", { loop: true, volume: 0.45 });
    this.epicMusic = this.sound.add("epic", { loop: true, volume: 0.45 });

    this.sfx = {
      collect: this.sound.add("collect", { volume: 0.8 }),
      collect_big: this.sound.add("collect_big", { volume: 0.9 }),
      damage: this.sound.add("damage", { volume: 0.9 }),
      power: this.sound.add("power", { volume: 0.9 }),
      click: this.sound.add("click", { volume: 0.7 }),
      win: this.sound.add("win", { volume: 1 })
    };

    this.calmMusic.play();

    const pauseBtn = this.add.rectangle(600, 25, 50, 35, 0x245bff).setInteractive();
    this.add.text(600, 25, "II", {
      fontSize: "18px",
      color: "#fff",
      fontStyle: "bold"
    }).setOrigin(0.5);

    pauseBtn.on("pointerdown", () => {
      this.scene.pause();
      alert("Jogo pausado");
      this.scene.resume();
    });

    const upBtn = this.add.rectangle(560, 250, 60, 60, 0x3cc6ff, 0.65).setInteractive();
    this.add.text(548, 237, "⬆", { fontSize: "28px" });

    const downBtn = this.add.rectangle(560, 320, 60, 60, 0x3cc6ff, 0.65).setInteractive();
    this.add.text(548, 307, "⬇", { fontSize: "28px" });

    upBtn.on("pointerdown", () => this.moveUp = true);
    upBtn.on("pointerup", () => this.moveUp = false);
    upBtn.on("pointerout", () => this.moveUp = false);

    downBtn.on("pointerdown", () => this.moveDown = true);
    downBtn.on("pointerup", () => this.moveDown = false);
    downBtn.on("pointerout", () => this.moveDown = false);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  spawnCollectible() {
    let rand = Math.random();
    let key = "prestigio";
    let type = "score";
    let points = 1;

    if (rand < 0.15) {
      key = "ferrero";
      points = 5;
    } else if (rand < 0.22) {
      key = "shield_power";
      type = "shield";
    } else if (rand < 0.29) {
      key = "turbo_power";
      type = "turbo";
    } else if (rand < 0.36) {
      key = "magnet_power";
      type = "magnet";
    }

    const item = this.collectibles.create(
      WIDTH + 50,
      Phaser.Math.Between(50, HEIGHT - 50),
      key
    );

    item.type = type;
    item.points = points;
    item.setVelocityX(-220);
  }

  spawnObstacle() {
    const key = Phaser.Utils.Array.GetRandom(["jellyfish", "coral", "rock"]);

    const obs = this.obstacles.create(
      WIDTH + 50,
      Phaser.Math.Between(50, HEIGHT - 50),
      key
    );

    obs.setVelocityX(-230);
  }

  activatePower(type) {
    this.activePower = type;
    this.powerTimer = 5000;

    if (type === "shield") {
      this.player.setTexture("shield");
      this.powerText.setText("Poder: Escudo 🫧");
    }

    if (type === "turbo") {
      this.player.setTexture("turbo");
      this.powerText.setText("Poder: Turbo 🌈");
    }

    if (type === "magnet") {
      this.player.setTexture("magnet");
      this.powerText.setText("Poder: Ímã ✨");
    }
  }

  collectItem(_, item) {
    if (item.type === "score") {
      if (item.points === 5) this.sfx.collect_big.play();
      else this.sfx.collect.play();

      this.score += item.points;
      this.scoreText.setText(`Pontos: ${this.score} / 100`);
    } else {
      this.sfx.power.play();
      this.activatePower(item.type);
    }

    item.destroy();

    if (this.score >= 70 && !this.musicChanged) {
      this.musicChanged = true;
      this.calmMusic.stop();
      this.epicMusic.play();
    }

    if (this.score >= 100 && !this.winTriggered) {
      this.winScene();
    }
  }

  hitObstacle(_, obstacle) {
    obstacle.destroy();
    this.sfx.damage.play();

    if (this.activePower === "shield") {
      this.activePower = null;
      this.player.setTexture("idle");
      this.powerText.setText("Poder: nenhum");
      return;
    }

    if (this.invulnerable) return;

    this.lives--;
    this.livesText.setText("❤️".repeat(this.lives));
    this.invulnerable = true;

    this.tweens.add({
      targets: this.player,
      alpha: 0.2,
      duration: 120,
      yoyo: true,
      repeat: 10,
      onComplete: () => {
        this.player.alpha = 1;
        this.invulnerable = false;
      }
    });

    if (this.lives <= 0) {
      this.showGameOver();
    }
  }

  showGameOver() {
    this.physics.pause();

    this.add.rectangle(WIDTH/2, HEIGHT/2, WIDTH, HEIGHT, 0x000000, 0.72);

    this.add.text(WIDTH/2, 120, "Não desiste,\ncontinua nadando 💜", {
      fontSize: "28px",
      color: "#fff",
      align: "center",
      stroke: "#000",
      strokeThickness: 5
    }).setOrigin(0.5);

    const retry = this.add.rectangle(WIDTH/2, 255, 260, 60, 0x38bfff).setInteractive();

    this.add.text(WIDTH/2, 255, "JOGAR NOVAMENTE", {
      fontSize: "22px",
      fontStyle: "bold",
      color: "#fff"
    }).setOrigin(0.5);

    retry.on("pointerdown", () => {
      this.scene.restart();
    });
  }

  winScene() {
    this.winTriggered = true;
    this.physics.pause();

    this.calmMusic.stop();
    if (this.epicMusic.isPlaying) this.epicMusic.stop();

    this.sfx.win.play();

    this.add.rectangle(WIDTH/2, HEIGHT/2, WIDTH, HEIGHT, 0x000000, 0.72);

    const heart = this.add.image(WIDTH/2, 95, "heart").setScale(1.2).setAlpha(0);
    const lucas = this.add.image(WIDTH/2, 190, "lucas").setScale(1.5).setAlpha(0);

    const msg = this.add.text(
      WIDTH/2,
      290,
      "Viajando sem desistir,\npassando por cada desafio,\nme apaixono por te amar\ncom a profundidade do mar 💜",
      {
        fontSize: "16px",
        color: "#fff",
        align: "center",
        lineSpacing: 6
      }
    ).setOrigin(0.5).setAlpha(0);

    const again = this.add.rectangle(WIDTH/2, 340, 220, 38, 0x6b7dff)
      .setInteractive()
      .setAlpha(0);

    const againText = this.add.text(WIDTH/2, 340, "JOGAR DE NOVO", {
      fontSize: "16px",
      fontStyle: "bold",
      color: "#fff"
    }).setOrigin(0.5).setAlpha(0);

    again.on("pointerdown", () => {
      this.scene.restart();
    });

    this.tweens.add({
      targets: [heart, lucas, msg, again, againText],
      alpha: 1,
      duration: 1800
    });

    this.tweens.add({
      targets: heart,
      scale: 1.35,
      duration: 650,
      yoyo: true,
      repeat: -1
    });
  }

  update(_, delta) {
    if (this.winTriggered) return;

    this.bg.tilePositionX += this.activePower === "turbo" ? 3.2 : 1.4;

    if (this.activePower === "magnet") {
      this.collectibles.children.each(item => {
        if (item) this.physics.moveToObject(item, this.player, 120);
      });
    }

    if (this.activePower) {
      this.powerTimer -= delta;

      if (this.powerTimer <= 0) {
        this.activePower = null;
        this.player.setTexture("idle");
        this.powerText.setText("Poder: nenhum");
      }
    }

    if (this.cursors.up.isDown || this.moveUp) {
      this.player.setVelocityY(-180);
      if (!this.activePower) this.player.setTexture("up");
    } else if (this.cursors.down.isDown || this.moveDown) {
      this.player.setVelocityY(180);
      if (!this.activePower) this.player.setTexture("down");
    } else {
      this.player.setVelocityY(0);
      if (!this.activePower) this.player.setTexture("idle");
    }

    [...this.collectibles.children.entries, ...this.obstacles.children.entries].forEach(obj => {
      if (obj && obj.x < -100) obj.destroy();
    });
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scene: [
    BootScene,
    SplashScene,
    MenuScene,
    CreditsScene,
    GameScene
  ]
});