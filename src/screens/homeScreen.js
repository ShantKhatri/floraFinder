import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from "react-native";
import SearchPlantScreen from "./searchPlant";
import PlantOfTheDayCard from "../components/plantOfTheDayCard";
import plantsOfTheDayData from "../services/plantsOfTheDay";
import colors from "../variables/colors";

const HomeScreen = () => {
  const [plantsOfTheDay, setPlantsOfTheDay] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(1);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // console.log("DATA");

  const fetchPlantsOfTheDay = async () => {
    try {
      const data = await plantsOfTheDayData;
      console.log("DATA", data);
      setPlantsOfTheDay(data);
    } catch (error) {
      console.error("Error fetching plants of the day:", error);
    }
  };

  useEffect(() => {
    console.log("USE EFFECT");
    fetchPlantsOfTheDay();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setLoadingComplete(true);
    };

    fetchData();
  }, []);

  // const image1 = plantsOfTheDay[1].image_url;

  const CircleWithSections = (item, index) => {
    // console.log(plantsOfTheDay[0].scientific_name);
    return (
      <TouchableOpacity
        style={{
          ...styles.innerCircle,
          bottom: index === selectedPlant ? 20 : 0,
        }}
        onPress={() => {
          setSelectedPlant(index);
          console.log(selectedPlant);
        }}
      >
        <ImageBackground
          source={{
            uri: plantsOfTheDay[index].image_url
              ? plantsOfTheDay[index].image_url
              : "https://storage.googleapis.com/powop-assets/neotropikey/tapura_peruviana_1_fullsize.jpg",
          }}
          style={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          borderRadius={100}
        ></ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
      <View style={{ alignItems: "center", width: "100%" }}>
        {loadingComplete && (
          <PlantOfTheDayCard
            plant={plantsOfTheDay[selectedPlant]}
            key={(item) => item.id + item.scientific_name}
          />
        )}
      </View>
      <View style={styles.outerCircle}>
        {plantsOfTheDay.length > 0 &&
          plantsOfTheDay.map((item, index) => CircleWithSections(item, index))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: 16,
  },
  innerCircle: {
    width: 100,
    // height: 100,
    borderRadius: 100,
    // backgroundColor: "blue",
    // position: "absolute",
  },
  child1: {
    // transform: [{ rotate: "0deg" }],
    // backgroundColor: "red",
  },
  child2: {
    // transform: [{ rotate: "120deg" }],
    backgroundColor: "green",
  },
  child3: {
    // transform: [{ rotate: "240deg" }],
    backgroundColor: "yellow",
  },
});

export default HomeScreen;
