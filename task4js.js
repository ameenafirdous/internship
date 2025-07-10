let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filterStatus = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const textInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dueDateInput");
  const text = textInput.value.trim();
  const dueDate = dateInput.value;

  if (text) {
    tasks.push({
      text,
      completed: false,
      createdAt: new Date().toLocaleString(),
      due: dueDate,
    });
    saveTasks();
    renderTasks();
    textInput.value = "";
    dateInput.value = "";
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function filterTasks(status) {
  filterStatus = status;
  renderTasks();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

function dragStart(e, index) {
  e.dataTransfer.setData("text/plain", index);
}

function drop(e, targetIndex) {
  const fromIndex = e.dataTransfer.getData("text/plain");
  const movedItem = tasks.splice(fromIndex, 1)[0];
  tasks.splice(targetIndex, 0, movedItem);
  saveTasks();
  renderTasks();
}

function allowDrop(e) {
  e.preventDefault();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = tasks;
  if (filterStatus === "completed") {
    filtered = tasks.filter(t => t.completed);
  } else if (filterStatus === "pending") {
    filtered = tasks.filter(t => !t.completed);
  }

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");
    li.draggable = true;

    li.ondragstart = (e) => dragStart(e, index);
    li.ondrop = (e) => drop(e, index);
    li.ondragover = allowDrop;

    const taskText = document.createElement("span");
    taskText.innerHTML = `
      ${task.text}
      <br><small>🕒 Created: ${task.createdAt}</small>
      ${task.due ? `<br><small>📅 Due: ${new Date(task.due).toLocaleString()}</small>` : ""}
    `;

    const actions = document.createElement("div");
    actions.className = "actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete";
    completeBtn.textContent = task.completed ? "Undo" : "✔";
    completeBtn.onclick = () => toggleComplete(index);

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.textContent = "✏";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "🗑";
    deleteBtn.onclick = () => deleteTask(index);

    actions.append(completeBtn, editBtn, deleteBtn);
    li.append(taskText, actions);
    list.appendChild(li);
  });
}

// Load dark mode on refresh
if (JSON.parse(localStorage.getItem("darkMode"))) {
  document.body.classList.add("dark");
}

renderTasks();
