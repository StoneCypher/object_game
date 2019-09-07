
const screenWidth    = 512,
      screenHeight   = 384,
      doggoBaseWidth = 40;

const near_back  = 200,
      near_front = 300;

const rand         = n      => Math.floor(Math.random() * n),
      rand_between = (x, y) => rand(y-x) + x;

let target,
    dogs;

const seq = n =>
  new Array(n).fill(false).map( (_, i) => i );  // seq(5) -> [0,1,2,3,4]

const n_times = (n, doWhat) =>
  seq(n).map(_ => doWhat());

const pctToBack = y =>
  (screenHeight - y) / screenHeight;

// does the actual work of creating and attaching a doggo
// doggo coordinate is upper left hand corner, le sigh
function PlaceAt(x, y) {

  let realToBack        = (screenHeight - y) / screenHeight,
      scale             = 1 - (realToBack * 1);

  let thisDoggo         = document.createElement('img');

  thisDoggo.className   = 'doggo';
  thisDoggo.src         = 'chihuahua.png';
  thisDoggo.style.top   = `${y}px`;
  thisDoggo.style.left  = `${x}px`;
  thisDoggo.style.width = `${doggoBaseWidth * scale}px`;
  thisDoggo.onclick     = receiveDoggoClick;

  dogs.appendChild(thisDoggo);
  ++doggoCount;

}

function receiveDoggoClick(evt) {
  --doggoCount;
  evt.srcElement.parentElement.removeChild(evt.srcElement);
  document.getElementById('woof').play();
  if (doggoCount <= 0) {
    document.getElementById('applause').play();
    target.className = 'replay';
  }
}

function PlaceOnGrass() {
  let x = rand(screenWidth - doggoBaseWidth),
      y = rand_between(near_front, near_back);
  PlaceAt(x, y);
}

function PlaceOnNearGrass() {
  let x = rand(screenWidth - doggoBaseWidth),
      y = rand_between(screenHeight - 50, near_front);
  PlaceAt(x, y);
}

function enterGameMode() {
  doggoCount       = 0;
  dogs.innerHTML   = '';
  target.className = 'game';
  n_times(10, PlaceOnGrass);
  n_times(4,  PlaceOnNearGrass);
}

function startup() {

  target = document.getElementById('target');
  dogs   = document.getElementById('dogs');

  target.className = 'menu';

  document.getElementById('begin').onclick = enterGameMode;

}



window.onload = startup;
