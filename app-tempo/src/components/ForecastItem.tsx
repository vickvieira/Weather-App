import { View, Text, StyleSheet } from "react-native";
import { WeatherForecast } from "../screens/Home";
import dayjs from "dayjs";
import { BlurView } from 'expo-blur';

const ForecastItem = ({forecast}: {forecast:WeatherForecast}) => {
    return (
        <BlurView intensity={30} style={styles.container}>
            <Text style={styles.temperature}>
                {Math.round(forecast.main.temp)}°
            </Text>
            <Text style={styles.date}>{dayjs(forecast.dt * 1000).format('ddd h a')}</Text>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        aspectRatio: 3 / 4,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderColor: 'gainsboro',
        borderWidth: StyleSheet.hairlineWidth,

    },
    temperature: {
        fontStyle: 'italic',
        fontSize: 35,
        color: 'white',
        marginVertical: 10,
    },
    date: {
        fontWeight: 'bold', 
        fontSize: 16,
    }

})
export default ForecastItem;