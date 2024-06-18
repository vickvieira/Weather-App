import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import { OPEN_WEATHER_KEY } from '../constants/ApiConstants';
import { Picker } from '@react-native-picker/picker';

const Maps = () => {
  const [layer, setLayer] = useState('precipitation_new'); // Estado para a camada atual

  const tileUrl = `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${OPEN_WEATHER_KEY}`;
  console.log("Tile URL: ", tileUrl); // Log para verificar a URL
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -9.44,
          longitude: -54.7,
          latitudeDelta: 88,
          longitudeDelta: 49.79,
        }}
        minZoomLevel={0}
        maxZoomLevel={19}
        onMapReady={() => console.log("Map is ready")}
        onRegionChangeComplete={(region) => console.log("Region changed: ", region)}
      >
        <UrlTile
        key={layer}
          urlTemplate={tileUrl}
          maximumZ={19}
          flipY={false}
          tileSize={256} // Tamanho padrão do tile
        />
      </MapView>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={layer}
          style={styles.picker}
          onValueChange={(itemValue) => setLayer(itemValue)}
        >
          <Picker.Item label="Precipitação" value="precipitation_new" />
          <Picker.Item label="Temperatura" value="temp_new" />
          <Picker.Item label="Nuvens" value="clouds_new" />
          <Picker.Item label="Vento" value="wind_new" />
          {/* Adicione mais opções de camada conforme necessário */}
        </Picker>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width: width,
    height: height,
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 10,
    width: "80%",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderColor: "gainsboro",
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    

  },
  picker: {
    height: 50,
    width: "100%",
    color: "white",
    borderRadius: 10,
  },
});

export default Maps;
