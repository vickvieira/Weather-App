import { View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { DrawerTypes } from '../routes/Drawer';
import * as Location from 'expo-location';


const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
const OPEN_WEATHER_KEY = `a4b36c4a3a87e7ab769ae13ab4b529b9`;

type Weather = {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
};

const Home = () => {
  const navigation = useNavigation<DrawerTypes>();
  const [weather, setWeather] = useState();
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    //para fazer o fetch dos dados da api assim que o componente for rodado
    if (location) {
      fetchWeather();
    }
  }, [location]); //faz o fetch apenas quando a localização muda

  useEffect(() => {
    //para pegar a localização do dispositivo
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("Location: ", location);
      setLocation(location);
    })();
  }, []);

  const fetchWeather = async () => {
    if (!location){
        return;
    }
    console.log("Fetch data");
    const results = await fetch(
      `${BASE_URL}?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`
    );
    const data = await results.json();
    console.log(JSON.stringify(data, null, 2));
    setWeather(data);
  };

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>

      {/* <Button title="Detalhes" onPress={() => {
                navigation.navigate("Detalhes")
            }} ></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    location: {
        fontSize: 30,
    },
    temp: {
        fontSize: 90,
        color: 'gray',
    }
})
export default Home;