import { render, screen } from '@testing-library/react';
import { CityHeader } from './index';

describe('CityHeader', () => {
  const mockDate = '2024-01-20';

  it('renders the city name correctly', () => {
    render(<CityHeader date={mockDate} />);
    expect(screen.getByText('Prague Tomorrow')).toBeInTheDocument();
  });

  it('formats and displays the date correctly', () => {
    render(<CityHeader date={mockDate} />);
    const formattedDate = new Date(mockDate).toLocaleDateString();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
