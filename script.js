const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value;
  const taskTime = taskDate.value;
  if (taskText.trim()) {
    addTask(taskText, taskTime);
    form.reset();
  }
});

function addTask(text, time) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.innerHTML = `
    <span>${text} ${time ? `<small>(${new Date(time).toLocaleString()})</small>` : ''}</span>
    <div class="task-actions">
      <button onclick="markDone(this)">✅</button>
      <button onclick="editTask(this)">✏️</button>
      <button onclick="deleteTask(this)">🗑️</button>
    </div>
  `;
  taskList.appendChild(li);
}

function markDone(btn) {
  const item = btn.closest('li');
  item.classList.toggle('completed');
}

function editTask(btn) {
  const item = btn.closest('li');
  const span = item.querySelector('span');
  const newText = prompt("Edit your task:", span.textContent);
  if (newText !== null && newText.trim()) {
    span.innerHTML = newText;
  }
}

function deleteTask(btn) {
  const item = btn.closest('li');
  item.remove();
}
