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
import PlantOfTheDayCard from "../../components/plantOfTheDayCard";
import ActivityIndicatorAnimation from "../../components/activityIndicatorAnimation";
import fetchPlantDetails from "../../services/fetchPlantDetails";
import colors from "../../variables/colors";

const PlantDetails = ({ route }) => {
  console.log("route", route);
  const { plantPath } = route?.params;
  console.log("plantPath", plantPath);
  const [plantDetails, setPlantDetails] = useState({});
  const [selectedPlant, setSelectedPlant] = useState(1);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log("DATA");

  const fetchPlant = async () => {
    try {
      const data = await fetchPlantDetails(plantPath);
      console.log("DATA", data);
      setPlantDetails(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching plants of the day:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    console.log("USE EFFECT");
    fetchPlant();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setLoadingComplete(true);
      setLoading(false);
    };

    fetchData();
  }, []);

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
      {(!loadingComplete || loading) && (
        <ActivityIndicatorAnimation loadingStatus={loading} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default PlantDetails;
