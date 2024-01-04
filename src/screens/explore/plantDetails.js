import React, { useCallback, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  // console.log("DATA");

  const fetchPlant = async () => {
    try {
      const data = await fetchPlantDetails(plantPath);
      setPlantDetails(data);
      console.log("DATA", data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching plants of the day:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      console.log("USE EFFECT");
      fetchPlant();
    }, [plantPath])
  );

  useEffect(() => {
    setLoading(true);
    console.log("USE EFFECT");
    fetchPlant();
  }, [plantPath]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setLoadingComplete(true);
      setLoading(false);
    };

    fetchData();
  }, [plantPath]);

  // const image1 = plantDetails[1].image_url;

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.secondaryBackground,
      }}
    >
      <View style={{ alignItems: "center", width: "100%" }}>
        {loadingComplete && (
          <PlantOfTheDayCard
            plant={plantDetails}
            key={(item) => item.id + item.scientific_name}
          />
        )}
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        {!loadingComplete && (
          <ActivityIndicatorAnimation loadingStatus={loading} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default PlantDetails;
