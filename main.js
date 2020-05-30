sprites = "floor0,image/tileset/floor1.png,16,16,0,0,idle,,0;0;16;16;wall\n"+
          "floor1,image/tileset/floor1.png,16,16,16,0,idle,,0;0;16;16;wall\n"+
          "floor2,image/tileset/floor1.png,16,16,32,0,idle,,0;0;16;16;wall\n"+
          "floor3,image/tileset/floor1.png,16,16,0,16,idle,,0;0;16;16;wall\n"+
          "floor4,image/tileset/floor1.png,16,16,16,16,idle,,0;0;0;0;floor\n"+
          "floor5,image/tileset/floor1.png,16,16,32,16,idle,,0;0;16;16;wall\n"+
          "floor6,image/tileset/floor1.png,16,16,0,32,idle,,0;0;16;16;wall\n"+
          "floor7,image/tileset/floor1.png,16,16,16,32,idle,,0;0;16;16;wall\n"+
          "floor8,image/tileset/floor1.png,16,16,32,32,idle,,0;0;16;16;wall\n"+

          "floor9,image/tileset/floor1.png,16,16,0,48,idle,,0;0;16;16;wall\n"+
          "floor10,image/tileset/floor1.png,16,16,16,48,idle,,0;0;16;16;wall\n"+
          "floor11,image/tileset/floor1.png,16,16,0,64,idle,,0;0;16;16;wall\n"+
          "floor12,image/tileset/floor1.png,16,16,16,64,idle,,0;0;16;16;wall";

mytiles = "floor0,0,0,1\n"+
          "floor1,16,0,1\n"+
          "floor1,32,0,1\n"+
          "floor1,48,0,1\n"+
          "floor1,64,0,1\n"+
          "floor2,80,0,1\n"+
          "floor3,0,16,1\n"+
          "floor4,16,16,1\n"+
          "floor4,32,16,1\n"+
          "floor4,48,16,1\n"+
          "floor4,64,16,1\n"+
          "floor5,80,16,1\n"+
          "floor6,0,32,1\n"+
          "floor7,16,32,1\n"+
          "floor7,32,32,1\n"+
          "floor7,48,32,1\n"+
          "floor7,64,32,1\n"+
          "floor8,80,32,1";

$(document).ready(function(){
  var mycanvas = $("#table")[0];
  engine = new Engine(1000/60, mycanvas);

  var control = new Control();
  var display = new Display(mycanvas, 32, "black");

  var initialization = true;
  engine.system = function(self){
    // main code to execute when the engine start
    if(initialization) { // execute just once
      initialization = false;

      self.display.toggleFilter();

      mymap = new SpriteMap();
      mymap.fillMap(mytiles, sprites);
      self.display.drawMap(mymap);
      self.display.camera.velocity = 0.1;

      cat1 = new Sprite("image/sprite/cat1.png",16,16);
      cat1.setAnimation("idleL",[[0,16]],1,"idleL");
      cat1.setAnimation("moveR",[[16,0],[32,0],[48,0]],7);
      cat1.setAnimation("moveL",[[16,16],[32,16],[48,16]],7,"idleL");

      cat1_player = new Interactive(cat1,16,16,0.2,"cat_player","player",[5,11,11,13]);
      engine.display.camera.setTarget(cat1_player);
      engine.display.drawInterative(cat1_player,16,16,1);

      cat1_player.display = self.display;

      cat1_player.setCollideRule('collideWall',function(self, obj){
        self.cancelMove = true;
      },{'name':[],'type':['wall']});

      // hud = new Sprite("image/sprite/cat1.png",64,16,0,0,true);
      // engine.display.drawMe(hud,0,0,2);
      // myhud = new Interactive(hud,0,0,0,'hud','hud',[0,0,0,0]);
      // engine.display.drawInterative(myhud,2);
      // cat1_player.chain(myhud,-142,67);
    }

    // camera testing
    if(!self.control.keysPressed.includes(37) && !self.control.keysPressed.includes(38) &&
       !self.control.keysPressed.includes(39) && !self.control.keysPressed.includes(40)) {
      // smooth player position when he stops
      cat1_player.moveTo(Math.ceil(cat1_player.posX),Math.ceil(cat1_player.posY));
      // stop move animation
      if(cat1_player.lastMove[0] > 0)
        cat1_player.sprite.animationStatus = "idle";
      else
        cat1_player.sprite.animationStatus = "idleL";
    }
    for(var key in self.control.keysPressed) {
      switch(self.control.keysPressed[key]) {
        case 38: // up
          if(cat1_player.lastMove[0] > 0)
            cat1_player.moveUp(cat1_player.velocity, "moveR");
          else
            cat1_player.moveUp(cat1_player.velocity, "moveL");
          break;
        case 40: // down
          if(cat1_player.lastMove[0] > 0)
            cat1_player.moveDown(cat1_player.velocity, "moveR");
          else
            cat1_player.moveDown(cat1_player.velocity, "moveL");
          break;
        case 37: // left
         cat1_player.moveLeft(cat1_player.velocity, "moveL");
          break;
        case 39: // right
         cat1_player.moveRight(cat1_player.velocity, "moveR");
          break;
        case 67:
          if(!self.control.keyHolder.includes(67)) {
            self.display.toggleDrawCollision();
            self.control.keyHolder.push(67);
          }
          break;
        case 27: // stop process on 'ESC'
          self.stop();
          break;
        default:
          // console.log(engine.control.keysPressed[key]);
      }
    }
  }

  // start engine
  engine.start(display, control);
});