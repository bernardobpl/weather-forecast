export type DailyWeatherT = Record<number, ForecastT> // key by hour (0, 3, 6...)

export type ForecastT = {
	temperature: number;
	minTemp: number;
	maxTemp: number;
	humidity: number;
	weather: {
		type: string;
		description: string;
		icon: string
	};
	pressure: number;
	feelsLike: number;
	date: string;
}
