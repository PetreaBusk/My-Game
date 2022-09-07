import * as PIXI from 'pixi.js';
import Stage from './Stage';
import { gsap } from 'gsap';
import { Howl } from 'howler';
import Enemy from "./Enemy";


class Game {
  constructor() {

    this.enemy;


    this.myStage = new Stage();
    this.scene = this.myStage.scene;
    this.scene.sortableChildren = true;
    this.background = this.myStage.bg;
    this.si = this.myStage.stageInfo;

   

    let assets = [
      '../assets/spritesheet/ninjarack.json',
      './assets/images/background.jpg',
      '../assets/images/ninja-jump.png',
      '../assets/images/play.png',
    ];

    const loader = PIXI.Loader.shared
      .add(assets)
      .add('alienspine', '../assets/spritesheet/alien-spine/alienboss.json')
      .load((loader, res) => {
        

        let bgTexture = PIXI.Texture.from('./assets/images/background.jpg');
        let _bg = new PIXI.Sprite(bgTexture);
        this.background.addChild(_bg);

        let sheet =
          PIXI.Loader.shared.resources['../assets/spritesheet/ninjarack.json']
            .spritesheet;

        this.ninja = new PIXI.AnimatedSprite(sheet.animations['alien']);
        this.ninja.anchor.set(0.6);
        this.ninja.x = 512;
        this.ninja.y = 768 - 150;

        this.ninja.interactive = true;
        this.ninja.buttonMode = true;
        this.ninja.zIndex = 2;
        this.ninja.animationSpeed = 0.6;

        this.ninja.play();
        this.scene.addChild(this.ninja);




        let myBoxArray = [
          './assets/images/left_box.png',
          './assets/images/middle_box.png',
          './assets/images/right_box.png'
        ];
        let myBoxPosX = [75,400,700]

        for (let i=0; i<3;i++){

          let box = PIXI.Texture.from(myBoxArray[i]);
          let _box = new PIXI.Sprite(box);
          _box.x=myBoxPosX[i];
          _box.y=450
          _box.zIndex=1;
          this.scene.addChild(_box);
        }
       




this.si.app.stage.on("pointerdown",(event) =>{
console.log("pop")
this.ninja.stop();
this.ninja.texture= PIXI.Texture.from("../assets/images/ninja-jump.png")
});

        this.si.app.stage.interactive = true;

        this.si.app.stage.on('pointerdown', (event) => {
        

          this.ninja.stop(); // stop ninja animation
          this.ninja.texture = PIXI.Texture.from(
            '../assets/images/ninja-jump.png'
          ); //skift texture til jump;

          let newPosition = event.data.getLocalPosition(this.background);

        

          gsap.to(this.ninja, {
            duration: 0.3,
            x: newPosition.x - 300,
            y: newPosition.y,
            ease: 'wiggle.easeOut',
            onComplete: () => {
              gsap.to(this.ninja, {
                //så ninja hopper tilbage
                duration: 0.3,
                x: 512,
                y: 768 - 150,
                ease: 'wiggle.easeOut',
              });

              this.ninja.play();
            }, //END: onComplete
          });

          let mX = event.data.global.x;
          // console.log(mX)

          mX > this.si.appWidth / 2
            ? (this.ninja.scale.x = -1)
            : (this.ninja.scale.x = 1);

          this.hitSound = new Howl({
            src: ['./assets/sound/effekt_swish.mp3'], // lyd efkter
            volume: 0.5,
          });
          this.hitSound.play();



        }); // END eventlistener





        let playTexture = PIXI.Texture.from('./assets/images/play.png'); // billede med PLAY
        let play = new PIXI.Sprite(playTexture);
        play.anchor.set(0.5);
        play.x = 512;
        play.y = 250;
        play.interactive = true;
        play.buttonMode = true;
        this.scene.addChild(play);

        

 let sunTexture = PIXI.Texture.from('./assets/images/sun.png'); // Roterende sol
        this.sun = new PIXI.Sprite(sunTexture);
        this.sun.interactive = true;
        this.sun.anchor.set(0.5);
        this.sun.x = 0;
        this.sun.y = -100;
        this.scene.addChild(this.sun);

        // Rotationen
        gsap.to(this.sun, {
          duration: 18 * 100, // 18 sekunder
          rotation: 360,
          repeat: -1,
        });

// Sol ned
        gsap.to(this.sun, {
          duration: 2, // 2 sekunder
          x: 150,
          y: 150,
          ease: 'Elastic.easeInOut'
        });
        
      // Sol op  
        gsap.to(this.sun, {
          duration: 2, // 2 sekunder
          delay: 4, // Ventetid før animation skal køre
          x: 300,
          y: -100,
          ease: 'Elastic.easeInOut'
        });

        setTimeout(() => {
          let test2 = PIXI.Texture.from("./assets/images/background_night.jpg")
          let testi2 = new PIXI.Sprite(test2);
          testi2.zIndex=2;
          this.background.addChild(testi2);
        },5.5 * 1000);


        let moonTexture = PIXI.Texture.from('./assets/images/moon.png'); // Roterende Måne
        this.moon = new PIXI.Sprite(moonTexture);
        this.moon.interactive = true;
        this.moon.anchor.set(0.5);
        this.moon.x = 0;
        this.moon.y = -100;
        this.scene.addChild(this.moon);

        // // Rotationen
        // gsap.to(this.moon, {
        //   duration: 18 * 100, // 18 sekunder
        //   rotation: 360,
        //   repeat: -1,
        // });

// Måne ned
        gsap.to(this.moon, {
          duration: 2, // 2 sekunder
          delay:6,
          x: 150,
          y: 150,
          ease: 'Elastic.easeInOut'
        });
        
      // Måne op  
        gsap.to(this.moon, {
          duration: 4, // 2 sekunder
          delay: 10, // Ventetid før animation skal køre
          x: 300,
          y: -100,
          ease: 'Elastic.easeInOut'
        });






        play.on('pointerdown', (event) => {

          event.stopPropagation();
          this.si.app.stage.interactive = true;

            

          gsap.to(event.currentTarget, {
            duration: 0.9,
            delay: 0.2,
            y: play.y - 350,
            ease: 'Elastic.easeInOut', //easeInOut såger for at den starter og slutter
          });







          let soundSwirp = new Howl({
            src: ['./assets/sound/effekt_swish.mp3'],
            volume: 0.2,
          });


          let timerid = setTimeout(() => { // => callback function
            soundSwirp.play();
            }, 500)

            this.enemy = new Enemy({
                name:res.alienspine,

              });

           this.howl = new Howl({
              src:['./assets/sound/musicloop.mp3'],
              autoplay: true,
              loop: true,

           })
           this.howl.play();

        });
      }); //END Loader
  } //constuctor
} //class

export default Game;
