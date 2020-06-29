const cvs = document.querySelector('#canvas');
const ctx = cvs.getContext('2d');

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/ground.png";
pipeUp.src = "img/pipe_up.png"
pipeBottom.src = "img/pipe_bottom.png";

const scoreAudio = new Audio();
scoreAudio.src = "audio/score.mp3";

const song = new Audio();
song.src = "audio/song.mp3";

const gap = 100;

let score = 0;

document.addEventListener("keydown", moveUp);

function moveUp() {
  yPos -=25;
}

const pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0,
}

//bird position
let xPos = 10;
let yPos = 150;
const grav = 1.5;

function draw() {
  ctx.drawImage(bg, 0, 0);
  song.play();
  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
    pipe[i].x -= 1;

    if (pipe[i].x === 50) {
      pipe.push({
          x: cvs.width,
          y: Math.floor(Math.random() * pipeUp.height)  - pipeUp.height,
      });
    }

    if (xPos + bird.width >= pipe[i].x
        && xPos <= pipe[i].x + pipeUp.width
        && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) ||
            yPos + bird.height >= cvs.height - fg.height) {
                location.reload();
    }
    if (pipe[i].x === 5) {
        score += 1;
        scoreAudio.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos, 38, 26);
  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Score: " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

pipeBottom.onload = draw;