import styles from './EmptyState.module.css';

export function EmptyState({ message }) {
  const div = document.createElement('div');
  div.className = styles.emptyState;
  div.textContent = message;
  return div;
}