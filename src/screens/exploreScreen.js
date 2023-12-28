import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import colors from "../variables/colors";
import PlantCard from "../components/plantCard";
import fetch from "node-fetch";
import { AntDesign } from "@expo/vector-icons";

const ExploreScreen = ({ navigation }) => {
  const [textResult, setTextResult] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [category, setCategory] = useState("plants");
  // Define an array of species or classifications
  const species = [
    { id: 1, name: "plants" },
    { id: 3, name: "species" },
    // Add more species as needed
  ];

  const renderCategory = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.category}
        onPress={() => {
          setPageNo(1);
          setCategory(item.name);
          fetchCategory(pageNo, category);
        }}
      >
        <Image
          source={{
            uri: "https://storage.googleapis.com/powop-assets/neotropikey/tapura_peruviana_1_fullsize.jpg",
          }}
          style={styles.categoryImage}
        />
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.secondaryBackground,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <Text style={styles.categoryName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderResult = ({ item }) => {
    return (
      <View
        style={{
          // flex: 1,
          backgroundColor: colors.primaryBackground,
          width: "48%",
          marginLeft: "2%",
          alignSelf: "center",
        }}
      >
        <PlantCard key={item.id + item.name} plant={item} />
      </View>
    );
  };

  const fetchCategory = async (page, category) => {
    try {
      const response = await fetch(
        `https://trefle.io/api/v1/${category}?token=6-zgTrpjdpJK-7MqVo_iXczQRpdIq_hmEIDfdhTUxlg&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const json = await response.json();
      const newData = json.data;

      // Assuming textResult is a state variable
      setTextResult(newData);

      // Log the current state of textResult
      // console.log(textResult);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchCategory(pageNo, category);
  }, [pageNo, category]);

  const pageNavigation = () => {
    return (
      <View style={styles.pageNavigation}>
        <TouchableOpacity
          onPress={() => {
            setPageNo(pageNo - 1);
            fetchCategory(pageNo, category);
          }}
          disabled={pageNo === 1}
          style={{
            backgroundColor: colors.primaryButton,
            height: 40,
            width: 80,
            justifyContent: "space-between",
            paddingHorizontal: 10,
            alignItems: "center",
            borderRadius: 8,
            flexDirection: "row",
            opacity: pageNo === 1 ? 0.5 : 1,
          }}
        >
          <AntDesign
            name="leftcircle"
            size={24}
            color={colors.secondaryButton}
          />
          <Text style={{ fontSize: 16 }}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPageNo(pageNo + 1);
            fetchCategory(pageNo, category);
          }}
          style={{
            backgroundColor: colors.primaryButton,
            height: 40,
            width: 80,
            justifyContent: "space-between",
            paddingHorizontal: 10,
            alignItems: "center",
            borderRadius: 8,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16 }}>Next</Text>
          <AntDesign
            name="rightcircle"
            size={24}
            color={colors.secondaryButton}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const showResult = () => {
    return (
      <View style={{ alignItems: "center", flex: 1 }}>
        <FlatList
          data={textResult}
          renderItem={renderResult}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ListFooterComponent={pageNavigation}
        />
      </View>
      // textResult.map((item) => <PlantCard key={item.id} plant={item} />)
    );
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.primaryBackground }}>
      {/* {fetchCategory(pageNo, category)} */}
      <View style={styles.categoryContainer}>
        <FlatList
          data={species}
          keyExtractor={(item) => item.id + item.name}
          renderItem={renderCategory}
          horizontal
        />
      </View>
      <View style={styles.exploreContainer}>{showResult()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginHorizontal: 20,
    marginVertical: 20,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    // backgroundColor: colors.secondaryBackground,
    elevation: 2,
  },
  category: {
    // backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    width: 180,
    height: 200,
  },
  categoryImage: {
    width: "100%",
    height: "80%",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  categoryName: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  exploreContainer: {
    flex: 1,
  },
  pageNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default ExploreScreen;
