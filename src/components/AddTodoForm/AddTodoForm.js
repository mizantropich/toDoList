import styles from './AddTodoForm.module.css';

export function AddTodoForm({ onAdd }) {
  const form = document.createElement('form');
  form.className = styles.form;
  form.setAttribute('aria-label', 'Форма добавления новой задачи');

  // Создаём label (скрытый, но доступен для скринридеров)
  const label = document.createElement('label');
  label.htmlFor = 'todo-input';
  label.className = styles.label; // Скрытый класс
  label.textContent = 'Введите новую задачу';

  // Создаём инпут
  const input = document.createElement('input');
  input.id = 'todo-input';
  input.type = 'text';
  input.className = styles.input;
  input.placeholder = 'Новая задача...';
  input.required = true;
  input.setAttribute('aria-required', 'true');
  input.setAttribute('aria-describedby', 'todo-help');

  // Текст помощи (скрытый, но доступен)
  const helpText = document.createElement('small');
  helpText.id = 'todo-help';
  helpText.className = styles.helpText;
  helpText.textContent = 'Введите текст и нажмите "Добавить" или Enter';

  // Создаём кнопку
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = styles.button;
  button.textContent = 'Добавить';
  button.setAttribute('aria-label', 'Добавить новую задачу');

  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(helpText);
  form.appendChild(button);

  form.onsubmit = e => {
    e.preventDefault();
    const value = input.value.trim();
    if (value) {
      onAdd(value);
      input.value = '';
      input.focus();
      
      // Уведомляем скринридеры об успешном добавлении
      announceToScreenReader('Задача добавлена');
    }
  };

  return form;
}

// Вспомогательная функция для уведомления скринридеров
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only'; // Скрытый, но доступен
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => announcement.remove(), 1000);
}
