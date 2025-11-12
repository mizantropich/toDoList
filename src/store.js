const LOCAL_KEY = "todo-tasks-data";

// Генерируем уникальный ID через счётчик + текущее время
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

// Безопасное сохранение в localStorage с обработкой ошибок
function saveToLocal(tasks) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Ошибка при сохранении в localStorage:', error);
    // Если localStorage переполнен или недоступен — хотя бы не крашимся
  }
}

// Безопасная загрузка из localStorage
function loadFromLocal() {
  try {
    const data = localStorage.getItem(LOCAL_KEY);
    // Если данных нет — возвращаем пустой массив, не хардкод
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    // Проверяем, что это массив
    if (!Array.isArray(parsed)) return [];
    
    return parsed;
  } catch (error) {
    console.error('Ошибка при загрузке из localStorage:', error);
    // Fallback: пустой массив, не краш приложения
    return [];
  }
}

let tasks = loadFromLocal();

// Сортировка: незавершённые сверху, завершённые внизу
function sortTasks(tasksArray) {
  return [...tasksArray].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });
}

// Валидация: проверяем, что объект — валидная задача
function isValidTask(task) {
  return (
    task &&
    typeof task === 'object' &&
    typeof task.id !== 'undefined' &&
    typeof task.text === 'string' &&
    typeof task.completed === 'boolean'
  );
}

export function getTasks() {
  return sortTasks(tasks);
}

export function addTask(text) {
  // Валидация: текст не должен быть пустым
  if (typeof text !== 'string' || !text.trim()) {
    console.warn('Попытка добавить пустую задачу');
    return null;
  }

  const newTask = {
    id: generateId(),
    text: text.trim(),
    completed: false
  };
  
  tasks.push(newTask);
  saveToLocal(tasks);
  return newTask;
}

export function toggleTask(id) {
  // Валидация: проверяем, что задача существует
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    console.warn(`Задача с id ${id} не найдена`);
    return false;
  }
  
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  saveToLocal(tasks);
  return true;
}

export function deleteTask(id) {
  // Валидация: проверяем, что задача существует
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  
  if (tasks.length === initialLength) {
    console.warn(`Задача с id ${id} не найдена`);
    return false;
  }
  
  saveToLocal(tasks);
  return true;
}

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
