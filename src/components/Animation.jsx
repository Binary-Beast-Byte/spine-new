import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Spine } from "@pixi-spine/runtime-3.8";

const PixiSpineAnimation = () => {
  const pixiAppRef = useRef();

  useEffect(() => {
    // Create a new PIXI Application
    const app = new PIXI.Application({ resizeTo: window });



    if (pixiAppRef && pixiAppRef.current) {
      pixiAppRef.current.appendChild(app.view);
    }
    // Load the Spine animation

    let spineLoaderOptions = { metadata: { spineAtlasSuffix: ".txt" } };

    console.log('app', PIXI.Assets)

    if(PIXI && PIXI.loader) {
        console.log('PIXI', PIXI)
    }
    // console.log("first");
    PIXI.Assets.load('https://pixijs.com/assets/spritesheet/monsters.json')
    .then(onAssetsLoaded);

    const aliens = [];
    const alienFrames = [
      'eggHead.png',
      'flowerTop.png',
      'helmlok.png',
      'skully.png',
    ];

    let count = 0;

    // Create an empty container
    const alienContainer = new PIXI.Container();
    alienContainer.x = 400;
    alienContainer.y = 300;

    // Make the stage interactive
    app.stage.eventMode = 'dynamic';
    app.stage.addChild(alienContainer);

    function onAssetsLoaded(loader, resources) {

        console.log('resources loaded', loader)

      // Add a bunch of aliens with textures from image paths
      for (let i = 0; i < 100; i++) {
        const frameName = alienFrames[i % 4];

        console.log('frame Name', frameName)

        // Create an alien using the frame name
        // const alien = new PIXI.Sprite(resources[frameName].texture);
        const alien = PIXI.Sprite.from(frameName);

        console.log('alien', alien)

        alien.tint = Math.random() * 0xffffff;

        alien.x = Math.random() * 800 - 400;
        alien.y = Math.random() * 600 - 300;
        alien.anchor.x = 0.5;
        alien.anchor.y = 0.5;
        aliens.push(alien);
        alienContainer.addChild(alien);
      }
      app.start();
    }

    app.stage.on('pointertap', onClick);

    function onClick() {
      alienContainer.cacheAsBitmap = !alienContainer.cacheAsBitmap;
    }

    app.ticker.add(() => {
        // Let's rotate the aliens a little bit

        for (let i = 0; i < 100; i++) {
          const alien = aliens[i];
            if(alien) {
                alien.rotation += 0.1;
            }
        }
  
        count += 0.01;
  
        alienContainer.scale.x = Math.sin(count);
        alienContainer.scale.y = Math.sin(count);
        alienContainer.rotation += 0.01;
      });

  }, []);

  return <div ref={pixiAppRef}/>;
};

export default PixiSpineAnimation;
