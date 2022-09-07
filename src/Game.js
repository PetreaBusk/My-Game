import * as PIXI from 'pixi.js';
import Stage from './Stage';
import { gsap } from 'gsap';
import Howl from 'howler';
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




//         let myBoxPosX = [100,400,600]

//         for (let i=0; i<3;i++){

//           let box = PIXI.Texture.from(myBoxArrey[i]);
//           let _box = new PIXI.Sprite(box);
//           _box.x=myBoxPosX[i];
//           _box.y=450
//           _box.zIndex=1;
//           this.scene.addChild(_box);
//         }
       
// // let test = PIXI.Texture.from("./assets/images/background.jpg");
// // let testi = new PIXI.Sprite(testi);
// // this.scene.addChild(testi)


// let test = PIXI.Texture.from("./assets/images/background_night.jpg")
// let testi = new PIXI.Sprite(test);
// testi.zIndex=2;
// testi.anchor.set(0.5);
// testi.x=512;
// testi.y=385;
// this.scene.addChild(testi);




// this.si.app.stage.on("pointerdown",(event) =>{
// console.log("pop")
// this.ninja.stop();
// this.ninja.texture= PIXI.Texture.from("../assets/images/ninja-jump.png")
// });

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


        //    let sound = new Howl({
        //       src:['./assets/sound/musicloop.mp3'],
        //       autoplay: true,
        //       loop: true,

           });

        });
      }); //END Loader
  } //constuctor
} //class

export default Game;
