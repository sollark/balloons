const gBalloons = [
  { bottom: 10, speed: 1 },
  { bottom: 10, speed: 5 },
];

function onClick(elBtn) {
  var audio = new Audio('../assets/pop.wav');
  audio.play();

  // blow up the balloon
  elBtn.style.height = '40px';
  elBtn.style.width = '14px';
  elBtn.classList.add('down');
}

// create new ballon
function onAddClick() {
  createNewBalloon();
}

function onStartClick() {
  init();
}

function init() {
  const myInterval = setInterval(function () {
    // take all balloons from html
    const elBalloons = document.querySelectorAll('.balloon');

    // loop through balloons
    for (
      let i = 0;
      i < elBalloons.length && elBalloons.length === gBalloons.length;
      i++
    ) {
      // update balloon position
      gBalloons[i].bottom = gBalloons[i].bottom + gBalloons[i].speed;

      // render ballon with new value
      elBalloons[i].style.bottom = gBalloons[i].bottom + '%';

      // delete old balloons
      if (gBalloons[i].bottom > 100 || gBalloons[i].bottom < 0) {
        gBalloons.splice(i, 1);
        elBalloons[i].parentElement.removeChild(elBalloons[i]);
      }

      // make blown balloons to fall
      if (elBalloons[i].classList.contains('down')) {
        gBalloons[i].speed = -gBalloons[i].speed;
        elBalloons[i].classList.remove('down');
      }
    }
  }, 100);

  // stop balloons
  setTimeout(function () {
    clearInterval(myInterval);
    console.log('stop');
  }, 100000);
}

function createNewBalloon() {
  // new object
  gBalloons.push({ bottom: 10, speed: getRandomSpeed() });

  // render balloon
  const body = document.querySelector('.balloons');
  body.innerHTML += `<div class="balloon" 
          style ='left : ${getRandomInt(1, 100)}%; 
          background: ${getRandomColor()}'
          onclick="onClick(this)"></div>`;
}

function getRandomSpeed() {
  return getRandomInt(1, 2);
}

function getRandomColor() {
  const colors = [
    'red',
    'blue',
    'green',
    'coral',
    'cyan',
    'deeppink',
    'gold',
    'lawngreen',
  ];
  return colors[getRandomInt(1, 8)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
