let scores = Number(document.getElementById("score").textContent);
let tank = document.querySelector("#firstSprite");
let bullet = document.getElementById("bullet");

let tankCSS = getComputedStyle(tank);

// let bulletCSS = getComputedStyle(bullet);
// console.log(Number(bulletCSS.left.split('px')[0]));

let moving = 50;
// bullet param y

window.localStorage.setItem("bulletBottom", 59);
window.localStorage.setItem("bulletY", 60);
window.localStorage.setItem("bulletX", 0);

window.addEventListener("keydown", ({ key }) => {
  window.localStorage.setItem("Key", key);

  let keyPressed = window.localStorage.getItem("Key");

  // console.log(key);
  switch (keyPressed) {
    case "ArrowLeft":
      moving--;
      tank.style.left = moving + "%";
      break;
    case "ArrowRight":
      moving++;
      tank.style.left = moving + "%";
      break;
    case " ":
      if ( window.localStorage.getItem('bulletY') == 60) {
        bullet.style.left = Number(tankCSS.left.split("px")[0]) + "px";
        bullet.style.visibility = "visible";

        window.localStorage.setItem("bulletY", 61);
      }
      break;

    default:
      break;
  }

  window.localStorage.removeItem("Key");
});

// This is not the best accroding to this article
// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
// but we do it, because it is the easiest regarding setting the main heartbeat of the game.
setInterval(SpaceInvaders, 16);

// This is the game Space Invaders
function SpaceInvaders() {
  bulletMoving();
}

function bulletMoving() {
  // Bullet Brain
  // If bullet is active
  // Until bullet meets a target
  // or
  // bullet reaches the top of the screen
  // move the bullet
  let speed = window.localStorage.getItem("bulletBottom");
  speed++;
  if (window.localStorage.getItem("bulletY") >= 61) {
    bullet.style.bottom = speed + "px";
  }
  window.localStorage.setItem("bulletBottom", speed);
  if (bullet.style.bottom == "736px") {
    window.localStorage.setItem("bulletBottom", 60);
    window.localStorage.setItem("bulletY", 60);
    bullet.style.visibility = "hidden";

  }
}
