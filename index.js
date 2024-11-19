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
const todoUl = document.getElementById("todo-ul");

const themeSwitch = document.getElementById("theme-switch");

const createTodoItem = (text) => {
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" name="" class="checkbox-el" />${text}<svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>`;

  const checkboxEl = li.querySelector(".checkbox-el");
  checkboxEl.addEventListener("change", () => {
    li.classList.toggle("completed");
  });

  const deleteIcon = li.querySelector(".delete-icon");
  deleteIcon.addEventListener("click", () => {
    li.remove();
  });

  return li;
};

const addTodo = (event) => {
  if (event.keyCode === 13 && todoInput.value.trim()) {
    const todoItem = createTodoItem(todoInput.value);
    todoUl.appendChild(todoItem);
    todoInput.value = "";
  }
};

todoInput.addEventListener("keypress", addTodo);

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
