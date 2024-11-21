import Clear from './assets/weatherBackgrounds/clear.avif'
import Clouds from './assets/weatherBackgrounds/clouds.avif'
import Default from './assets/weatherBackgrounds/default.avif'
import Drizzle from './assets/weatherBackgrounds/drizzle.avif'
import Rain from './assets/weatherBackgrounds/rain.avif'
import Snow from './assets/weatherBackgrounds/snow.avif'
import Thunderstorm from './assets/weatherBackgrounds/thunderstorm.avif'

const getWeatherImage = (weatherType: string) => {
  const type = weatherType.toLowerCase();
  
  if (type.includes('thunderstorm')) {
    return Thunderstorm
  }
  
  if (type.includes('drizzle')) {
    return Drizzle
  }
  
  if (type.includes('rain') || type === 'shower') {
    return Rain
  }
  
  if (type.includes('snow') || type.includes('sleet')) {
    return Snow
  }
  
  if (type.includes('clear')) {
    return Clear
  }
  
  if (type.includes('clouds') || type.includes('overcast')) {
    return Clouds
  }
  
  return Default
}

const dateToTimestamp = (date: Date): number => {
  return Math.floor(date.getTime() / 1000);
}

const timestampToDate = (timestamp: number): Date => {
  return new Date(timestamp * 1000);
}

const getTomorrowStartDate = (): Date => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  return tomorrow
}

const getDayAfterTomorrowStartDate = (): Date => {
  const dayAfter = new Date()
  dayAfter.setDate(dayAfter.getDate() + 2)
  dayAfter.setHours(0, 0, 0, 0)
  return dayAfter
}

const getTomorrowStartTimestamp = (): number => {
  return dateToTimestamp(getTomorrowStartDate())
}

const getDayAfterTomorrowStartTimestamp = (): number => {
  return dateToTimestamp(getDayAfterTomorrowStartDate())
}

const wait = async (seconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

export {
  getWeatherImage,
  dateToTimestamp,
  timestampToDate,
  getTomorrowStartDate,
  getDayAfterTomorrowStartDate,
  getTomorrowStartTimestamp,
  getDayAfterTomorrowStartTimestamp,
  wait
}