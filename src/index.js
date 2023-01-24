let scores = Number(document.getElementById("score").textContent);
let tank = document.querySelector(".box");

moving = 50;

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "ArrowLeft":
      moving--;
      tank.style.left = moving + "%";
      break;
    case "ArrowRight":
      moving++;
      tank.style.left = moving + "%";

      break;

    default:
      break;
  }
});
