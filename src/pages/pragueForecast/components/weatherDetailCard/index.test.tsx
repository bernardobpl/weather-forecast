import { render, screen } from '@testing-library/react';
import { WeatherDetailCard } from './index';
import { Thermometer } from 'lucide-react';

describe('WeatherDetailCard', () => {
  const mockProps = {
    Icon: Thermometer,
    label: 'Temperature',
    value: '20°C',
    iconClassName: 'test-class',
  };

  it('renders the label correctly', () => {
    render(<WeatherDetailCard {...mockProps} />);
    expect(screen.getByText(mockProps.label)).toBeInTheDocument();
  });

  it('renders the value correctly', () => {
    render(<WeatherDetailCard {...mockProps} />);
    expect(screen.getByText(mockProps.value)).toBeInTheDocument();
  });

  it('renders the icon with correct className', () => {
    render(<WeatherDetailCard {...mockProps} />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveClass(mockProps.iconClassName);
  });

  it('renders without iconClassName when not provided', () => {
    const propsWithoutClassName = {
      Icon: Thermometer,
      label: 'Temperature',
      value: '20°C',
    };
    render(<WeatherDetailCard {...propsWithoutClassName} />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('detail_icon');
    expect(icon).not.toHaveClass('undefined');
  });
});
