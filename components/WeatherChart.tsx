import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface WeatherChartProps {
    hourlyData: Array<{
        time: Date;
        temp: number;
    }>;
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ hourlyData }) => {
    const data = {
        labels: hourlyData.map(item => item.time.getHours() + 'h'),
        datasets: [{
            data: hourlyData.map(item => Math.round(item.temp))
        }]
    };

    return (
        <LineChart
            data={data}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                }
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
        />
    );
};