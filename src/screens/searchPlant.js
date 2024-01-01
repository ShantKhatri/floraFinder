import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PlantCard from "../components/plantCard";
import fetchPlant from "../services/fetchPlant";
import PlantScanner from "../components/plantScanner";

const SearchPlantScreen = () => {
  const [textResult, setTextResult] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [showCamera, setShowCamera] = useState(true);

  const searchPlant = async () => {
    console.log("searching for plant");
    const fetchPlants = await fetchPlant(textSearch);
    console.log(fetchPlants);
    setTextResult(fetchPlants);
  };
  const serachResult = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={textResult}
          renderItem={({ item }) => <PlantCard key={item.id} plant={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          selectionColor={"green"}
          placeholder="Search for a plant"
          placeholderTextColor="#aaaaaa"
          onChangeText={(plant) => {
            setTextSearch(plant.toLowerCase());
          }}
        />
        <TouchableOpacity onPress={searchPlant} style={styles.searchButton}>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", paddingHorizontal: 20, flex: 1 }}>
        {serachResult()}
        <View style={{ marginHorizontal: 20 }}></View>
      </View>
      <View style={{ flex: 1 }}>
        <PlantScanner
          showCamera={showCamera}
          setScanResult={(result) => {
            setTextResult(result);
          }}
        />
      </View>
      <Button title="camera" onPress={() => setShowCamera(!showCamera)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECEDE1", width: "100%" },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {},
  buttonText: { fontSize: 18, marginBottom: 10, color: "white" },
  //   image: { flex: 1 },
  textResult: { flex: 1 },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 10,
    justifyContent: "space-between",
    backgroundColor: "#CACFC0",
    borderRadius: 20,
    paddingLeft: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "#CACFC0",
    borderRadius: 20,
    height: 48,
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5F7A5D",
    borderRadius: 20,
    width: 48,
    height: 48,
  },
});

export default SearchPlantScreen;
