import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Drawer, { DrawerTypes } from "../routes/Drawer";
import * as Location from "expo-location";
import { FlatList } from "react-native-gesture-handler";
import ForecastItem from "../components/ForecastItem";
import LottieView from "lottie-react-native";

const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const OPEN_WEATHER_KEY = `a4b36c4a3a87e7ab769ae13ab4b529b9`;
const bgImage = `https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg`;

type MainWeather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};
type Weather = {
  main: MainWeather;
  name: string;
  weather: [
    {
      id: string;
      main: string;
      description: string;
      icon: string;
    }
  ];
};

export type WeatherForecast = {
  main: MainWeather;
  dt: number;
};

const Home = () => {
  const navigation = useNavigation<DrawerTypes>();
  const [weather, setWeather] = useState<Weather>();
  const [errorMsg, setErrorMsg] = useState("");
  const [location, setLocation] = useState<Location.LocationObject>();
  const [forecast, setForecast] = useState<WeatherForecast[]>();

  useEffect(() => {
    if (location) {
      fetchWeather();
      fetchForecast();
    }
  }, [location]); //faz o fetch apenas quando a localização muda

  useEffect(() => {
    //para pegar a localização do dispositivo do usuário
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
    if (!location) {
      return;
    }
    // console.log("Fetch data");
    const results = await fetch(
      `${BASE_URL}/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`
    );
    const data = await results.json();
    console.log(JSON.stringify(data, null, 2));
    setWeather(data);
  };

  const fetchForecast = async () => {
    if (!location) {
      return;
    }
    const numberOfDays = 5;
    const results = await fetch(
      `${BASE_URL}/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`
    );
    const data = await results.json();
    // console.log(JSON.stringify(data, null, 2));
    setForecast(data.list);
  };

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LottieView
          source={
            weather.weather[0].main == "Rain"
              ? require("../../assets/lottie/rain.json")
              : require("../../assets/lottie/sunny.json")
          }
          style={{
            width: 200,
            aspectRatio: 1,
          }}
          loop
          autoPlay
        />
        <Text style={styles.location}>{weather.name}</Text>
        <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
        <Text style={styles.location}>{weather.weather[0].main}</Text>
      </View>
      <FlatList
        data={forecast}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          flexGrow: 0,
          height: 150,
          marginBottom: 40,
        }}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 10,
        }}
        renderItem={({ item }) => <ForecastItem forecast={item} />}
      />
    </ImageBackground>
  );
};

{
  /* //   {/* <Button title="Detalhes" onPress={() => {
//             navigation.navigate("Detalhes")
//         }} ></Button> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    fontSize: 30,
    color: "lightgray",
  },
  temp: {
    fontSize: 90,
    color: "snow",
  },
});
export default Home;
