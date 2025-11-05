import styles from './TodoItem.module.css';

export function TodoItem({ task, onToggle, onDelete }) {
  const div = document.createElement('div');
  div.className = styles.item + (task.completed ? ` ${styles.completed}` : '');
  
  // Семантическая роль для скринридеров
  div.setAttribute('role', 'listitem');

  // Создаём чекбокс
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = styles.checkbox;
  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', `Отметить как ${task.completed ? 'невыполненную' : 'выполненную'}: ${task.text}`);
  checkbox.onclick = () => onToggle(task.id);

  // Создаём текст задачи
  const textSpan = document.createElement('span');
  textSpan.className = styles.text;
  textSpan.textContent = task.text;

  // Создаём кнопку удаления
  const deleteBtn = document.createElement('button');
  deleteBtn.className = styles.deleteButton;
  deleteBtn.textContent = '×';
  deleteBtn.setAttribute('aria-label', `Удалить задачу: ${task.text}`);
  deleteBtn.onclick = () => onDelete(task.id);

  // Собираем элемент
  div.appendChild(checkbox);
  div.appendChild(textSpan);
  div.appendChild(deleteBtn);

  return div;
}
