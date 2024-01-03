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
import ActivityIndicatorAnimation from "../components/activityIndicatorAnimation";

const SearchPlantScreen = ({ navigation, route }) => {
  const { plant } = route?.params ? route.params : [];
  const [textResult, setTextResult] = useState(plant || []);
  const [textSearch, setTextSearch] = useState("");
  const [showCamera, setShowCamera] = useState(true);
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
                  navigation.navigate("Explore", {
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
            onSubmitEditing={searchPlant}
          />
          <TouchableOpacity onPress={searchPlant} style={styles.searchButton}>
            <FontAwesome name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {!loading && (
          <View
            style={{ alignItems: "center", paddingHorizontal: 20, flex: 1 }}
          >
            {serachResult()}
          </View>
        )}

        {loading && <ActivityIndicatorAnimation loadingStatus={loading} />}
      </ScrollView>
      {(typeof textResult == "undefined" || textResult.length == 0) && (
        <View
          style={{
            // flex: 1,
            alignItems: "center",
            // marginTop: 250,
            justifyContent: "center",
            opacity: 0.5,
            // backgroundColor: "red",
            height: "90%",
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: [{ translateX: -100 }, { translateY: -100 }],
          }}
        >
          <Image source={require("../../assets/searchAlter1.png")} />
          {/* <Text style={{ fontSize: 20 }}>No results found</Text> */}
        </View>
      )}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate("PlantScanner")}
      >
        <Image
          source={require("../../assets/lens.png")}
          // width={50}
          // height={50}
          style={{ borderRadius: 10 }}
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
