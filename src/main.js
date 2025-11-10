import { 
  getTasks, 
  addTask, 
  toggleTask, 
  deleteTask, 
  getActiveCount, 
  getFilteredTasks 
} from './store.js';
import { TodoItem } from './components/TodoItem/TodoItem.js';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm.js';
import { TodoStats } from './components/TodoStats/TodoStats.js';
import { TodoFilters } from './components/TodoFilters/TodoFilters.js';
import { EmptyState } from './components/EmptyState/EmptyState.js';

const app = document.getElementById('todo-app');
let currentFilter = 'all';

// Контейнеры для разных частей UI
let formContainer = null;
let statsContainer = null;
let filtersContainer = null;
let listContainer = null;
let actionsContainer = null;

// Инициализация - рендерим статические части один раз
function init() {
  app.innerHTML = '';
  
  // Форма (статическая, рендерится один раз)
  formContainer = document.createElement('div');
  formContainer.appendChild(
    AddTodoForm({
      onAdd: taskText => {
        addTask(taskText);
        update(); // Обновляем только динамические части
      }
    })
  );
  app.appendChild(formContainer);
  
  // Контейнер для статистики
  statsContainer = document.createElement('div');
  app.appendChild(statsContainer);
  
  // Контейнер для фильтров
  filtersContainer = document.createElement('div');
  app.appendChild(filtersContainer);
  
  // Контейнер для списка задач
  listContainer = document.createElement('div');
  app.appendChild(listContainer);
  
  // Контейнер для действий (кнопки внизу)
  actionsContainer = document.createElement('div');
  app.appendChild(actionsContainer);
  
  // Первое обновление
  update();
}

// Обновление только динамических частей
function update() {
  const allTasks = getTasks();
  const filteredTasks = getFilteredTasks(currentFilter);
  const activeCount = getActiveCount();
  
  updateStats(allTasks, activeCount);
  updateFilters(allTasks);
  updateList(filteredTasks);
}

// Обновление статистики
function updateStats(allTasks, activeCount) {
  statsContainer.innerHTML = '';
  
  if (allTasks.length > 0) {
    statsContainer.appendChild(
      TodoStats({
        activeCount,
        totalCount: allTasks.length
      })
    );
  }
}

// Обновление фильтров
function updateFilters(allTasks) {
  filtersContainer.innerHTML = '';
  
  if (allTasks.length > 0) {
    filtersContainer.appendChild(
      TodoFilters({
        currentFilter,
        onFilterChange: filter => {
          currentFilter = filter;
          update(); // Обновляем только список
        }
      })
    );
  }
}

// Обновление списка задач
function updateList(filteredTasks) {
  listContainer.innerHTML = '';
  
  const allTasks = getTasks();
  const emptyComponent = renderEmptyState(allTasks, filteredTasks, currentFilter);
  
  // Если есть задачи для отображения — показываем их
  if (filteredTasks.length > 0) {
    filteredTasks.forEach(task => {
      listContainer.appendChild(
        TodoItem({
          task,
          onToggle: id => {
            toggleTask(id);
            update();
          },
          onDelete: id => {
            deleteTask(id);
            update();
          }
        })
      );
    });
  }
  // Иначе показываем сообщение о пустом состоянии
  else if (emptyComponent) {
    listContainer.appendChild(emptyComponent);
  }
}

// Фабрика для создания сообщения о пустом состоянии
function getEmptyStateMessage(allTasks, filteredTasks, currentFilter) {
  // Если нет задач вообще
  if (allTasks.length === 0) {
    return '📝 Нет задач. Добавьте первую!';
  }
  
  // Если есть задачи, но все отфильтрованы
  if (filteredTasks.length === 0) {
    switch (currentFilter) {
      case 'active':
        return '✅ Все задачи выполнены!';
      case 'completed':
        return '📝 Нет выполненных задач';
      default:
        return '📝 Нет задач';
    }
  }
  
  return null; // Нет пустого состояния
}

// Функция для рендера пустого состояния (если нужно)
function renderEmptyState(allTasks, filteredTasks, currentFilter) {
  const message = getEmptyStateMessage(allTasks, filteredTasks, currentFilter);
  
  if (message) {
    return EmptyState({ message });
  }
  
  return null;
}

// Запуск приложения
init();
