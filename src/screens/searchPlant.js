import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PlantCard from "../components/plantCard";
import fetchPlant from "../services/fetchPlant";
import ActivityIndicatorAnimation from "../components/activityIndicatorAnimation";

const SearchPlantScreen = ({ navigation, route }) => {
  const { plant } = route?.params ? route.params : [];
  const [textResult, setTextResult] = useState(plant || []);
  const [textSearch, setTextSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTextResult(plant);
    console.log("plant", textResult);
  }, [plant]);

  const searchPlant = async () => {
    setLoading(true);
    console.log("searching for plant");
    const fetchPlants = await fetchPlant(textSearch);
    console.log(fetchPlants);
    setTextResult(fetchPlants);
    setLoading(false);
  };
  const serachResult = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={textResult}
          renderItem={({ item }) => (
            <View style={{ height: 375, marginBottom: 16 }}>
              <PlantCard
                key={item.id}
                plant={item}
                pressKnowMore={(path) =>
                  navigation.navigate("ExploreStack", {
                    screen: "PlantDetails",
                    params: { plantPath: path },
                  })
                }
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              selectionColor={"green"}
              placeholder="Search for a plant"
              placeholderTextColor="#aaaaaa"
              onChangeText={(plant) => {
                setTextSearch(plant.toLowerCase());
              }}
              onSubmitEditing={searchPlant}
            />
            <TouchableOpacity onPress={searchPlant} style={styles.searchButton}>
              <FontAwesome name="search" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicatorAnimation
              loadingStatus={loading}
              style={{ flex: 1 }}
            />
          ) : typeof textResult == "undefined" ||
            textResult == [] ||
            textResult == null ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.5,
                height: "90%",
              }}
            >
              <Image source={require("../../assets/searchAlter1.png")} />
            </View>
          ) : (
            <View
              style={styles.container}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{ alignItems: "center", paddingHorizontal: 20, flex: 1 }}
              >
                {textResult != [] && textResult != null && serachResult()}
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => navigation.navigate("PlantScanner")}
          >
            <Image
              source={require("../../assets/lens.png")}
              style={{ borderRadius: 10 }}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  textResult: { flex: 1 },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
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
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#5F7A5D",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});

export default SearchPlantScreen;
