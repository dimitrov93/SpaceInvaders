let scores = Number(document.getElementById("score").textContent);
let tank = document.querySelector(".box");
let bullet = document.getElementById('bullet')

moving = 50;

window.addEventListener("keydown", ({ key }) => {
  console.log(key);
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
});
