import { API_ENDPOINTS, getEndpointUrl } from "../endpoints";

export type GetForecastResponseT = {
	list: {
		dt: number;
		main: {
			temp: number;
			temp_min: number;
			temp_max: number;
			humidity: number;
			pressure: number; // 1hPa = 1mbar = 0.1kPa
			feels_like: number;
		};
		weather: {
			main: string;
			description: string;
			icon: string;
		}[];
		dt_txt: string
	}[];
}

export type GetForecastParamsT = {
	q?: string
}

export const getForecast = async (params: GetForecastParamsT = {}): Promise<GetForecastResponseT> => {
  const response = await fetch(getEndpointUrl(API_ENDPOINTS.forecast, params))
  const data: GetForecastResponseT = await response.json()
  return data
}

export const get = {
  getForecast
}