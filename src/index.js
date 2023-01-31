let scores = document.getElementById("score");
let tank = document.querySelector("#firstSprite");
let enemyTank = document.querySelector("#secondSprite");
let bullet = document.getElementById("bullet");
let eBullet = document.getElementById("enemyBullet");
let firstLineEnemies = document.querySelector(".first_line_enemies");
let secondLineEnemies = document.querySelector(".second_line_enemies");
let livesCount = document.querySelectorAll(".livesCount");
let enemyLivesCount = document.querySelectorAll(".enemyLivesCount");

let tankCSS = getComputedStyle(tank);
let enemyBulletCSS = getComputedStyle(eBullet);
let enemyTankCSS = getComputedStyle(enemyTank);

let moving = 50;
let bulletsSpeed = 3;

var intervalID;

// Scores

function scoresCount() {
  let counter = 0;
  let secondLine = document.querySelectorAll(".line__second__pic");
  let firstLine = document.querySelectorAll(".line__one__pic");

  for (let i = 0; i < secondLine.length; i++) {
    if (secondLine[i].style[1]) {
      counter += 10;
    }
  }

  for (let i = 0; i < firstLine.length; i++) {
    if (firstLine[i].style[1]) {
      counter += 10;
    }
  }
  scores.innerHTML = counter;
}

// ------- Lives Count
function myLivesCount(livesLeft) {
  for (let i = 0; i < livesLeft; i++) {
    const livesImg = document.createElement("img");
    setAttributes(livesImg, {
      src: "./assets/spriteSheet.jpg",
      class: "livesImg",
    });
    livesCount[0].appendChild(livesImg);
  }

  for (let i = 0; i < livesLeft; i++) {
    const livesImg = document.createElement("img");
    setAttributes(livesImg, {
      src: "./assets/spriteSheet.jpg",
      class: "enemyLiveImg",
    });
    enemyLivesCount[0].appendChild(livesImg);
  }
}
myLivesCount(3);

let movementCounter = 1;
// Enemy tank movement
let enemeyMovemenet = setInterval(() => {
  let num = Math.floor(Math.random() * 11);
  if (num < 5) {
    enemyTank.style.left = Number(enemyTankCSS.left.split("px")[0]) - 20 + "px";
  } else {
    enemyTank.style.left = Number(enemyTankCSS.left.split("px")[0]) + 20 + "px";
  }
}, 1000);

let frontEnemiesMovement = setInterval(() => {
  let num = Math.floor(Math.random() * 11);
  let firstFrontLiners = document.querySelectorAll(".line__one__pic");
  let frontLinersMovement = document.querySelectorAll(".line__second__pic");

  if (num < 5) {
    for (const el of firstFrontLiners) {
      el.style.left = 90 + movementCounter + "px";
    }
    for (const el of frontLinersMovement) {
      el.style.left = 90 - movementCounter + "px";
    }
    movementCounter += 2;
  } else {
    for (const el of firstFrontLiners) {
      el.style.left = 90 - movementCounter + "px";
    }

    for (const el of frontLinersMovement) {
      el.style.left = 90 + movementCounter + "px";
    }
    movementCounter -= 2;
  }
}, 2000);

window.localStorage.setItem("bulletBottom", 59);
window.localStorage.setItem("bulletY", 60);
window.localStorage.setItem("bulletX", 0);

window.addEventListener("keydown", ({ key }) => {
  window.localStorage.setItem("Key", key);

  let keyPressed = window.localStorage.getItem("Key");

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

// GAME LOOP

function SpaceInvaders() {
  bulletMoving();
  enemyBullet();
  scoresCount();
  countLives();
}
function start() {
  intervalID = setInterval(SpaceInvaders, 16);
}

start();

function countLives(e) {
  let lives = document.querySelectorAll(".livesImg");
  let enemyLives = document.querySelectorAll(".enemyLiveImg");

  if (lives.length == 0) {
    document.querySelector(".lostGame").style.visibility = "visible";
    clearInterval(intervalID);
    clearInterval(enemeyMovemenet);
    clearInterval(frontEnemiesMovement);
  }

  if (enemyLives.length == 0) {
    document.querySelector(".winGame").style.visibility = "visible";
    clearInterval(intervalID);
    clearInterval(enemeyMovemenet);
    clearInterval(frontEnemiesMovement);
  }
}

// Shooting a bullet
function bulletMoving() {
  // console.log(firstLiners[0].style.visibility);
  let firstLiners = document.querySelectorAll(".line__second__pic");
  let secondLiners = document.querySelectorAll(".line__one__pic");
  let speed = Number(window.localStorage.getItem("bulletBottom"));

  let resetBulletCollision;

  if (window.localStorage.getItem("bulletY") >= 61) {
    speed += bulletsSpeed;
    bullet.style.bottom = speed + "px";

    // Colission start

    for (let i = 0; i < firstLiners.length; i++) {
      let _firstEnemyWidth = firstLiners[i].offsetWidth;
      let _firstEnemyHeight = firstLiners[i].offsetHeight;

      let _bulletWidth = bullet.offsetWidth;
      let _bulletHeight = bullet.offsetHeight;

      let collider1;
      let collider2;

      _firstFrontEnemyPosX = firstLiners.offsetLeft;

      collider1 = {
        x: firstLiners[i].offsetLeft - firstLiners[i].scrollLeft,
        y: firstLiners[i].offsetTop - firstLiners[i].scrollTop,
        width: _firstEnemyWidth,
        height: _firstEnemyHeight,
      };

      collider2 = {
        x: bullet.offsetLeft - bullet.scrollLeft,
        y: bullet.offsetTop - bullet.scrollTop,
        width: _bulletWidth,
        height: _bulletHeight,
      };

      if (
        collider1.x > collider2.x + collider2.width ||
        collider1.x + collider1.width < collider2.x ||
        collider1.y > collider2.y + collider2.height ||
        collider1.y + collider1.height < collider2.y
      ) {
        // true
      } else {
        // false

        if (firstLiners[i].style.visibility == "hidden") {
          continue;
        } else {
          bullet.style.visibility = "hidden";
          firstLiners[i].style.visibility = "hidden";
          resetBulletCollision = true;
        }
        // score += 10
      }
    }

    for (let i = 0; i < secondLiners.length; i++) {
      let _firstEnemyWidth = secondLiners[i].offsetWidth;
      let _firstEnemyHeight = secondLiners[i].offsetHeight;

      let _bulletWidth = bullet.offsetWidth;
      let _bulletHeight = bullet.offsetHeight;

      let collider1;
      let collider2;

      _firstFrontEnemyPosX = secondLiners.offsetLeft;

      collider1 = {
        x: secondLiners[i].offsetLeft - secondLiners[i].scrollLeft,
        y: secondLiners[i].offsetTop - secondLiners[i].scrollTop,
        width: _firstEnemyWidth,
        height: _firstEnemyHeight,
      };

      collider2 = {
        x: bullet.offsetLeft - bullet.scrollLeft,
        y: bullet.offsetTop - bullet.scrollTop,
        width: _bulletWidth,
        height: _bulletHeight,
      };

      if (
        collider1.x > collider2.x + collider2.width ||
        collider1.x + collider1.width < collider2.x ||
        collider1.y > collider2.y + collider2.height ||
        collider1.y + collider1.height < collider2.y
      ) {
        // true
      } else {
        // false

        if (secondLiners[i].style.visibility == "hidden") {
          continue;
        } else {
          bullet.style.visibility = "hidden";
          secondLiners[i].style.visibility = "hidden";
          resetBulletCollision = true;
        }
        // score += 10
      }
    }

    /// enemy tank
    let _enemyTankWidth = enemyTank.offsetWidth;
    let _enemyTankHeight = enemyTank.offsetHeight;
   
    let _bulletWidth = bullet.offsetWidth;
    let _bulletHeight = bullet.offsetHeight;
  
  
    let collider1;
    let collider2;

    _firstFrontEnemyPosX = secondLiners.offsetLeft
  
    collider1 = {
        x: enemyTank.offsetLeft - enemyTank.scrollLeft,
        y: enemyTank.offsetTop - enemyTank.scrollTop,
        width: _enemyTankWidth,
        height: _enemyTankHeight
      }

      collider2 = {
        x: bullet.offsetLeft - bullet.scrollLeft,
        y: bullet.offsetTop - bullet.scrollTop,
        width: _bulletWidth,
        height: _bulletHeight
      }

      if (collider1.x > collider2.x + collider2.width  ||
          collider1.x + collider1.width < collider2.x  ||
          collider1.y > collider2.y + collider2.height ||
          collider1.y + collider1.height < collider2.y
        ) {
          // true
      } else {
        // false
        console.log('as');
        if (requestAnimationFrame(SpaceInvaders) % 26 == 0) {
          console.log('tuka');
          document.getElementById("livesEnemyId").lastElementChild.remove();
        };
      }
  }


  window.localStorage.setItem("bulletBottom", speed);
  if (Number(window.localStorage.getItem("bulletBottom")) > 736) {
    window.localStorage.setItem("bulletBottom", 60);
    window.localStorage.setItem("bulletY", 60);
    bullet.style.visibility = "hidden";
  }

  if (resetBulletCollision) {
    window.localStorage.setItem("bulletBottom", 60);
    window.localStorage.setItem("bulletY", 60);
    bullet.style.visibility = "hidden";
  }
}

// -------------------------------------------------   ENEMY BULLET
let tankLeftOffset;
let speed = 200;

let timer = false;
const interval = setInterval(() => {
  timer = true;
  tankLeftOffset = enemyTank.offsetLeft + "px";
}, 5000);

function enemyBullet() {
  if (timer) {
    eBullet.style.visibility = "visible";
    eBullet.style.left = tankLeftOffset;
    speed += bulletsSpeed;
    eBullet.style.top = speed + "px";

    let tankWidth = tank.offsetWidth;
    let tankHeight = tank.offsetHeight;

    let _bulletWidth = eBullet.offsetWidth;
    let _bulletHeight = eBullet.offsetHeight;

    let collider1;
    let collider2;

    collider1 = {
      x: tank.offsetLeft - tank.scrollLeft,
      y: tank.offsetTop - tank.scrollTop,
      width: tankWidth,
      height: tankHeight,
    };

    collider2 = {
      x: eBullet.offsetLeft - eBullet.scrollLeft,
      y: eBullet.offsetTop - eBullet.scrollTop,
      width: _bulletWidth,
      height: _bulletHeight,
    };

    if (
      collider1.x > collider2.x + collider2.width ||
      collider1.x + collider1.width < collider2.x ||
      collider1.y > collider2.y + collider2.height ||
      collider1.y + collider1.height < collider2.y
    ) {
    } else {
      // false
      eBullet.style.top = 206 + "px";
      eBullet.style.visibility = "hidden";

      if (requestAnimationFrame(SpaceInvaders) % 20 == 0) {
        document.getElementById("livesId").lastElementChild.remove();
      }
    }
  }

  if (speed >= 730) {
    timer = false;
    speed = 206;
    eBullet.style.visibility = "hidden";
  }
}

// MAPING
const map = [
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "1"],
  ["1", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "1"],
];

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

map.forEach((row, j) => {
  row.forEach((el, j) => {
    switch (el) {
      case "-":
        const firstLineImg = document.createElement("img");
        setAttributes(firstLineImg, {
          src: "./assets/spriteSheet.jpg",
          class: "line__one__pic",
        });
        firstLineEnemies.appendChild(firstLineImg);
        break;

      case "*":
        const secondLineImg = document.createElement("img");
        setAttributes(secondLineImg, {
          src: "./assets/spriteSheet.jpg",
          class: "line__second__pic",
        });

        secondLineEnemies.appendChild(secondLineImg);
        break;

      default:
        break;
    }
  });
});
