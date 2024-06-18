import { View, Text, StyleSheet } from "react-native";
import { MainWeather } from "../constants/WeatherTypes";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { BlurView } from 'expo-blur';
dayjs.locale('pt-br');

interface AdditionalInfoProps {
    additional: MainWeather;
};

  const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ additional }) => {
    return (
        <BlurView intensity={30} style={styles.container}>
          <Text style={styles.infoText}>Sensação Térmica: {Math.round(additional.feels_like)}°C</Text>
        <Text style={styles.infoText}>Humidade: {additional.humidity}%</Text>
        <Text style={styles.infoText}>Pressão: {additional.pressure}mbar</Text>
        </BlurView>
      );
    };
    
    const styles = StyleSheet.create({
    
      container: {
        padding: 10,
        borderRadius: 10,
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        overflow: 'hidden',
        borderColor: 'gainsboro',
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        marginBottom: 20,
        
      },
      temperature: {
        fontStyle: 'italic',
        fontSize: 35,
        color: 'white',
        marginVertical: 10,
      },
      infoText: {
        color: '#bec4c1',
        fontSize: 20,
        marginTop: 5,
      },
    });
    
    export default AdditionalInfo;