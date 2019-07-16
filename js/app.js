const enemyStartX = -90;
const playerStartX = 202;
const playerStartY = 373.5;
const canvasRightLimit = 504;

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  // Set enemy x start posittion
  // Enemy starts at random x position
  this.x = Math.floor((Math.random() * canvasRightLimit) + enemyStartX);

  //Array of possible enemy positions
  this.yArray = [41.5, 124.5, 207.5];

  //Set enemy position to random yArray value
  this.y = this.yArray[Math.floor(Math.random() * this.yArray.length)];

  // Set enemy speed to random value between 10 and 30
  this.speed = Math.floor((Math.random() * 30) + 10);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + (this.speed * dt);

  // Refresh enemy when it reaches canvas right
  if (this.x > canvasRightLimit) {
    // Reset enemy start position
    this.x = enemyStartX;

    // Set enemy position to random yArray value
    this.y = this.yArray[Math.floor(Math.random() * this.yArray.length)];

    // Set enemy speed to random value between 10 and 30
    this.speed = Math.floor((Math.random() * 30) + 10);
  }

  // Check if enemy collides with player
  // Collision occurs when enemy and player are at the same x and y positions
  if ((this.x > player.x - 75 && this.x < player.x + 75) && (this.y > player.y - 75 && this.y < player.y + 75)) {
    // Return player to initial position
    player.x = playerStartX;
    player.y = playerStartY;

    // Enemies go to random positions
    allEnemies.forEach(function(enemy) {
      enemy.x = Math.floor((Math.random() * canvasRightLimit) + enemyStartX);
      enemy.y = enemy.yArray[Math.floor(Math.random() * enemy.yArray.length)];
    });
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  // Set initial player position
  this.x = playerStartX;
  this.y = playerStartY;

  // Set player image
  this.sprite = 'images/char-boy.png';
};

Player.prototype.handleInput = function(keyPress) {
  // Change position according to what key was pressed
  switch (keyPress) {
    case 'up':
      this.y = this.y - 83;
      if (this.y < 0) {
        this.x = playerStartX;
        this.y = playerStartY;
      }

      break;

    case 'down':
      if (this.y < playerStartY) {
        this.y = this.y + 83;
      }

      break;

    case 'left':
      if (this.x > 0) {
        this.x = this.x - 101;
      }

      break;

    case 'right':
      if (this.x < 404) {
        this.x = this.x + 101;
      }

      break;
  }
};

Player.prototype.update = function(dt) {

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

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
