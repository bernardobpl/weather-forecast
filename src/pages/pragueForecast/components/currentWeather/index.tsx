import styles from './styles.module.scss';

interface CurrentWeatherProps {
  temperature: number;
  weather: {
    icon: string;
    description: string;
  };
}

export const CurrentWeather = ({ temperature, weather }: CurrentWeatherProps) => {
  return (
    <div className={styles.current_weather} data-testid="current-weather">
      <img 
        src={weather.icon} 
        alt={weather.description} 
      />
      <div>
        <p className={styles.temperature}>{Math.round(temperature)}°C</p>
        <p className={styles.weather_type}>{weather.description}</p>
      </div>
    </div>
  );
};
