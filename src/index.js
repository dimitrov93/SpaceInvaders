let scores = Number(document.getElementById("score").textContent);
let tank = document.querySelector(".box");
let bullet = document.getElementById('bullet')

moving = 50;

window.addEventListener("keydown", ({ key }) => {

  var PressedKey = window.localStorage.setItem('Key', key);

});

// This is not the best accroding to this article
// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
// but we do it, because it is the easiest regarding setting the main heartbeat of the game.
setInterval(SpaceInvaders, 16);

// This is the game Space Invaders
function SpaceInvaders(){

var key = window.localStorage.getItem('Key');

  // console.log(key);
  switch (key) {
    case "ArrowLeft":
      moving--;
      tank.style.left = moving + "%";
      break;
    case "ArrowRight":
      moving++;
      tank.style.left = moving + "%";
      break;
      case " ":
        if (bullet.style.visibility = 'hidden') {
          bullet.style.visibility = 'visible'
        } else {
          bullet.style.visibility = 'hidden';
        }
        break;

    default:
      break;
    }

    window.localStorage.removeItem('Key');

    // Bullet Brain
    // If bullet is active
    // Until bullet meets a target
    // or
    // bullet reaches the top of the screen
    // move the bullet

};