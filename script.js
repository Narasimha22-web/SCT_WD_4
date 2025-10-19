let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>${task.text} 
        <small>(${task.date || ""} ${task.time || ""})</small>
      </span>
      <div class="actions">
        <button class="complete" onclick="toggleComplete(${index})">Complete</button>
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById("taskInput").value;
  const date = document.getElementById("taskDate").value;
  const time = document.getElementById("taskTime").value;
  if (text === "") return alert("Please enter a task!");

  tasks.push({ text, date, time, completed: false });
  document.getElementById("taskInput").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskTime").value = "";
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText;
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

renderTasks();
