import { Droplets, Thermometer, Gauge } from 'lucide-react';
import styles from './styles.module.scss';
import { WeatherDetailCard } from '../weatherDetailCard';

interface WeatherDetailsProps {
  minTemp: number;
  maxTemp: number;
  humidity: number;
  pressure: number;
}

export const WeatherDetails = ({ 
  minTemp, 
  maxTemp, 
  humidity, 
  pressure 
}: WeatherDetailsProps) => {
  return (
    <div className={styles.weather_details} data-testid="weather-details">
      <WeatherDetailCard
        Icon={Thermometer}
        label="Min Temperature"
        value={`${Math.round(minTemp)}°C`}
        iconClassName={styles.min_temp}
      />
      <WeatherDetailCard
        Icon={Thermometer}
        label="Max Temperature"
        value={`${Math.round(maxTemp)}°C`}
        iconClassName={styles.max_temp}
      />
      <WeatherDetailCard
        Icon={Droplets}
        label="Humidity"
        value={`${humidity}%`}
        iconClassName={styles.humidity}
      />
      <WeatherDetailCard
        Icon={Gauge}
        label="Pressure"
        value={`${pressure} hPa`}
        iconClassName={styles.pressure}
      />
    </div>
  );
};
