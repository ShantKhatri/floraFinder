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
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PlantCard from "../components/plantCard";
import fetchPlant from "../services/fetchPlant";

const SearchPlantScreen = ({ navigation, route }) => {
  const { plant } = route?.params ? route.params : [];
  const [textResult, setTextResult] = useState(plant || []);
  const [textSearch, setTextSearch] = useState("");
  const [showCamera, setShowCamera] = useState(true);

  useEffect(() => {
    setTextResult(plant);
  }, [plant]);

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
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
        </View>

        {textResult && (
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>No results found</Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate("PlantScanner")}
      >
        <Image
          source={require("../../assets/lens.png")}
          width={40}
          height={40}
          style={{ borderRadius: 20 }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECEDE1",
    width: "100%",
  },
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
  scanButton: {
    flex: 1,
    position: "absolute",
    bottom: 10,
    right: "5%",
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#5F7A5D",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});

export default SearchPlantScreen;
