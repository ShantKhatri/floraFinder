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
import colors from "../../variables/colors";
import PlantCard from "../../components/plantCard";
import { AntDesign } from "@expo/vector-icons";
import fetchCategory from "../../services/fetchCategory";
import ActivityIndicatorAnimation from "../../components/activityIndicatorAnimation";

const ExploreScreen = ({ navigation }) => {
  const [textResult, setTextResult] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [category, setCategory] = useState("plants");
  const [loading, setLoading] = useState(false);
  // Define an array of species or classifications
  const species = [
    {
      id: 1,
      name: "plants",
      image:
        "https://drive.google.com/uc?export=view&id=1ZDi9wA5ocA0ENSTYS0-ST7u3A5-Cuj5o",
    },
    {
      id: 3,
      name: "species",
      image:
        "https://drive.google.com/uc?export=view&id=1GexmTSCMa1nPpWy2e9IbVb66rswB-N9h",
    },
  ];

  const renderCategory = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.category}
        onPress={() => {
          setPageNo(1);
          setCategory(item.name);
          fetchCategory(pageNo, item.name);
        }}
      >
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
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
          width: "47%",
          marginHorizontal: "1%",
          alignSelf: "center",
          height: 430,
          marginBottom: 10,
        }}
      >
        <PlantCard
          key={item.id + item.name}
          plant={item}
          pressKnowMore={(path) =>
            navigation.navigate("PlantDetails", {
              plantPath: path,
            })
          }
        />
      </View>
    );
  };

  useEffect(() => {
    const fetchCall = async () => {
      setLoading(true);
      console.log("fetching category");
      const data = await fetchCategory(pageNo, category);
      console.log("category fetched");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setTextResult(data);
      setLoading(false);
    };
    fetchCall();
  }, [pageNo, category]);

  const pageNavigation = () => {
    return (
      <View style={styles.pageNavigation}>
        <TouchableOpacity
          onPress={() => {
            setPageNo(pageNo - 1);
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
    );
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.primaryBackground }}>
      <View style={styles.categoryContainer}>
        <FlatList
          data={species}
          keyExtractor={(item) => item.id + item.name}
          renderItem={renderCategory}
          horizontal
        />
      </View>
      {!loading && <View style={styles.exploreContainer}>{showResult()}</View>}
      {loading && <ActivityIndicatorAnimation loadingStatus={loading} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    elevation: 2,
  },
  category: {
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
