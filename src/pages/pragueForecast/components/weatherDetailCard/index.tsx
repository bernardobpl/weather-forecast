import { LucideIcon } from 'lucide-react';
import styles from './styles.module.scss';

interface WeatherDetailCardProps {
  Icon: LucideIcon;
  label: string;
  value: string;
  iconClassName?: string;
}

export const WeatherDetailCard = ({ 
  Icon, 
  label, 
  value,
  iconClassName 
}: WeatherDetailCardProps) => {
  return (
    <div className={styles.weather_detail_item}>
      <Icon 
        className={`${styles.detail_icon}${iconClassName ? ` ${iconClassName}` : ''}`}
        role="img"
      />
      <div className={styles.detail_info}>
        <p>{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};
