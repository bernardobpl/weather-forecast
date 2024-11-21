import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CategoricalChartFunc } from 'recharts/types/chart/generateCategoricalChart';
import styles from './styles.module.scss';

export interface ChartTickItem {
  coordinate: number;
  index: number;
  isShow: boolean;
  offset: number;
  tickCoord: number;
  value: string;
}

interface ForecastChart {
  hourlyTemperature: Array<{hour: string; temp: number; hourNum: number}>;
  onChartClick: CategoricalChartFunc;
  onXAxisClick: (data: ChartTickItem) => void;
}

export const ForecastChart = ({ 
  hourlyTemperature, 
  onChartClick, 
  onXAxisClick 
}: ForecastChart) => {
  return (
    <div className={styles.hourly_forecast} data-testid="forecast-chart">
      <h3>Hourly Temperature</h3>
      <div className={styles.chart_container}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={hourlyTemperature}
            onClick={onChartClick}
          >
            <XAxis 
              dataKey="hour" 
              tickFormatter={(value) => value.split(':')[0]}
              stroke="#9ca3af"
              className={styles.cursor_pointer}
              onClick={onXAxisClick}
            />
            <YAxis 
              domain={['dataMin - 1', 'dataMax + 1']}
              stroke="#9ca3af"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(17, 24, 39, 0.8)',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#fff'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#60a5fa" 
              strokeWidth={2}
              dot={true}
              activeDot={{ r: 8 }}
              className={styles.cursor_pointer}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
