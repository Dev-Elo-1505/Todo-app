// structure html - add dummy data
//  - build with lightmode but use root
// style with css
// then tackle javascript

//logic for adding todo list
//1 user enters value into input field
//2 target enter event
//3 take value from input
//4 create element with it
//5 form validation to make sure something is entered

const todoInput = document.getElementById("todo-input");
const todoBox = document.getElementById("todo-box");
const todoInfo = document.getElementById("todo-info");
const themeSwitch = document.getElementById("theme-switch");
const todoCountEl = document.getElementById("todo-count");
const clearCompleted = document.getElementById("clear-completed");
const activeTodoEl = document.getElementById("active-todo");
const completeTodoEl = document.getElementById("complete-todo");
const allTodoEl = document.getElementById("all-todo");
let todoCount = 0;
let todoArr = [];

const createTodoItem = (text, completed = false) => {
  const div = document.createElement("div");
  div.innerHTML = `<div class="todo-in"><input type="checkbox" name="" class="checkbox-el" /><p>${text}</p></div><svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="hsl(236, 9%, 61%)" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>`;
  div.classList.add("todo-item");
  if(completed) {
    div.classList.add("completed");
    div.querySelector(".checkbox-el").checked = true;
  }

  const updateLocalStorage = () => {

  }
   
  todoArr.push(text);
  localStorage.setItem("todoStore", todoArr.toString());
  todoInfo.style.display = "flex";
  todoCount++;
  todoCountEl.textContent = todoCount;
  const checkboxEl = div.querySelector(".checkbox-el");
  checkboxEl.addEventListener("change", () => {
    div.classList.toggle("completed");
    const totalUncrossed = document.querySelectorAll(
      ".todo-item:not(.completed)"
    ).length;
    todoCountEl.textContent = totalUncrossed;
  });

  const deleteIcon = div.querySelector(".delete-icon");
  deleteIcon.addEventListener("click", () => {
    div.remove();
    todoArr = todoArr.filter((item) => item !== text);
    localStorage.setItem("todoStore", JSON.stringify(todoArr));
    todoCount--;
    todoCountEl.textContent = todoCount;
  });

  clearCompleted.addEventListener("click", () => {
    if (div.classList.contains("completed")) {
      div.remove();
    }
  });
  allTodoEl.addEventListener("click", () => {
    const allTodos = document.querySelectorAll(".todo-item");
    allTodos.forEach((todo) => {
      todo.style.display = "flex";
    });
  });
  activeTodoEl.addEventListener("click", () => {
    const allTodos = document.querySelectorAll(".todo-item");
    allTodos.forEach((todo) => {
      todo.style.display = todo.classList.contains("completed")
        ? "none"
        : "flex";
    });
  });
  completeTodoEl.addEventListener("click", () => {
    const allTodos = document.querySelectorAll(".todo-item");
    allTodos.forEach((todo) => {
      todo.style.display = todo.classList.contains("completed")
        ? "flex"
        : "none";
    });
  });

  return div;
};

const addTodo = (event) => {
  if (event.keyCode === 13 && todoInput.value.trim()) {
    const todoItem = createTodoItem(todoInput.value);
    todoBox.appendChild(todoItem);
    todoInput.value = "";
  }
};

todoInput.addEventListener("keypress", addTodo);

document.addEventListener("DOMContentLoaded", () => {
  const savedTodos = localStorage.getItem("todoStore");
  if (savedTodos) {
    const todos = JSON.parse(savedTodos);
    todos.forEach((todo) => {
      const todoItem = createTodoItem(todo);
      todoBox.appendChild(todoItem);
    });
    todoCount = todos.filter((todo) => !todo.completed).length;
    todoCountEl.textContent = todoCount;
  }
});

let darkmode = localStorage.getItem("darkmode");

const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};
const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkMode();

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkMode() : disableDarkMode();
});
