import styles from './styles.module.scss';

interface CityHeaderProps {
  date: string;
}

export const CityHeader = ({ date }: CityHeaderProps) => {
  return (
    <div className={styles.header} data-testid="city-header">
      <div className={styles.city_info}>
        <h2>Prague Tomorrow</h2>
        <p>{new Date(date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};
