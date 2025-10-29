import styles from './TodoFilters.module.css';

export function TodoFilters({ currentFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'Все' },
    { id: 'active', label: 'Активные' },
    { id: 'completed', label: 'Выполненные' }
  ];

  const div = document.createElement('div');
  div.className = styles.filters;

  filters.forEach(filter => {
    const button = document.createElement('button');
    button.textContent = filter.label;
    button.className = styles.filterButton;
    
    // Активная кнопка получает дополнительный класс
    if (filter.id === currentFilter) {
      button.classList.add(styles.active);
    }
    
    button.onclick = () => onFilterChange(filter.id);
    div.appendChild(button);
  });

  return div;
}
