import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface WeatherChartProps {
    hourlyData: Array<{
        time: Date;
        temp: number;
    }>;
}

const formatTime = (date: Date): string => {
    const hours = date.getHours();
    return `${String(hours).padStart(2, '0')}:00`;
};

export const WeatherChart: React.FC<WeatherChartProps> = ({ hourlyData }) => {
    const chartWidth = hourlyData.length * 80;
    const maxTemp = Math.max(...hourlyData.map(item => item.temp));
    const minTemp = Math.min(...hourlyData.map(item => item.temp));

    const data = {
        labels: hourlyData.map(item => formatTime(item.time)),
        datasets: [{
            data: hourlyData.map(item => Math.round(item.temp)),
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            strokeWidth: 2,
        }],
    };

    return (
        <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 10 }}>
            <View style={{ width: chartWidth }}>
                <LineChart
                    data={data}
                    width={chartWidth}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Axis labels
                        propsForDots: {
                            r: '4', // Dot radius
                            strokeWidth: '2',
                            stroke: 'blue',
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                    {hourlyData.map((item, index) => {
                        const segmentWidth = chartWidth / hourlyData.length;
                        const xPosition = index * segmentWidth + segmentWidth / 2;
                        const yPosition = ((maxTemp - item.temp) / (maxTemp - minTemp)) * 180;

                        return (
                            <Text
                                key={index}
                                style={{
                                    position: 'absolute',
                                    left: xPosition - 20,
                                    top: yPosition + 10, // Adjusted to account for chart padding
                                    width: 40,
                                    color: 'black',
                                    fontWeight: 'bold',
                                    fontSize: 12,
                                    textAlign: 'center',
                                }}
                            >
                                {Math.round(item.temp)}°C
                            </Text>
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
};