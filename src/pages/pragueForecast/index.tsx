import { useState, useEffect, useMemo } from 'react';
import styles from './styles.module.scss';
import { CityHeader } from './components/cityHeader';
import { CurrentWeather } from './components/currentWeather';
import { WeatherDetails } from './components/weatherDetails';
import { ChartTickItem, ForecastChart } from './components/forecastChart';
import { useForecast } from '../../hooks/useForecast';
import { getWeatherImage } from '../../utils';
import { Loading } from '../../components/loading';

export const PragueForecast = () => {
  const {data: forecast, isLoading} = useForecast({q: 'Prague'})
  const [selectedHour, setSelectedHour] = useState<number | null>(null)

  const forecastData = useMemo(() => {
    if(!forecast) return null
    const entries = Object.entries(forecast);
    if (entries.length === 0) return null;

    const data = entries.reduce((acc, [hour, data]) => {
      const temp = data.temperature;
      return {
        temperatures: [...acc.temperatures, temp],
        hourlyTemperature: [...acc.hourlyTemperature, {
          hour: `${hour.padStart(2, '0')}:00`,
          temp: Math.round(temp),
          hourNum: parseInt(hour)
        }],
        minTemp: data.minTemp < acc.minTemp ? data.minTemp : acc.minTemp,
        maxTemp: data.maxTemp > acc.maxTemp ? data.maxTemp : acc.maxTemp
      };
    }, {
      temperatures: [] as number[],
      hourlyTemperature: [] as Array<{hour: string, temp: number, hourNum: number}>,
      minTemp: Infinity,
      maxTemp: -Infinity
    });

    const currentConditions = selectedHour !== null && forecast[selectedHour] 
      ? forecast[selectedHour] 
      : entries[0]?.[1]

    return {...data, currentConditions}
  }, [forecast, selectedHour]);

  useEffect(() => {
    if (forecast) {
      setSelectedHour(null)
    }
  }, [forecast])

  if (isLoading) {
    return <Loading data-testid="loading" />;
  }

  if (!forecast) {
    return <div>No forecast data available</div>;
  }

  if (!forecastData) {
    return <div>No forecast data available</div>;
  }

  const { hourlyTemperature, minTemp, maxTemp, currentConditions } = forecastData;

  const handleXAxisClick = (data: ChartTickItem) => {
    if (data?.value) {
      const hour = parseInt(data.value.split(':')[0] || '')
      if (!isNaN(hour)) {
        setSelectedHour(hour)
      }
    }
  }

  const handleChartClick = (nextState: any) => {
    const data = nextState.chartX !== undefined 
        ? {
            chartX: nextState.chartX,
            activePayload: nextState.activePayload || []
          } 
        : null;

    if (data && data.activePayload && data.activePayload[0]) {
        setSelectedHour(data.activePayload[0].payload.hourNum);
    }
  };

  if (!currentConditions) {
    return <div>No current weather data available</div>;
  }

  return (
    <div 
      className={styles.forecast_container}
      style={{ backgroundImage: currentConditions.weather ? `url(${getWeatherImage(currentConditions.weather.type)})` : undefined }}
    >
      <div className={styles.forecast_card}>
        <div className={styles.card_content}>
          <CityHeader date={currentConditions.date} />
          
          <CurrentWeather 
            temperature={currentConditions.temperature}
            weather={currentConditions.weather}
          />

          <WeatherDetails
            minTemp={minTemp}
            maxTemp={maxTemp}
            humidity={currentConditions.humidity}
            pressure={currentConditions.pressure}
          />

          <ForecastChart
            hourlyTemperature={hourlyTemperature}
            onChartClick={handleChartClick}
            onXAxisClick={handleXAxisClick}
          />
        </div>
      </div>
    </div>
  );
};