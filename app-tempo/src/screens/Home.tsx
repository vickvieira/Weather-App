import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Alert, TouchableOpacity, ImageComponent, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import DinamicIcon from "../components/DinamicIcon";
import AdditionalInfo from "../components/AdditionalInfo";


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
          lang: 'pt_br',
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
          lang: 'pt_br',
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
          lang: 'pt_br',
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
    <ImageBackground source={{ uri: bgImage || currentLocationImage }} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.searchBar}>
        <SearchBar onSearch={handleSearch} />
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <FontAwesome6 name="location-crosshairs" size={24} color="white" />
        </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.contentContainer}>
            <DinamicIcon icons={weather} />
            <Text style={styles.location}>{weather.name}</Text>
            <Text style={styles.temp}>{Math.round(weather.main.temp)}°<Text style={styles.celsius}>C</Text></Text>
            <Text style={styles.weatherDescription}>{weather.weather[0].description}</Text>
            <FlatList
              data={forecast}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.forecastList}
              contentContainerStyle={styles.forecastListContent}
              renderItem={({ item }) => <ForecastItem forecast={item} />}
              keyExtractor={(item) => item.dt.toString()}
            />
          </View>
          <View style={styles.additionalInfoContainer}>
            <AdditionalInfo additional={weather.main} />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  location: {
    fontSize: 30,
    color: "lightgray",
    marginTop: 10,
  },
  temp: {
    fontSize: 90,
    color: "snow",
    marginTop: 20,
  },
  weatherDescription: {
    fontSize: 20,
    color: "gray",
    marginTop: 10,
  },
  refreshButton: {
    position: "absolute",
    top: 110,
    right: 32,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 20,
  },
  forecastList: {
    flexGrow: 0,
    height: 150,
    marginTop: 40,
  },
  forecastListContent: {
    paddingHorizontal: 10,
    gap: 10,
  },
  additionalInfoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  searchBar: {
    paddingBottom: 40,
  },
  celsius: {
    fontSize: 50,

  }
});

export default Home;