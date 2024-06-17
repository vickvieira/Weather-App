import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Pressable, Alert } from "react-native";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState<string>("");

  const handleSearch = () => { //desconsidera espaços antes e depois da busca
    if (city.trim() === "") {
        Alert.alert("Erro", "Por favor digite o nome de uma cidade");
        return;
      }
    const trimmedCity = city.trim();
    onSearch(trimmedCity);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Digite o nome da cidade"
        placeholderTextColor="gray"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "white",
    marginRight: 10,
    width: "70%",
  },
  button: {
    color: 'blue',
  },
  buttonText: {
    color: 'white',
  }
});

export default SearchBar;




