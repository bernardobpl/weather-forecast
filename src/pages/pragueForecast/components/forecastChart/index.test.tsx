import { render, screen, fireEvent } from '@testing-library/react';
import { ForecastChart } from './index';

jest.mock('recharts', () => ({
  Line: () => null,
  LineChart: ({ children, onClick }: any) => (
    <div data-testid="line-chart" onClick={onClick}>
      {children}
    </div>
  ),
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  Tooltip: () => null,
  XAxis: ({ onClick }: any) => <div data-testid="x-axis" onClick={onClick} />,
  YAxis: () => null,
}));

describe('ForecastChart', () => {
  const mockHourlyTemperature = [
    { hour: '12:00', temp: 20, hourNum: 12 },
    { hour: '13:00', temp: 22, hourNum: 13 },
    { hour: '14:00', temp: 21, hourNum: 14 },
  ];

  const mockHandlers = {
    onChartClick: jest.fn(),
    onXAxisClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the chart title', () => {
    render(
      <ForecastChart
        hourlyTemperature={mockHourlyTemperature}
        {...mockHandlers}
      />
    );
    expect(screen.getByText('Hourly Temperature')).toBeInTheDocument();
  });

  it('calls onChartClick when chart is clicked', () => {
    render(
      <ForecastChart
        hourlyTemperature={mockHourlyTemperature}
        {...mockHandlers}
      />
    );
    
    const chart = screen.getByTestId('line-chart');
    fireEvent.click(chart);
    expect(mockHandlers.onChartClick).toHaveBeenCalled();
  });

  it('calls onXAxisClick when x-axis is clicked', () => {
    render(
      <ForecastChart
        hourlyTemperature={mockHourlyTemperature}
        {...mockHandlers}
      />
    );
    
    const xAxis = screen.getByTestId('x-axis');
    fireEvent.click(xAxis);
    expect(mockHandlers.onXAxisClick).toHaveBeenCalled();
  });
});
