let scores = Number(document.getElementById("score").textContent);
let tank = document.querySelector("#firstSprite");
let enemyTank = document.querySelector("#secondSprite");
let bullet = document.getElementById("bullet");
let eBullet = document.getElementById("enemyBullet");

let tankCSS = getComputedStyle(tank);
let enemyBulletCSS = getComputedStyle(eBullet);
let enemyTankCSS = getComputedStyle(enemyTank);
// let bulletCSS = getComputedStyle(bullet);
// console.log(Number(bulletCSS.left.split('px')[0]));
console.log(enemyTankCSS.left);
let moving = 50;
let bulletsSpeed = 3;
// bullet param y

setInterval(() => {
  let num = Math.floor(Math.random() * 11)
  if (num < 5) {
    enemyTank.style.left = (Number(enemyTankCSS.left.split('px')[0]) - 20) + 'px'
  } else {
    enemyTank.style.left = (Number(enemyTankCSS.left.split('px')[0]) + 20) + 'px'
  }
}, 1000);


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
      if (window.localStorage.getItem("bulletY") == 60) {
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
  enemyBullet()
}

function bulletMoving() {
  let speed = Number(window.localStorage.getItem("bulletBottom"));
  if (window.localStorage.getItem("bulletY") >= 61) {
    speed += bulletsSpeed;
    bullet.style.bottom = speed + "px";
  }
  window.localStorage.setItem("bulletBottom", speed);
  if (Number(window.localStorage.getItem("bulletBottom")) > 736 ) {
    window.localStorage.setItem("bulletBottom", 60);
    window.localStorage.setItem("bulletY", 60);
    bullet.style.visibility = "hidden";
  }
}

window.localStorage.setItem("timer", false);
let timer = window.localStorage.getItem('timer')
setInterval(() => {
  timer = !timer;
  window.localStorage.setItem("timer", timer);
}, 5000);


let speed = 200;
function enemyBullet() {
  // let speed = window.localStorage.getItem("bulletBottom");

  if (window.localStorage.getItem('timer')) {
    speed+=bulletsSpeed
    eBullet.style.top = speed + 'px'
  } 

  if (speed >= 730) {
    speed = 206
  }

}
