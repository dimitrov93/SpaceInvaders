let scores = Number(document.getElementById("score").textContent);
let tank = document.querySelector(".box");
let bullet = document.getElementById("bullet");

let moving = 50;
// bullet param y

window.localStorage.setItem("bulletSpeed", 40);
window.localStorage.setItem("bulletY", 60);
window.localStorage.setItem("bulletX", 0);

window.addEventListener("keydown", ({ key }) => {
  window.localStorage.setItem("Key", key);

  var key = window.localStorage.getItem("Key");

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
      if ((bullet.style.visibility = "hidden")) {
        bullet.style.visibility = "visible";
        window.localStorage.setItem("bulletY", 61);
      } else {
        bullet.style.visibility = "hidden";
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
  let speed = window.localStorage.getItem("bulletSpeed");
  speed++;
  if (window.localStorage.getItem("bulletY") >= 61) {
    bullet.style.bottom = speed + "px";
  }
  window.localStorage.setItem("bulletSpeed", speed);

  if (bullet.style.bottom == "736px") {
    window.localStorage.setItem("bulletSpeed", 60);
    window.localStorage.setItem("bulletY", 60);
  }
}
