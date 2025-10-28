import styles from './TodoItem.module.css';

export function TodoItem({ task, onToggle, onDelete }) {
  const div = document.createElement('div');
  div.className = styles.item + (task.completed ? ` ${styles.completed}` : '');
  div.innerHTML = `
    <input type="checkbox" class="${styles.checkbox}" ${task.completed ? 'checked' : ''}>
    <span class="${styles.text}">${task.text}</span>
    <button class="${styles.deleteButton}">×</button>
  `;
  div.querySelector(`.${styles.checkbox}`).onclick = () => onToggle(task.id);
  div.querySelector(`.${styles.deleteButton}`).onclick = () => onDelete(task.id);
  return div;
}
