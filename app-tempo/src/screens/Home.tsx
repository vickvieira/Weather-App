import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Alert, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Drawer, { DrawerTypes } from "../routes/Drawer";
import * as Location from "expo-location";
import { FlatList } from "react-native-gesture-handler";
import ForecastItem from "../components/ForecastItem";
import LottieView from "lottie-react-native";
import SearchBar from "../components/SearchBar";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios from "axios";
import { BASE_URL, OPEN_WEATHER_KEY, UNSPLASH_ACCESS_KEY } from "../constants/ApiConstants";
import { MainWeather, Weather, WeatherForecast } from "../constants/WeatherTypes";


const Home = () => {
  const navigation = useNavigation<DrawerTypes>();
  const [weather, setWeather] = useState<Weather>();
  const [errorMsg, setErrorMsg] = useState("");
  const [location, setLocation] = useState<Location.LocationObject>();
  const [forecast, setForecast] = useState<WeatherForecast[]>();
  const [city, setCity] = useState<string>("");
  const [bgImage, setBgImage] = useState<string>();
  const [currentLocationImage, setCurrentLocationImage] = useState<string>();

  useEffect(() => {
    if (location) {
      fetchWeather();
      fetchForecast();
    }
  }, [location]); //faz o fetch apenas quando a localização muda

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => { //para pegar a localização do dispositivo do usuário
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});
      console.log("Location: ", location);
      setLocation(location);
    } catch (error) {
      console.error("Error fetching location: ", error);
      setErrorMsg("Error fetching location");
    }
  };

  const fetchWeather = async () => {
    if (!location) {
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
          appid: OPEN_WEATHER_KEY,
          units: "metric",
        },
      });

      setWeather(response.data);
      fetchCurrentLocationImage(response.data.name);
    
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMsg("Error fetching weather data");
    }
  };

  const fetchForecast = async () => {
    if (!location) {
      return;
    }
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
          appid: OPEN_WEATHER_KEY,
          units: "metric",
        },
      });

      setForecast(response.data.list);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      setErrorMsg("Error fetching forecast data");
    }
  };

  const fetchWeatherByCity = async (cityName: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: cityName,
          appid: OPEN_WEATHER_KEY,
          units: "metric",
        },
      });

      setWeather(response.data);
      setBgImage(await fetchPhotoByCity(cityName));

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching weather data:", error.message);
        Alert.alert("Erro", "Erro ao buscar dados de clima");
      } else {
        console.error("Error fetching weather data:", error);
        Alert.alert(
          "Erro",
          "Ocorreu um erro desconhecido ao buscar dados de clima"
        );
      }
    }
  };

  const fetchForecastByCity = async (cityName: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: cityName,
          appid: OPEN_WEATHER_KEY,
          units: "metric",
        },
      });

      setForecast(response.data.list);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching forecast data:", error.message);
        Alert.alert("Erro", "Erro ao buscar previsão do tempo");
      } else {
        console.error("Error fetching forecast data:", error);
        Alert.alert(
          "Erro",
          "Ocorreu um erro desconhecido ao buscar previsão do tempo"
        );
      }
    }
  };

  
  const fetchCurrentLocationImage = async (cityName: string) => {
    try {
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: cityName,
          client_id: UNSPLASH_ACCESS_KEY,
          per_page: 1,
        },
      });
  
      if (response.data && response.data.results.length > 0) {
        setCurrentLocationImage(response.data.results[0].urls.regular);
      } else {
        throw new Error(`Nenhuma foto encontrada para ${cityName}`);
      }
    } catch (error) {
      console.error("Erro ao buscar foto da localização atual:", error);
      Alert.alert("Erro", `Não foi possível encontrar a foto para ${cityName}`);
    }
  };
  
  const fetchPhotoByCity = async (cityName: string) => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: cityName,
            client_id: UNSPLASH_ACCESS_KEY,
            per_page: 1,
          },
        }
      );

      if (response.data && response.data.results.length > 0) {
        return response.data.results[0].urls.regular;
      } else {
        throw new Error("Nenhuma foto encontrada");
      }
    } catch (error) {
      console.error("Erro ao buscar foto:", error);
      throw error;
    }
  };

  const handleSearch = async (city: string) => {
    try {
      fetchWeatherByCity(city);
      fetchForecastByCity(city);

      const photoUrl = await fetchPhotoByCity(city);
      setBgImage(photoUrl);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível encontrar a localização ou foto");
    }
  };

  const handleRefresh = () => {
    getLocation();
    if (weather){
        fetchCurrentLocationImage(weather.name);
    }
    
  };

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <ImageBackground source={{ uri: bgImage || currentLocationImage }} style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      />
      <SearchBar onSearch={handleSearch} />
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <FontAwesome6 name="location-crosshairs" size={24} color="white" />
      </TouchableOpacity>
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
  refreshButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 20,
    marginTop: 70,
    marginRight: 10,
    alignContent: "stretch",
  },
});

export default Home;
