import { View, Text, StyleSheet } from "react-native";
import { Weather } from "../constants/WeatherTypes";
import LottieView from "lottie-react-native";

type WeatherCondition ="Clear" | "Rain" | "Clouds" | "Few Clouds" | "Scattered Clouds" | "Broken Clouds" | "Shower Rain" | "Thunderstorm" | "Snow" | "Mist" |"Haze"| "Default";

const weatherIconMap: Record<WeatherCondition, any> = {
    "Clear": require("../../assets/lottie/sunny.json"),
    "Rain": require("../../assets/lottie/rain.json"),
    "Clouds": require("../../assets/lottie/few-clouds.json"),
    "Few Clouds": require("../../assets/lottie/few-clouds.json"),
    "Scattered Clouds": require("../../assets/lottie/scattered-clouds.json"),
    "Broken Clouds": require("../../assets/lottie/broken-clouds.json"),
    "Shower Rain": require("../../assets/lottie/shower-rain.json"),
    "Thunderstorm": require("../../assets/lottie/thunderstorm.json"),
    "Snow": require("../../assets/lottie/snow (2).json"),
    "Mist": require("../../assets/lottie/mist.json"),
    "Haze": require("../../assets/lottie/haze.json"),
    "Default": require("../../assets/lottie/sunny.json"),
  };

const DinamicIcon = ({icons}: {icons:Weather}) => {
    const weatherCondition = icons.weather[0].main as WeatherCondition;
    const lottieSource = weatherIconMap[weatherCondition] || weatherIconMap["Default"];
    
  return(

    <LottieView
        source={lottieSource} 
          style={{
            width: 200,
            aspectRatio: 1,
          }}
          loop
          autoPlay
        />
    )
};

const styles = StyleSheet.create({
    

})
export default DinamicIcon;