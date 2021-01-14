const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage"); // image 저장, css 효과 추가
  body.prepend(image); // 요소의 가장 앞부분에 추가
  // append는 요소의 가장 끝에 추가
}

function genRandom(){
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init(){
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
