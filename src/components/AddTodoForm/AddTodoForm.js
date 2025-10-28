import styles from './AddTodoForm.module.css';

export function AddTodoForm({ onAdd }) {
  const form = document.createElement('form');
  form.className = styles.form;
  form.innerHTML = `
    <input type="text" class="${styles.input}" placeholder="Новая задача..." required>
    <button type="submit" class="${styles.button}">Добавить</button>
  `;

  form.onsubmit = e => {
    e.preventDefault();
    const input = form.querySelector('input');
    const value = input.value.trim();
    if (value) {
      onAdd(value);
      input.value = '';
    }
  };

  return form;
}
