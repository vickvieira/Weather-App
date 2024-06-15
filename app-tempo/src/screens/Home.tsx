import { View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { DrawerTypes } from '../routes/Drawer';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=-25.4219574&lon=-49.2664899&appid=a4b36c4a3a87e7ab769ae13ab4b529b9&units=metric`;

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

    const [weather, setWeather] = useState()

    const fetchWeather = async () =>  {
        console.log("Fetch data");
        const results = await fetch(url);
        const data = await results.json();
        console.log(JSON.stringify(data, null, 2));
        setWeather(data);

    }

    useEffect(() => { //para fazer o fetch dos dados da api assim que o componente for rodado
        fetchWeather();
    }, [])

    if (!weather) {
        return <ActivityIndicator/>;
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