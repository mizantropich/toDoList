import { getTasks, addTask, toggleTask, deleteTask } from './store.js';
import { TodoItem } from './components/TodoItem/TodoItem.js';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm.js';

const app = document.getElementById('todo-app');

function renderList() {
  app.innerHTML = '';
  app.appendChild(
    AddTodoForm({
      onAdd: taskText => {
        addTask(taskText);
        renderList();
      }
    })
  );
  getTasks().forEach(task => {
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
}

renderList();
