import { render, screen } from '@testing-library/react';
import { WeatherDetails } from './index';

describe('WeatherDetails', () => {
  const mockProps = {
    minTemp: 15.6,
    maxTemp: 25.4,
    humidity: 65,
    pressure: 1013,
  };

  it('renders min temperature correctly', () => {
    render(<WeatherDetails {...mockProps} />);
    expect(screen.getByText('Min Temperature')).toBeInTheDocument();
    expect(screen.getByText('16°C')).toBeInTheDocument();
  });

  it('renders max temperature correctly', () => {
    render(<WeatherDetails {...mockProps} />);
    expect(screen.getByText('Max Temperature')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });

  it('renders humidity correctly', () => {
    render(<WeatherDetails {...mockProps} />);
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('renders pressure correctly', () => {
    render(<WeatherDetails {...mockProps} />);
    expect(screen.getByText('Pressure')).toBeInTheDocument();
    expect(screen.getByText('1013 hPa')).toBeInTheDocument();
  });

  it('renders all weather detail cards', () => {
    render(<WeatherDetails {...mockProps} />);
    const detailCards = screen.getAllByRole('img', { hidden: true });
    expect(detailCards).toHaveLength(4);
  });
});
