const form = document.querySelector("form");
const newTodo = document.querySelector("#newTodo");
const todoList = document.querySelector("#todoList");

form.addEventListener("submit", function (event) {
  // 기본 동작 중단
  event.preventDefault();

  // 새로운 할 일 생성
  const todo = document.createElement("li");
  const todoText = document.createElement("span");
  todoText.innerText = newTodo.value;
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", function () {
    todo.remove();
  });
  todo.appendChild(todoText);
  todo.appendChild(deleteButton);

  // 할 일 목록에 추가
  todoList.appendChild(todo);

  // 입력 창 초기화
  newTodo.value = "";
});
 