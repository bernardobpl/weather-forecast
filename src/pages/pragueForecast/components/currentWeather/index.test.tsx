import { render, screen } from '@testing-library/react';
import { CurrentWeather } from './index';

describe('CurrentWeather', () => {
  const mockProps = {
    temperature: 20.5,
    weather: {
      icon: 'test-icon-url',
      description: 'Sunny',
    },
  };

  it('renders weather icon with correct src and alt text', () => {
    render(<CurrentWeather {...mockProps} />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', mockProps.weather.icon);
    expect(icon).toHaveAttribute('alt', mockProps.weather.description);
  });

  it('displays rounded temperature with celsius symbol', () => {
    render(<CurrentWeather {...mockProps} />);
    expect(screen.getByText('21°C')).toBeInTheDocument();
  });

  it('displays weather description', () => {
    render(<CurrentWeather {...mockProps} />);
    expect(screen.getByText(mockProps.weather.description)).toBeInTheDocument();
  });
});
