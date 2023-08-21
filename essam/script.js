const btnToggle = document.getElementById("btn-toggle");
const parentTodo = document.getElementById("parent-todo");
const Chicked = document.getElementById("chicked-task");
const inputTask = document.getElementById("input-task");
const btnDone = document.getElementById("btn-done");
const listTasks = document.getElementById("list-tasks");
const btnActive = document.getElementById("btn-active");
const btnCompeleted = document.getElementById("btn-completed");
const btnAll = document.getElementById("btn-all");
const counterTasks = document.getElementById("counter-tasks");
const body = document.getElementById("body");
// Retrieve the stored state from local storage
const storedStateJSON = localStorage.getItem("state");

btnToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mood");
});

let initialState = storedStateJSON
  ? JSON.parse(storedStateJSON)
  : {
      storeTasks: [],
      counterTasks: 0,
    };

btnDone.addEventListener("click", () => {
  const valInput = inputTask.value;
  const isChecked = Chicked.checked;

  if (valInput.trim() !== "") {
    initialState.storeTasks.push({
      id: ++initialState.counterTasks,
      text: valInput,
      checked: isChecked,
    });

    inputTask.value = "";
    updateLocalStorage();
    displayTasks(initialState.storeTasks);
  }
});

// Event listener for updating task completion status
listTasks.addEventListener("change", (event) => {
  console.log("evenyt clicked", event);
  const checkbox = event.target;
  const taskId = parseInt(checkbox.getAttribute("data-task-id"));
  // loook this fucke point
  const isChecked = checkbox.checked;

  initialState.storeTasks = initialState.storeTasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, checked: isChecked };
    }
    return task;
  });

  updateLocalStorage();
  displayTasks(initialState.storeTasks);
  counterTasks.innerHTML = initialState.counterTasks;
});

function updateLocalStorage() {
  const stateJSON = JSON.stringify(initialState);
  localStorage.setItem("state", stateJSON);
}

function displayTasks(allTasks) {
  listTasks.innerHTML = "";
  allTasks.forEach((task) => {
    listTasks.innerHTML += `
      <div class="task">
        <input 
          type="checkbox" 
          class="btn-checkBox" 
          data-task-id="${task.id}" 
          ${task.checked ? "checked" : ""}
        >
        <span style="text-decoration: ${
          task.checked ? "line-through" : "none"
        }">${task.text}</span>

        <button data-clear-id="${task.id}">X</button>
      </div>`;
  });

  updateActiveTasksCount(allTasks);
}

function updateActiveTasksCount(allTasks) {
  const activeTasksCount = allTasks.filter((task) => !task.checked).length;
  console.log("Active tasks:", activeTasksCount);
  counterTasks.innerHTML = activeTasksCount;
}

// Initial display of tasks
displayTasks(initialState.storeTasks);
btnAll.addEventListener("click", () => {
  displayTasks(initialState.storeTasks);
});

btnActive.addEventListener("click", () => {
  const arr = initialState.storeTasks.filter((task) => !task.checked);
  console.log("checked items", arr);
  displayTasks(arr);
});

btnCompeleted.addEventListener("click", () => {
  const arr = initialState.storeTasks.filter((task) => task.checked);
  console.log("checked items", arr);
  displayTasks(arr);
});
