const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  // document.querySelector는 document에서 찾지만,
  // toDoForm.querySelector는 toDoForm 안에서만 찾는다.
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

/*function filterFn(toDo){
  return toDo.id === 1
}
// array의 모든 아이템을 통해 함수를 실행하고, true를 return하는 아이템들만 가지고 새로운 array를 만든다.
// li에 없는 id인 toDos를 체크해야 그것을 지울 수 있다.
// ex) const cleanToDos = toDos.filter(filterFn);
-> 위의 예시로는 id가 1인 것들만 array로 만들어지는 것이다.
*/

let toDos = []; // 여러가지 일을 추가할 수 있도록 array 사용

function deleteToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // 이렇게만 하면 새로고침하면 지웠던 것들이 다시 생긴다.
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
    // toDo의 id는 숫자고 li의 id는 string이므로 string을 숫자로 변환해줄 필요가 있다.
  });
  toDos = cleanToDos; // 새로 만든 array로 교체
  saveToDos();
}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
} // toDos를 가져와서 로컬에 저장하는 일을 한다.
// localStorage에는 자바스크립트의 data를 저장할 수 없다.(string만 저장 가능)
// javascript는 localStorage에 있는 모든 데이터를 string으로 저장하려고 한다. -> object가 string이 되도록 해야한다.

function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  span.innerText = text;
  // 엔터를 눌렀을 때, li를 생성하고, delete 버튼과 span을 생성
  const newId = toDos.length + 1; // array가 비어있을 때 1이 되도록
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  // 나중에 버튼을 클릭했을 때 어떤 li를 지워야하는지 알 수 있도록 하기 위해서 li에도 id를 주는 것이 좋다.
  toDoList.appendChild(li);
  // span과 delete 버튼을 li 안에 append하고, 마지막으로 li를 ul에다 append

  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos(); // push한 이후에 불러야한다.
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null){
    const parsedToDos = JSON.parse(loadedToDos); // object로 변환
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);
    });
  }
  // JSON = JavaScript Object Notation : 데이터를 전달할 때, 자바스크립트가 그것을 다룰 수 있도록 object로 바꿔주는 기능
  // -> 자바스크립트의 object를 string으로, 또는 string을 object로 변환해줄 수 있다.
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
