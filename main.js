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

      cat1_player = new Interactive(cat1,16,16,0.25,"cat_player","player",[5,12,11,14]);
      engine.display.camera.setTarget(cat1_player);
      engine.display.drawInterative(cat1_player,16,16,3);

      cat1_player.display = self.display;

      cat1_player.setCollideRule('collideWall',function(self, obj){
        self.cancelMove = true;
      },{'name':[],'type':['wall']});

      // 80,16
      // 96,16
      // var signal1       = new Tilemap("image/sprite/signal1.png",16,2,2);
      // var plate1_sprite = signal1.tile(0);
      // plate1_sprite.setAnimation("pressed",[[16,0]],1);
      // var plate1        = new Interactive(plate1_sprite,64,16,0,'plate1','plate',[2,3,14,13]);
      // engine.display.drawInterative(plate1);
      // plate1.display = self.display;

      // var lever1_sprite = signal1.tile(2);
      // lever1_sprite.setAnimation("active",[[16,16]],1,"active");
      // var lever1        = new Interactive(lever1_sprite,96,16,0,'lever1','lever',[3,5,13,11]);
      // engine.display.drawInterative(lever1);

      // plate1.setCollideRule('plateStep',function(self, obj){
      //   self.sprite.animationStatus = "pressed";
      // },{'name':[],'type':['player']});

      // cat1_player.setCollideRule('leverChange',function(self, obj){
      //   if(engine.control.keysPressed.includes(32) && !engine.control.keyHolder.includes(32)) {
      //     engine.control.keyHolder.push(32);
      //     if(obj.sprite.animationStatus != "active") {
      //       obj.sprite.animationStatus = "active";
      //     }
      //     else {
      //       obj.sprite.animationStatus = "idle";
      //     }
      //   }
      // },{'name':[],'type':['lever']});

      filter = new Sprite("image/sprite/filter1.png",320,160,0,0,true);
      engine.display.drawMe(filter,0,0,4);
      // CHAIN EXAMPLE
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