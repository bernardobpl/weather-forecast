import styles from './styles.module.scss';

export const Loading = () => {
  return (
    <div className={styles.loading_container} data-testid="loading">
      <div className={styles.spinner}></div>
      <p>Loading weather data...</p>
    </div>
  );
};
