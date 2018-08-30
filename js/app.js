/***********Engine.js**************
**********************************/
//* App.js
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'https://raw.githubusercontent.com/udacity/frontend-nanodegree-arcade-game/master/images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x+(this.speed*dt);
    // this.x += 1;
    if(this.x > 500) {
      this.x = -100;
    }
    if(player.x < this.x + 30 &&
      player.x + 20 > this.x &&
      player.y < this.y + 25 &&
      30 + player.y > this.y) {
        player.x = 200;
        player.y = 415;
      }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = 200;
    this.y = 415;
    this.sprite = 'https://raw.githubusercontent.com/udacity/frontend-nanodegree-arcade-game/master/images/char-boy.png';
};

Player.prototype.update = function(dt) {
  //changes levels when player reaches water
  if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        score++;
        document.getElementById('levelScore').innerHTML = score;
        if(score >= 10) {
            alert("Great Job! You won!");
            document.getElementById("levelScore").innerHTML = "0";
        }
    }
};
// puts player on board
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// this code moves the player around the x and y axis
Player.prototype.handleInput = function(dt) {
  switch(dt) {
    case 'left':
      if(this.x > 0) {
        this.x -= 100;
      }
      break;
    case 'up':
      if(this.y > 0) {
        this.y -= 85;
      }
      break;
    case 'right':
      if(this.x < 400) {
        this.x += 100;
      }
      break;
    case 'down':
      if(this.y < 400) {
        this.y += 85;
      }
      break;
  }
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 415;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var score = 0;
var player = new Player();

var bug1 = new Enemy(-100, 60, 200); //row1
var bug2 = new Enemy(-120, 230, 300);//row3
var bug3 = new Enemy((-220), 60, 250);//row1
var bug4 = new Enemy(-150, 230, 160);//row3
var bug5 = new Enemy(-200, 150, 100);//row2
var bug6 = new Enemy(-170, 150, 250);//row2
var allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
