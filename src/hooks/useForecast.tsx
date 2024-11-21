import { useQuery } from "@tanstack/react-query"
import { api } from "../api"
import { GetForecastResponseT } from "../api/forecast/get"
import { DailyWeatherT } from "../types/forecast"
import { getDayAfterTomorrowStartTimestamp, getTomorrowStartTimestamp } from "../utils"

const API_ICON_URL = 'https://openweathermap.org/img/wn'

const processWeatherData = (data: GetForecastResponseT): DailyWeatherT => {
	const startTimestamp = getTomorrowStartTimestamp()
	const endTimestamp = getDayAfterTomorrowStartTimestamp()
	const tomorrowData = data.list.filter(item => item.dt >= startTimestamp && item.dt <= endTimestamp)
	return tomorrowData.reduce((acc, item) => {
		if(!item.weather[0]) return acc
		const hour = item.dt === endTimestamp ? 24 : new Date(item.dt * 1000).getHours()
		acc[hour] = {
			temperature: item.main.temp,
			minTemp: item.main.temp_min,
			maxTemp: item.main.temp_max,
			humidity: item.main.humidity,
			weather: {
				type: item.weather[0].main,
				description: item.weather[0].description,
				icon: `${API_ICON_URL}/${item.weather[0].icon}.png`
			},
			pressure: item.main.pressure/10,
			feelsLike: item.main.feels_like,
			date: item.dt_txt	// time + 3h from timezone
		}
		return acc
	}, {} as DailyWeatherT)
}

type ParamsT = {
	q?: string
}

export const useForecast = (params: ParamsT = {}) => {
	return useQuery({
		queryKey: ['forecast', params],
		queryFn: () => api.forecast.get.getForecast(params),
		select: processWeatherData,
		retry: false,
		throwOnError: true,
	})
}