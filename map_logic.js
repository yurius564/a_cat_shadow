function toggleGate(el_gate, force=null) {
  if(force != null) {
    var aux = gate.tile(0);
    aux.setAnimation("idleO",[[32,0]],1,"idleO");
    aux.setAnimation("open",[[0,0],[16,0],[32,0]],10,"idleO");
    aux.setAnimation("close",[[32,0],[16,0],[0,0]],10);
    aux.animationStatus = force? "open":"close";
    el_gate.sprite = aux;
    el_gate.collisionBox = force? [0,0,0,0]: [0,6,16,10];
    return;
  }
  if(el_gate.sprite.animationStatus == "idle" || el_gate.sprite.animationStatus == "close") {
    el_gate.sprite.animationStatus = "open";
    el_gate.collisionBox = [0,0,0,0];
  }
  else {
    el_gate.sprite.animationStatus = "close";
    el_gate.collisionBox = [0,6,16,10];
  } 
}