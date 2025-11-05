import styles from './TodoStats.module.css';

export function TodoStats({ activeCount, totalCount }) {
  const completedCount = totalCount - activeCount;
  
  const div = document.createElement('div');
  div.className = styles.stats;

  // Счётчик оставшихся
  const counterSpan = document.createElement('span');
  counterSpan.className = styles.counter;
  counterSpan.textContent = 'Осталось: ';
  
  const strong = document.createElement('strong');
  strong.textContent = activeCount;
  counterSpan.appendChild(strong);

  // Информация о выполненных
  const infoSpan = document.createElement('span');
  infoSpan.className = styles.info;
  infoSpan.textContent = `Выполнено: ${completedCount} из ${totalCount}`;

  div.appendChild(counterSpan);
  div.appendChild(infoSpan);

  return div;
}
