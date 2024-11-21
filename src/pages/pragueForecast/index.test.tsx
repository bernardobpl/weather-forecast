import { QueryClient } from '@tanstack/react-query';
import { fireEvent, render } from '@testing-library/react';
import { testWrapper } from '../../test/utils';
import { PragueForecast } from './index';
import * as utils from '../../utils';

jest.mock('../../hooks/useForecast', () => ({
  useForecast: jest.fn(() => ({
    data: mockForecastData,
    isLoading: false,
    error: null
  }))
}));

jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

jest.spyOn(utils, 'getWeatherImage').mockReturnValue('mocked-image-path')

const mockForecastData = {
  0: {
    temperature: 20,
    minTemp: 18.2,
    maxTemp: 22.8,
    humidity: 65,
    weather: {
      type: "Clear",
      description: "clear sky",
      icon: "icon-img-url"
    },
    pressure: 101.3,
    feelsLike: 19.8,
    date: "2024-02-10 00:00:00"
  },
  3: {
    temperature: 21.5,
    minTemp: 19.2,
    maxTemp: 23.8,
    humidity: 68,
    weather: {
      type: "Clouds",
      description: "few clouds",
      icon: "icon-img-url"
    },
    pressure: 101.5,
    feelsLike: 20.8,
    date: "2024-02-10 03:00:00"
  },
  6: {
    temperature: 22.5,
    minTemp: 20.2,
    maxTemp: 24.8,
    humidity: 70,
    weather: {
      type: "Clouds",
      description: "scattered clouds",
      icon: "icon-img-url"
    },
    pressure: 101.6,
    feelsLike: 21.8,
    date: "2024-02-10 06:00:00"
  },
  9: {
    temperature: 23.5,
    minTemp: 21.2,
    maxTemp: 25.8,
    humidity: 72,
    weather: {
      type: "Clear",
      description: "clear sky",
      icon: "icon-img-url"
    },
    pressure: 101.7,
    feelsLike: 22.8,
    date: "2024-02-10 09:00:00"
  }
};

describe('PragueForecast', () => {
  const queryClient = new QueryClient();

  it('renders the component and its elements', async () => {
    const { container } = render(<PragueForecast />, { wrapper: testWrapper(queryClient) });

    expect(container.querySelector('[data-testid="city-header"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="current-weather"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="weather-details"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="forecast-chart"]')).toBeInTheDocument();
  });

  it('finds data from currentWeather in the page', async () => {
    const { getByText, getAllByText } = render(<PragueForecast />, { wrapper: testWrapper(queryClient) });
    const currentWeather = mockForecastData[0]
    expect(getAllByText(`${Math.round(currentWeather.temperature)}°C`).length).toBeGreaterThan(0);
    expect(getByText(currentWeather.weather.description)).toBeInTheDocument();
    expect(getByText(`${Math.round(25.8)}°C`)).toBeInTheDocument();
    expect(getByText(`${Math.round(18.2)}°C`)).toBeInTheDocument();
    expect(getByText(`${currentWeather.pressure} hPa`)).toBeInTheDocument();
  });

  it('changes currentWeather data when selectedHour changes', async () => {
    const { getByText, getAllByText } = render(<PragueForecast />, { wrapper: testWrapper(queryClient) });
    const hour = getByText('09')
    expect(hour).toBeInTheDocument()
    fireEvent.click(hour)
    const currentWeather = mockForecastData[9]
    expect(getAllByText(`${Math.round(currentWeather.temperature)}°C`).length).toBeGreaterThan(0);
    expect(getByText(currentWeather.weather.description)).toBeInTheDocument();
    expect(getByText(`${Math.round(25.8)}°C`)).toBeInTheDocument();
    expect(getByText(`${Math.round(18.2)}°C`)).toBeInTheDocument();
    expect(getByText(`${currentWeather.pressure} hPa`)).toBeInTheDocument();
  });
});