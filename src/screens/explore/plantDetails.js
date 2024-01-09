import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import PlantOfTheDayCard from "../../components/plantOfTheDayCard";
import ActivityIndicatorAnimation from "../../components/activityIndicatorAnimation";
import fetchPlantDetails from "../../services/fetchPlantDetails";
import colors from "../../variables/colors";
import { useFocusEffect } from "@react-navigation/native";

const PlantDetails = ({ route }) => {
  console.log("route", route);
  const { plantPath } = route?.params;
  console.log("plantPath", plantPath);
  const [plantDetails, setPlantDetails] = useState({});
  const [loadingComplete, setLoadingComplete] = useState(false);

  // console.log("DATA");

  const fetchPlant = async () => {
    try {
      const data = await fetchPlantDetails(plantPath);
      setPlantDetails(data);
      console.log("DATA", data);
      setLoadingComplete(true);
    } catch (error) {
      console.error("Error fetching plants of the day:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoadingComplete(false);
      console.log("USE EFFECT");
      fetchPlant();
    }, [plantPath])
  );

  useEffect(() => {
    setLoadingComplete(false);
    console.log("USE EFFECT");
    fetchPlant();
  }, [plantPath]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setLoadingComplete(true);
    };

    fetchData();
  }, [plantPath]);

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
            plant={plantDetails}
            key={(item) => item.id + item.scientific_name}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default PlantDetails;
