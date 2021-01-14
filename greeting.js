const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
 SHOWING_ON = "showing"; // class

function saveName(text){
  localStorage.setItem(USER_LS, text);
} // 이름을 저장

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
// form을 제출하는 event가 발생(enter입력)하면 event가 계속 위로 올라가서 document까지로 올라가 프로그램되어있는대로 다른데로 가고 페이지가 새로고침 된다.
// 이것이 default이므로 이를 수정하기 위해 preventDefault 함수 이용(event를 막음)

function askForName(){
  form.classList.add(SHOWING_ON);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
  form.classList.remove(SHOWING_ON);
  greeting.classList.add(SHOWING_ON);
  greeting.innerText = `Hello ${text}`;
}

function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  // name을 저장하는 게 아니라 불러오는 것이다.
  if(currentUser === null){
    askForName();
  }else{
    paintGreeting(currentUser);
  }
}
function init(){
  loadName();
}

init();
// local Storage : 작은 장보를 유저 컴퓨터에 저장하는 것
// Inspector - Application - Local Storage 에서 확인 가능
