function loadResources() {
  gate   = new Tilemap("image/tileset/gate1.png",16,3,2);
  signal = new Tilemap("image/sprite/signal1.png",16,2,2);
}



function level1(self) {
  // gate1 208 160
  // gate2 272 160
  // lever1 208 64
  // lever2 272 64

  var gate1_sprite = gate.tile(0);
  gate1_sprite.setAnimation("idleO",[[32,0]],1,"idleO");
  gate1_sprite.setAnimation("open",[[0,0],[16,0],[32,0]],10,"idleO");
  gate1_sprite.setAnimation("close",[[32,0],[16,0],[0,0]],10);
  gate1 = new Interactive(gate1_sprite,208,160,0,"gate1","wall",[0,6,16,10]);

  var gate2_sprite = gate.tile(0);
  gate2_sprite.setAnimation("idleO",[[32,0]],1,"idleO");
  gate2_sprite.setAnimation("open",[[0,0],[16,0],[32,0]],10,"idleO");
  gate2_sprite.setAnimation("close",[[32,0],[16,0],[0,0]],10);
  gate2 = new Interactive(gate2_sprite,272,160,0,"gate2","wall",[0,6,16,10]);

  self.display.drawInterative(gate1,208,160,3);
  self.display.drawInterative(gate2,272,160,3);


  var lever1_sprite = signal.tile(2);
  lever1_sprite.setAnimation("active",[[16,16]],1,"active");
  var lever1 = new Interactive(lever1_sprite,208,64,0,'lever1','lever',[3,5,13,11]);

  var lever2_sprite = signal.tile(2);
  lever2_sprite.setAnimation("active",[[16,16]],1,"active");
  var lever2 = new Interactive(lever2_sprite,272,64,0,'lever2','lever',[3,5,13,11]);


  self.display.drawInterative(lever1);
  self.display.drawInterative(lever2);
}

function level2(self) {
  // gate3 80, 352
  // gate4 160, 400
  // plate1 64, 384
  // plate2 160, 316

  var gate3_sprite = gate.tile(0);
  gate3_sprite.setAnimation("idleO",[[32,0]],1,"idleO");
  gate3_sprite.setAnimation("open",[[0,0],[16,0],[32,0]],10,"idleO");
  gate3_sprite.setAnimation("close",[[32,0],[16,0],[0,0]],10);
  gate3 = new Interactive(gate3_sprite,80,352,0,"gate3","wall",[0,6,16,10]);

  var gate4_sprite = gate.tile(0);
  gate4_sprite.setAnimation("idleO",[[32,0]],1,"idleO");
  gate4_sprite.setAnimation("open",[[0,0],[16,0],[32,0]],10,"idleO");
  gate4_sprite.setAnimation("close",[[32,0],[16,0],[0,0]],10);
  gate4 = new Interactive(gate4_sprite,160,400,0,"gate4","wall",[0,6,16,10]);

  self.display.drawInterative(gate3,80,352,3);
  self.display.drawInterative(gate4,160,400,3);


  var plate1_sprite = signal.tile(0);
  plate1_sprite.setAnimation("pressed",[[16,0]],5,"idle");
  var plate1 = new Interactive(plate1_sprite,64,384,0,'plate1','plate',[2,3,14,13]);
  
  var plate2_sprite = signal.tile(0);
  plate2_sprite.setAnimation("pressed",[[16,0]],5,"idle");
  var plate2 = new Interactive(plate2_sprite,160,316,0,'plate2','plate',[2,3,14,13]);


  self.display.drawInterative(plate1);
  plate1.display = self.display;
  self.display.drawInterative(plate2);
  plate2.display = self.display;

  plate1.setCollideRule('plateStep',function(self, obj){
    var aux = signal.tile(0);
    aux.setAnimation("pressed",[[16,0]],5,"idle");
    aux.animationStatus = "pressed";
    self.sprite = aux;
  },{'name':[],'type':['player']});

  plate2.setCollideRule('plateStep',function(self, obj){
    var aux = signal.tile(0);
    aux.setAnimation("pressed",[[16,0]],5,"idle");
    aux.animationStatus = "pressed";
    self.sprite = aux;
  },{'name':[],'type':['player']});

  gate3.checkFor(function(self){
    if(plate2.sprite.animationStatus == "pressed") {
      if(!['open','idleO'].includes(self.sprite.animationStatus)) {
        toggleGate(gate3, true);
      }
    }
    else {
      if(!['close','idle'].includes(self.sprite.animationStatus)) {
        toggleGate(gate3, false);
      }
    }
  });

  gate4.checkFor(function(self){
    if(plate1.sprite.animationStatus == "pressed") {
      if(!['open','idleO'].includes(self.sprite.animationStatus)) {
        toggleGate(gate4, true);
      }
    }
    else {
      if(!['close','idle'].includes(self.sprite.animationStatus)) {
        toggleGate(gate4, false);
      }
    }
  });
}



$(document).ready(function(){
  var mycanvas = $("#table")[0];
  engine = new Engine(1000/60, mycanvas);

  var control = new Control();
  var display = new Display(mycanvas, 24, "black");

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


      // CAT 1
      cat1 = new Sprite("image/sprite/cat1.png",16,16);
      cat1.setAnimation("idleL",[[0,16]],1,"idleL");
      cat1.setAnimation("moveR",[[16,0],[32,0],[48,0]],7);
      cat1.setAnimation("moveL",[[16,16],[32,16],[48,16]],7,"idleL");
      cat1.setAnimation("idleS",[[0,48],[16,48],[32,48]],30,"idleS");
      cat1.setAnimation("sleep",[[0,32],[16,32],[32,32],[48,32]],12,"idleS");

      cat1_player = new Interactive(cat1,16,16,0.25,"cat1","player",[6,12,10,13]);
      engine.display.drawInterative(cat1_player,16,16,3);

      cat1_player.display = self.display;

      cat1_player.setCollideRule('collideWall',function(self, obj){
        self.cancelMove = true;
      },{'name':[],'type':['wall']});


      // CAT 2
      cat2 = new Sprite("image/sprite/cat2.png",16,16);
      cat2.setAnimation("idleL",[[0,16]],1,"idleL");
      cat2.setAnimation("moveR",[[16,0],[32,0],[48,0]],7);
      cat2.setAnimation("moveL",[[16,16],[32,16],[48,16]],7,"idleL");
      cat2.setAnimation("idleS",[[0,48],[16,48],[32,48]],30,"idleS");
      cat2.setAnimation("sleep",[[0,32],[16,32],[32,32],[48,32]],12,"idleS");

      cat2_player = new Interactive(cat2,480,16,0.25,"cat2","player",[6,12,10,13]);
      engine.display.drawInterative(cat2_player,464,16,3);

      cat2_player.display = self.display;

      cat2_player.setCollideRule('collideWall',function(self, obj){
        self.cancelMove = true;
      },{'name':[],'type':['wall']});

      loadResources();

      level1(self);
      level2(self);

      // LEVERS RULE
      cat1_player.setCollideRule('leverChange',function(self, obj){
        if(PLAYER == self) {
          if(engine.control.keysPressed.includes(32) && !engine.control.keyHolder.includes(32)) {
            engine.control.keyHolder.push(32);
            if(obj.sprite.animationStatus != "active") {
              obj.sprite.animationStatus = "active";
              toggleGate(gate2, true);
            }
            else {
              obj.sprite.animationStatus = "idle";
              toggleGate(gate2, false);
            }
          }
        }
      },{'name':[],'type':['lever']});

      cat2_player.setCollideRule('leverChange',function(self, obj){
        if(PLAYER == self) {
          if(engine.control.keysPressed.includes(32) && !engine.control.keyHolder.includes(32)) {
            engine.control.keyHolder.push(32);
            if(obj.sprite.animationStatus != "active") {
              obj.sprite.animationStatus = "active";
              toggleGate(gate1, true);
            }
            else {
              obj.sprite.animationStatus = "idle";
              toggleGate(gate1, false);
            }
          }
        }
      },{'name':[],'type':['lever']});


      filter = new Sprite("image/sprite/filter1.png",240,120,0,0,true);
      engine.display.drawMe(filter,0,0,3);
      filter = new Sprite("image/sprite/filter2.png",240,120,0,0,true);
      engine.display.drawMe(filter,0,0,5);
      // CHAIN EXAMPLE
      // myhud = new Interactive(hud,0,0,0,'hud','hud',[0,0,0,0]);
      // engine.display.drawInterative(myhud,2);
      // cat1_player.chain(myhud,-142,67);
    
      PLAYER = cat1_player;
      engine.display.camera.setTarget(PLAYER);
    }

    // camera testing
    if(!self.control.keysPressed.includes(37) && !self.control.keysPressed.includes(38) &&
       !self.control.keysPressed.includes(39) && !self.control.keysPressed.includes(40)) {
      // smooth player position when he stops
      PLAYER.moveTo(Math.ceil(PLAYER.posX),Math.ceil(PLAYER.posY));
      // stop move animation
      if(PLAYER.lastMove[0] > 0)
        PLAYER.sprite.animationStatus = "idle";
      else
        PLAYER.sprite.animationStatus = "idleL";
    }
    for(var key in self.control.keysPressed) {
      switch(self.control.keysPressed[key]) {
        case 38: // up
          if(PLAYER.lastMove[0] > 0)
            PLAYER.moveUp(PLAYER.velocity, "moveR");
          else
            PLAYER.moveUp(PLAYER.velocity, "moveL");
          break;
        case 40: // down
          if(PLAYER.lastMove[0] > 0)
            PLAYER.moveDown(PLAYER.velocity, "moveR");
          else
            PLAYER.moveDown(PLAYER.velocity, "moveL");
          break;
        case 37: // left
         PLAYER.moveLeft(PLAYER.velocity, "moveL");
          break;
        case 39: // right
         PLAYER.moveRight(PLAYER.velocity, "moveR");
          break;
        case 67: // C
          if(!self.control.keyHolder.includes(67)) {
            self.display.toggleDrawCollision();
            self.control.keyHolder.push(67);
          }
          break;
        case 90: // Z
          if(!self.control.keyHolder.includes(90)) {
            PLAYER.sprite.animationStatus = "sleep";
            if(PLAYER.name == "cat1") {
              PLAYER = cat2_player;
            }
            else {
              PLAYER = cat1_player;
            }
            PLAYER.sprite.animationStatus = "idleS";
            
            engine.display.setBright(0,180);
            setTimeout(function(){
              engine.display.setBright(100,60);
              engine.display.camera.setTarget(PLAYER);
              PLAYER.sprite.animationStatus = "idle";
            },1000);
            self.control.keyHolder.push(90);
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