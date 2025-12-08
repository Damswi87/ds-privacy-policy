let editIndex = null;

// Load tasks from local storage when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();

  if (task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    displayTasks();
  }
}

// Function to load tasks from local storage
function loadTasks() {
  displayTasks();
}

// Function to display tasks in a table
function displayTasks() {
  const tasks = getTasksFromLocalStorage();
  const taskBody = document.getElementById("taskBody");
  taskBody.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${task}</td>
            <td>
                <button onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
    taskBody.appendChild(row);
  });
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

// Function to delete a task
function deleteTask(index) {
  const tasks = getTasksFromLocalStorage();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// Function to edit a task
function editTask(index) {
  const tasks = getTasksFromLocalStorage();
  const taskInput = document.getElementById("taskInput");

  // Fill the input with the task to be edited
  taskInput.value = tasks[index];

  // Set the index globally to keep track of which task is being edited
  editIndex = index;

  // Toggle the buttons
  document.getElementById("addTaskBtn").style.display = "none";
}

// Function to update the task
function updateTask() {
  const tasks = getTasksFromLocalStorage();
  const taskInput = document.getElementById("taskInput");
  const updatedTask = taskInput.value.trim();

  if (updatedTask && editIndex !== null) {
    // Update the task at the stored index
    tasks[editIndex] = updatedTask;

    // Save the updated tasks array back to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear the input and reset the index
    taskInput.value = "";
    editIndex = null;

    // Toggle the buttons back
    document.getElementById("addTaskBtn").style.display = "inline-block";
    document.getElementById("updateTaskBtn").style.display = "none";

    // Refresh the task list
    displayTasks();
  }
}

// Function to clear all tasks
function clearTasks() {
  localStorage.removeItem("tasks");
  displayTasks();
}
