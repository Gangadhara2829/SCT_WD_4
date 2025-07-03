const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');
const toggleDark = document.getElementById('toggle-dark');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const search = searchInput.value.toLowerCase();
  const filter = filterSelect.value;
  taskList.innerHTML = '';

  tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search);
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);
    return matchesSearch && matchesFilter;
  }).forEach(task => {
    const li = document.createElement('li');
    li.className = `task ${task.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <div>
        <strong>${task.title}</strong>
        <small>${task.due || ''} - ${task.category}</small>
      </div>
      <div>
        <button onclick="toggleStatus('${task.id}')">✔</button>
        <button onclick="editTask('${task.id}')">✏️</button>
        <button onclick="deleteTask('${task.id}')">❌</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskForm.onsubmit = (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const due = document.getElementById('due').value;
  const category = document.getElementById('category').value;
  const newTask = {
    id: Date.now().toString(),
    title,
    due,
    category,
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskForm.reset();
};

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

function toggleStatus(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    document.getElementById('title').value = task.title;
    document.getElementById('due').value = task.due;
    document.getElementById('category').value = task.category;
    deleteTask(id);
  }
}

searchInput.oninput = renderTasks;
filterSelect.onchange = renderTasks;
toggleDark.onclick = () => {
  document.body.classList.toggle('dark-mode');
};

renderTasks();
