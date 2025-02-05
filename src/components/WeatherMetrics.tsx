import { WeatherData } from '@/src/types/weather';
import { View, Text, StyleSheet} from 'react-native';
import formatTime from '@/src/utils/dateFormat'


const WeatherMetrics = ({ weather }: { weather: WeatherData }) => {
    return (
        <View style={ styles.box }>
            <View style={styles.section}>
                <Text style={styles.label}>Humidity</Text>
                <Text style={styles.value}>{weather.humidity}%</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Wind Speed</Text>
                <Text style={styles.value}>{Math.round(weather.windSpeed)} km/h</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Sunrise</Text>
                <Text style={styles.value}>{formatTime(weather.sunrise)}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Sunset</Text>
                <Text style={styles.value}>{formatTime(weather.sunset)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    section: {
        width: '50%', // 2 sections per row
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: '#555',
    },
})

export default WeatherMetrics;