import styles from './TodoStats.module.css';

export function TodoStats({ activeCount, totalCount }) {
  const completedCount = totalCount - activeCount;
  
  const div = document.createElement('div');
  div.className = styles.stats;
  div.innerHTML = `
    <span class="${styles.counter}">
      Осталось: <strong>${activeCount}</strong>
    </span>
    <span class="${styles.info}">
      Выполнено: ${completedCount} из ${totalCount}
    </span>
  `;
  
  return div;
}
