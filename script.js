window.onload = function () {
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            var imgDove = document.getElementById("dove");
            var imgPipe = document.getElementById("pipe");
            var imgPipe1 = document.getElementById("pipe1");
            var imgBg = document.getElementById("bg");
            var imgShit = document.getElementById("shit");
            var imgDove2 = document.getElementById("dove2");
            var xSpeed = 0;
            var ySpeed = 0;
            var posX = 40;
            var posY = 10;
            var radius = 20;
            var lastPosY = posY;
            var falling = true;
            var end = false;
            var color;
            var gravity = 1;
            var walls = [];
            var shits = [];
            var frameCount = 0;
            var score = 0;
            var ended = false;
            var canvasSet = true;
            bird = new Bird();
            wall = new Wall();
            function Bird() {
                this.Move = function () {
                    ySpeed += gravity;
                    posX += xSpeed;
                    posY += ySpeed;
                }
                this.Ground = function () {
                    if ((posY + radius) >= c.height) {
                        ySpeed *= -0.9;
                        falling = false;
                    }

                }
                this.Draw = function () {
                    /* ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.arc(posX, posY, radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath(); */
                    ctx.drawImage(imgDove2, posX-radius, posY-radius, 50, 50 );
                }
                this.HighPoint = function () {

                    if(posY > lastPosY && falling == false && posY > c.height - radius){
                        falling = true;
                    }
                lastPosY = posY;
                }
            }

            function Wall() {
                this.wallWidth = c.width/25;
                this.wallGap = c.width/10; // | |
                this.gap = c.height/5.5; // =
                this.x = c.width;
                this.wallSpeed = 10;
                this.wallHeight1 = Math.random()*(c.height - this.gap - 50) + 50;
                this.wallStartPoint = this.wallHeight1 + this.gap;
                this.wallPos = function(){
                    this.x -= this.wallSpeed;
                }

                this.drawWall = function(){
                    ctx.drawImage(imgPipe1, this.x, 0, this.wallWidth, this.wallHeight1);
                    ctx.drawImage(imgPipe, this.x, this.wallStartPoint, this.wallWidth, c.height);
                }
                this.isGameFinished = function () {
                    if (posX == this.x) {
                        if (posY - radius < this.wallHeight1 || posY + radius > this.wallStartPoint) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
                this.passedWall = function (index) {
                    if (posX - radius == this.x + this.wallWidth) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            function Shit(){
              this.x = posX;
              this.y = posY;
              this.ySpeed = 10;
              this.Move = function(){
                this.y += this.ySpeed
              }
              this.Draw = function () {
                ctx.drawImage(imgShit, this.x, this.y, 40, 20);
              }
              this.Splicing = function () {
                if(this.y > c.height){
                  shits.splice(0, 1);
                }
              }
            }
            buttonClicked = function(){
              var getWidth = parseInt(document.getElementById("inputWidth").value);
              var getHeight = parseInt(document.getElementById("inputHeight").value);
              c.width = getWidth;
              c.height = getHeight;
              console.log(getWidth);
              //location.reload();
              canvasSet = true;
            }
            var update = setInterval(function () {

if(canvasSet == false){

}else{


                if (end == true && ended != true) {
                    ctx.fillStyle = "red";
                    ctx.font = "100px Arial";
                        ctx.fillText("GAME OVER", (c.width/2)-150, c.height/2, 200);
                        ctx.fillStyle = "#006600";
                        ctx.fillText("SCORE: " + score, (c.width / 2) - 200, c.height / 2 + 100, 200);
                        ctx.fillStyle = "#006600";
                        ctx.fillText("Press R to restart", (c.width / 2) - 215, c.height / 2 + 200, 300);
                        ended = true;
                        clearInterval(update);
                    }else {
                        ctx.drawImage(imgBg, 0, 0, c.width, c.height);
                        bird.HighPoint();
                        //bird.Ground();
                        bird.Move();
                        bird.Draw();
                        if (frameCount % 40 == 0) {
                            if (walls.length > 4) {
                                walls.splice(0, 1);
                            }
                            walls.push(new Wall());
                            console.log(shits.length);
                        }
                        for (var i = 0; i < walls.length; i++) {
                            walls[i].wallPos();
                            walls[i].drawWall();
                            if (walls[i].isGameFinished()) {
                                end = true;
                            }
                            if (walls[i].passedWall(i)) {
                                score++;
                            }

                        }
                        for (var i = 0; i < shits.length; i++) {
                            shits[i].Move();
                            shits[i].Draw();
                            shits[i].Splicing();
                        }
                        document.addEventListener("keydown", function (event) {
                          if(event.keyCode == "82"){
                            location.reload();
                            ended = false;
                          }else{
                            ySpeed = -10;
                            shits.push(new Shit);
                          }
                        });
                        window.onclick = myFunction;
                        function myFunction() {
                          ySpeed = -10;
                        }
                        frameCount++;
                }
              }
            }, 30);

        };