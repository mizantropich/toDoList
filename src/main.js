import { getTasks, addTask, toggleTask, deleteTask, getActiveCount, getFilteredTasks } from './store.js';
import { TodoItem } from './components/TodoItem/TodoItem.js';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm.js';
import { TodoStats } from './components/TodoStats/TodoStats.js';
import { TodoFilters } from './components/TodoFilters/TodoFilters.js';

const app = document.getElementById('todo-app');

// Состояние текущего фильтра
let currentFilter = 'all';

function renderList() {
  app.innerHTML = '';
  
  const allTasks = getTasks();
  const filteredTasks = getFilteredTasks(currentFilter);
  const activeCount = getActiveCount();
  
  // Форма добавления
  app.appendChild(
    AddTodoForm({
      onAdd: taskText => {
        addTask(taskText);
        renderList();
      }
    })
  );
  
  // Счётчик задач (показываем всегда общую статистику)
  if (allTasks.length > 0) {
    app.appendChild(
      TodoStats({
        activeCount,
        totalCount: allTasks.length
      })
    );
  }
  
  // Фильтры (показываем только если есть задачи)
  if (allTasks.length > 0) {
    app.appendChild(
      TodoFilters({
        currentFilter,
        onFilterChange: filter => {
          currentFilter = filter;
          renderList();
        }
      })
    );
  }
  
  // Список задач (отфильтрованных)
  filteredTasks.forEach(task => {
    app.appendChild(
      TodoItem({
        task,
        onToggle: id => {
          toggleTask(id);
          renderList();
        },
        onDelete: id => {
          deleteTask(id);
          renderList();
        }
      })
    );
  });
  
  // Сообщение если нет задач после фильтрации
  if (filteredTasks.length === 0 && allTasks.length > 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = currentFilter === 'active' 
      ? '✅ Все задачи выполнены!' 
      : '📝 Нет выполненных задач';
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.color = '#999';
    emptyMsg.style.marginTop = '20px';
    app.appendChild(emptyMsg);
  }
  
  // Сообщение если совсем нет задач
  if (allTasks.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = '📝 Нет задач. Добавьте первую!';
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.color = '#999';
    emptyMsg.style.marginTop = '20px';
    app.appendChild(emptyMsg);
  }
}

renderList();
