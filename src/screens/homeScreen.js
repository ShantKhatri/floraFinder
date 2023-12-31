import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import PlantOfTheDayCard from "../components/plantOfTheDayCard";
import plantsOfTheDayData from "../services/plantsOfTheDay";
import colors from "../variables/colors";
import ActivityIndicatorAnimation from "../components/activityIndicatorAnimation";

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
      setLoadingComplete(true);
    } catch (error) {
      console.error("Error fetching plants of the day:", error);
    }
  };

  useEffect(() => {
    setLoadingComplete(false);
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

  const CircleWithSections = (item, index) => {
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
    <SafeAreaView
      style={{
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.secondaryBackground,
      }}
    >
      {!loadingComplete ? (
        <ActivityIndicatorAnimation loadingStatus={!loadingComplete} />
      ) : (
        <View style={{ alignItems: "center", width: "100%" }}>
          <PlantOfTheDayCard
            plant={plantsOfTheDay[selectedPlant]}
            key={(item) => item.id + item.scientific_name}
          />
        </View>
      )}
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
    borderRadius: 100,
  },
  child1: {},
  child2: {
    backgroundColor: "green",
  },
  child3: {
    backgroundColor: "yellow",
  },
});

export default HomeScreen;
