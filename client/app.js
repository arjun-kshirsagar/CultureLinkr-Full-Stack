const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const apiUrl = 'http://localhost:3000/api/tasks';

const fetchTasks = async () => {
  const response = await fetch(apiUrl);
  const tasks = await response.json();
  taskList.innerHTML = tasks.map(task => `
    <li data-id="${task.id}">
      <span ${task.completed ? 'style="text-decoration: line-through;"' : ''}>${task.title}</span>
      <button onclick="toggleComplete(${task.id}, ${!task.completed})">${task.completed ? 'Undo' : 'Complete'}</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    </li>
  `).join('');
};

const addTask = async (e) => {
  e.preventDefault();
  const title = taskInput.value;
  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  taskInput.value = '';
  fetchTasks();
};

const toggleComplete = async (id, completed) => {
  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  });
  fetchTasks();
};

const deleteTask = async (id) => {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchTasks();
};

taskForm.addEventListener('submit', addTask);
document.addEventListener('DOMContentLoaded', fetchTasks);
