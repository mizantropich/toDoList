const LOCAL_KEY = "todo-tasks-data";

function saveToLocal(tasks) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks));
}

function loadFromLocal() {
  const data = localStorage.getItem(LOCAL_KEY);
  return data ? JSON.parse(data) : [
    { id: 1, text: "Изучить модульный CSS", completed: false },
    { id: 2, text: "Создать компоненты", completed: false }
  ];
}

let tasks = loadFromLocal();

// Сортировка: незавершённые задачи сверху, завершённые внизу
function sortTasks(tasksArray) {
  return [...tasksArray].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1; // completed идут вниз
  });
}

export function getTasks() {
  return sortTasks(tasks);
}

export function addTask(text) {
  const newTask = {
    id: Date.now(),
    text: text.trim(),
    completed: false
  };
  tasks.push(newTask);
  saveToLocal(tasks);
  return newTask;
}

export function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveToLocal(tasks);
}

export function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveToLocal(tasks);
}

// Получить количество активных задач
export function getActiveCount() {
  return tasks.filter(t => !t.completed).length;
}

export function getFilteredTasks(filter = 'all') {
  const sorted = sortTasks(tasks);
  
  switch(filter) {
    case 'active':
      return sorted.filter(t => !t.completed);
    case 'completed':
      return sorted.filter(t => t.completed);
    default:
      return sorted;
  }
}