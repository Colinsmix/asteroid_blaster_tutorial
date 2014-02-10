hit = 0;
enemiesRemaining=0;
worldEnded=false;
var thisPos = new Array();
var curPos = new Array();
topScore = false;

window.onload = function(){
  checkVars();
  var kin = new Kinetic_2d("theCanvas");
  var context = kin.getContext();
  var worldX = document.getElementById("theCanvas");
  var worldXContext = worldX.getContext("2d");
  var img = new Image();
  intervalId1 =0;
  intervalId2 =0;
  img.src = "earth.jpg"
  worldXContext.drawImage(img,0,0);

  kin.getCanvas().mouseup = function(){
    kin.drawStage();
  };

  kin.setDrawStage(function(){
    var mousePos = kin.getMousePos();
    if (mousePos !== null) {
      mousePos.y;
      curPos[0] = mousePos.x;
      curPos[1] = mousePos.y;
    }
    else {
      curPos[0] = 0;
      curPos[1] = 0;
    }
  });
};

function checkVars(){
  if(sessionStorage.hit==0||sessionStorage.hit==undefined){
    sessionStorage.hit=0;
  }

  hit = sessionStorage.hit;
  document.getElementById("hit").innerHTML = hit;

  if(localStorage.tophit>=sessionStorage.hit&&localStorage.tophit!=0){
    document.getElementById("tophit").innerHTML = localStorage.tophit;
  }

  else if(localStorage.tophit==undefined||localStorage.tophit==0){
    localStorage.tophit=0;
    document.getElementById("tophit").innerHTML = 0;
  }

  if(sessionStorage.enemies==undefined||sessionStorage.enemies==0){
    sessionStorage.enemies = 5;
  }
  enemiesRemaining=sessionStorage.enemies;
  document.getElementById("enemiesRemaining").innerHTML = enemiesRemaining;
  }

function startFalling(){
  intervalId1= setInterval(function(){
  var asteroidx = new Asteroid();
  do{
    intervalId2 = setInterval(function(){
    asteroidx.fallDown();
  },20)}while(this.alive==true);
  },500);
  btnStarter = document.getElementById("btx");
  btnStarter.setAttribute("value","RESTART");
  btnStarter.setAttribute("onclick","restart()");
}

function restart(){
  sessionStorage.hit = 0;
  sessionStorage.enemies = 0;
  location.reload(true);
}

function Asteroid(){
  this.world = document.getElementById("theCanvas");
  this.worldContext = this.world.getContext("2d");
  this.worldContext.strokeStyle = "#FF0000";
  this.x = Math.floor(Math.random()*999);
  this.y = 0;
  this.alive = true;
  this.update = false;
  this.id = intervalId2;
  if(this.x>500){
    this.direction = "right";
  }
  else{
    this.direction = "left";
  }
}

Asteroid.prototype.fallDown = function(){

      if(worldEnded==false){
        if(this.alive==true){
          this.worldContext.beginPath();

          if(((thisPos[0]-this.x)<10&&(thisPos[0]-this.x)>-10&&(thisPos[1]-this.y)<10&&(thisPos[1]-this.y)>-10)&&thisPos[0]!=0&&thisPos[1]!=0)
          {
            this.alive = false;
            this.worldContext.strokeStyle = "#FFFF00";
            this.worldContext.arc(this.x,this.y,10,0,Math.PI*2,true);
            this.worldContext.stroke();
            this.worldContext.strokeStyle = "#FF0000";
            statUp ="</br> Asteroid #"+intervalId2+ " has been succesfully destroyed!";
            setStatusUpdate(statUp);
            //this.y = y;
            //this.x = x;
            hit++;
            enemiesRemaining--;
            document.getElementById("hit").innerHTML = hit;
            document.getElementById("enemiesRemaining").innerHTML = enemiesRemaining;
            checkForTopScore();
          }

          else
          {
            this.worldContext.moveTo(this.x,this.y);
            this.trajectory();
            this.worldContext.lineTo(this.x,this.y);
            this.worldContext.stroke();
            if(this.y>250){
              if(this.update==false){

              statUp ="</br> <i>Asteroid #"+intervalId2+ "</i> has entered the atmosphere!";
              setStatusUpdate(statUp);
              this.update=true;
              }
            }

            if(this.y>500){
            this.worldContext.fillStyle="#FF0000";
            this.worldContext.arc(this.x,this.y,100,0,Math.PI*2,true);
            this.worldContext.stroke();
            this.worldContext.fill();
            this.intervalId = intervalId2;
            this.alive = false;
            this.alive = false;
            worldEnded = true;
            }
          }
          this.worldContext.closePath();
        }
      }

      else if(worldEnded==true){

        var worldX = document.getElementById("theCanvas");
        var worldXContext = worldX.getContext("2d");
        var img = new Image();
        img.src = "nuke.jpg";
        worldXContext.drawImage(img,-300,-300);

        if(topScore==true){
          alert("NOOOOOOOOOOOOOOOOO!\nOh yeah, congrats you got the top score. NOOOOOOOOOOOOOOOOOOOOO!");
          topScore =false;
        }

        window.clearInterval(this.intervalId);
        window.clearInterval(intervalId1);
        statUp ="</br> THE WORLD HAS BEEN DESTROYED!";
        setStatusUpdate(statUp);
        }
      }


