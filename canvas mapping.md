## TileMap

- game

```js
import TileMap from "./TileMap.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const tileSize = 32;

const tileMap = new TileMap(tileSize);

function gameLoop() {
    tileMap.draw(canvas, ctx);
}

setInterval(gameLoop, 1000 / 60)
```

- TileMap

```js
export default class TileMap {
    constructor(tileSize) {
        this.tileSize = tileSize
        this.wall = this.image("wall.png");
        this.pacman = this.image("pacman.png");
        this.dot = this.image("dot.png");
        this.ghost = this.image("ghost.png");
    }
    image(fileName) {
    	const img = new Image();
		img.src = `images/${fileName}`;
		return img;
	}
    // 1 - wall
    // 0 - dots
    // 2 - pacman
    // 3 - ememies
    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
        [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
        [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
        [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
        [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
        [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
        [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
        [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
        [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]
    
    draw(canvas, ctx) {
        this.setCanvasSize(canvas);
        this.clearCanvas(canvas, ctx);
        this.drawMap(ctx);
    }

	setCanvasSize(canvas) {
        canvas.height = this.map.length * this.tileSize;
        canvas.width = this.map[0].length * this.tileSize;
    }

	clearCanvas(canvas, ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

	drawMap(ctx) {
        for(let row = 0; row< this.map.length; row++) {
            for(let column = 0; column < this.map[row].length; column++) {
                const tile = this.map[row][column];
                let image = null;
                switch (tile) {
                    case 1:
                        image = this.wall;
                        break;
                }
                if (image != null) {
                    ctx.drawImage(image, column * this.tileSize)
                }
            }
        }
    }
}
```



## Player Creation

### sprite sheet

![image-20220704091219328](C:\Users\edgar\AppData\Roaming\Typora\typora-user-images\image-20220704091219328.png)

시간이 지남에 따라서 하나의 이미지의 일부분을 순차적으로 보여주는 방식 하지만 위의 경우에는 image section을 사용할때 좌우에서 상하로 방향을 움직여주어야 하므로 좌우로 나란한 이미지를 사용한다.

![image-20220704091633535](C:\Users\edgar\AppData\Roaming\Typora\typora-user-images\image-20220704091633535.png)

```js
// map
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect = (0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = './img/...'

// player
const playerImage = new Image()
playerImage.src = './img/playerRight.png'

image.onload = () => {
    c.drawImage(image, -785, -650)
    c.drawImage(
        playerImage,
        
        // cropping
        0, // x-coordinate in which we bigin cropping from
        0, // y-coordinate to start cropping from the top
        playerImage.width / 4, // crop width
        playerImage.height, // crop height
        
        // actual. coordinates the actual width and height 
        canvas.width / 2 - playerImage.width / 4 / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height,
    )
}

// rendering one of them
// add cropping to c.draw image
```

- section 나누기

  - `c.draw` 내부에 cropping 요소(4개)들 추가준다.

    - x-coordinate

      ![image-20220704095209077](C:\Users\edgar\AppData\Roaming\Typora\typora-user-images\image-20220704095209077.png)

    - y-coordinate

      ![image-20220704095223152](C:\Users\edgar\AppData\Roaming\Typora\typora-user-images\image-20220704095223152.png)

    - crop width

      ![image-20220704095307094](C:\Users\edgar\AppData\Roaming\Typora\typora-user-images\image-20220704095307094.png)

    - crop height

      ![image-20220704095359959](C:\Users\edgar\AppData\Roaming\Typora\typora-user-images\image-20220704095359959.png)

## Move Player

### listening event

```js
function animate() { // add animation loop
	window.requestAnimationFrame(animate) //
    c.drawImage(image, -785, -650)
    c.drawImage(
    	playerImage,
        // cropping
        ...
        //actual
        ...
    )
}
animate();

window.addEventListener("keydown", (e) => { // e: pre-populated object(it stands for event)
    switch (e.key) {
        case 'w':
            console.log('pressed w key')
            break
        case 'a':
            console.log('pressed a key')
            break
        case 's':
            console.log('pressed s key')
            break
        case 'd':
            console.log('pressed d key')
            break
    }
})
```

- `window.requestAnimationFrame()`

  this takes one argument and it's going to be the function that you want to call recursively what function do we want to loop through over and over again to begin editing our object properties

  ![image-20220704101134547](C:\Users\edgar\AppData\Roaming\Typora\typora-user-images\image-20220704101134547.png)

- animate가 재실행 될 때마다 이미지를 렌더링

  ```js
  function animate() { // add animation loop
  	window.requestAnimationFrame(animate) //
      c.drawImage(image, -785, -650)
      c.drawImage(
      	playerImage,
          // cropping
          ...
          //actual
          ...
      )
  }
  animate()
  ```

- `keydown` 이벤트 발생할 때 마다 변경된 위치로 이미지를 렌더링

  ```js
  class Sprite {
      constructor({ position, velocity, image }) {
          this.position = position
      	this.image = image
      }
  	draw() {
          c.drawImage(this.image, this.position.x, this.position.y)
      }
  }
  
  const background = new Sprite({position: {
      	x: -785, y: -650
  	},
      image: image
  })
  
  const keys = {
  	w: {
          pressed: false
      },
      a: {
          pressed: false
      },
      s: {
          pressed: false
      },
      d: {
          pressed: false
      },
  }
  
  function animate() { // add animation loop
  	window.requestAnimationFrame(animate) //
      // c.drawImage(image, -785, -650)
      background.draw()
      c.drawImage(
      	playerImage,
          // cropping
          ...
          //actual
          ...
      )
          
      if (keys.w.pressed && lastKey === 'w') background.position.y += 3
      else if (keys.a.pressed && lastKey === 'a') background.position.x += 3
      else if (keys.s.pressed && lastKey === 's') background.position.y -= 3
      else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3
  }
  animate()
  
  let lastKey = ''
  
  window.addEventListener("keydown", (e) => { // e: pre-populated object(it stands for event)
      switch (e.key) {
          case 'w':
              keys.w.pressed = true
              lastKey = 'w'
              break
          case 'a':
              keys.a.pressed = true
              lastKey = 'a'
              break
          case 's':
              keys.s.pressed = true
              lastKey = 's'
              break
          case 'd':
              keys.d.pressed = true
              lastKey = 'd'
              break
      }
  })
  
  window.addEventListener("keyup", (e) => { // e: pre-populated object(it stands for event)
      switch (e.key) {
          case 'w':
              keys.w.pressed = false
              break
          case 'a':
              keys.a.pressed = false
              break
          case 's':
              keys.s.pressed = false
              break
          case 'd':
              keys.d.pressed = false
              break
      }
  })
  ```

## collision

```js
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }
    draw() {
        c.fillStyle = 'red'
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        boundaries.push(new Boundary({position: {
            x: j * 48,
            y: i * 48
        }}))
    })
})
```

## copycat example

```js
class Scene {
    constructor(name) {
        this.name = name;
        this.loop = true;
        this.init_once = false;
    }
    giveWorld(world) {
        this.world = world;
        this.ctx = world.ctx;
    }
    keyEvents(event) {}
    init() {}
    render() {}
    addEntity() {}
}

addScene(scene) {
    scene.giveWorld(this);
    this.scenes[scene.name] = scene;
}
```

