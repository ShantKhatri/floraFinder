import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  FlatList,
  Linking,
} from "react-native";
import Modal, { ReactNativeModal } from "react-native-modal";
import colors from "../variables/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const PlantOfTheDayCard = ({ plant }) => {
  console.log(JSON.stringify(plant, null, 2));
  console.log("Links", plant.links);

  const [openModal, setOpenModal] = useState(false);

  const {
    common_name,
    slug,
    scientific_name,
    image_url,
    year,
    family_common_name,
    observations,
    vegetable,
    links,
    main_species,
  } = plant;
  console.log("MAIN SPECIES", main_species);

  const mainSpeciesData = [
    { key: "Slug", value: main_species.slug },
    { key: "Scientific Name", value: main_species.scientific_name },
    { key: "Year", value: main_species.year },
    { key: "Bibliography", value: main_species.bibliography },
    { key: "Author", value: main_species.author },
    { key: "Rank", value: main_species.rank },
    { key: "Observations", value: main_species.observations },
    { key: "Vegetable", value: main_species.vegetable },
    { key: "Genus", value: main_species.genus },
    { key: "Family", value: main_species.family },
    { key: "Edible", value: main_species.edible },
  ];

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };
  //   const synonymsText = [synonyms[0], synonyms[1], synonyms[2]].join(", ");

  // const synonymsShow = () => {
  //   return (
  //     <FlatList
  //       data={synonyms}
  //       keyExtractor={(item, index) => index.toString()}
  //       // horizontal={true}
  //       // showsHorizontalScrollIndicator={false}
  //       contentContainerStyle={styles.listContainer}
  //       renderItem={({ item }) => (
  //         <TouchableOpacity style={styles.synonymContainer}>
  //           <Text style={styles.synonymText}>{item}</Text>
  //         </TouchableOpacity>
  //       )}
  //     />
  //   );
  // };

  const FlowerIcon = () => (
    <MaterialCommunityIcons
      name="flower-pollen"
      size={24}
      color={colors.primaryButton}
    />
  );

  return (
    <ScrollView
      style={styles.card}
      contentContainerStyle={{ paddingBottom: 16 }}
      //   onPress={() => setOpenModal(!openModal)}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.cardTitle}>{family_common_name}</Text>
      </View>
      <View style={styles.scientificNameContainer}>
        <FlowerIcon />
        <Text style={styles.cardScientificName}>{scientific_name}</Text>
        <FlowerIcon />
      </View>
      {image_url && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image_url }} style={styles.cardImage} />
        </View>
      )}
      {/* <View style={styles.cardContent}>
        <View style={styles.cardSynonyms}>
          <Text style={styles.synonymsTitle}>Synonyms:</Text>
          <Text style={[styles.synonymsText, { fontSize: 12 }]}>
            {synonymsText} ...
          </Text>
        </View>
      </View> */}
      <View style={styles.slugContainer}>
        <Text style={styles.slugTitle}>Slug:</Text>
        <Text style={styles.slug}>{slug}</Text>
      </View>
      {observations && (
        <View
          style={{
            ...styles.slugContainer,
            flexDirection: "column",
            height: "auto",
          }}
        >
          <Text style={styles.slugTitle}>Observations:</Text>
          <Text style={styles.slug}>{observations}</Text>
        </View>
      )}

      <View
        style={{
          ...styles.mainSpeciesContainer,
          borderTopWidth: 1,
          marginVertical: 16,
          paddingVertical: 8,
        }}
      >
        <FlatList
          data={mainSpeciesData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.speciesDetailsContainer,
                // flexDirection: item.value.lenght > 25 ? "column" : "row",
              }}
            >
              <Text style={styles.speciesDetailKey}>{item.key}:</Text>
              <Text style={styles.speciesValueText}>{item.value}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.cardLinks}>
        <Text style={styles.linksTitle}>Links:</Text>
        <TouchableOpacity onPress={() => handleLinkPress(links.self)}>
          <Text style={styles.link}>
            <Text style={styles.linkText}>Self: </Text>
            <Text style={styles.linkUrl}>{links.self}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress(links.species)}>
          <Text style={styles.link}>
            <Text style={styles.linkText}>Plant: </Text>
            <Text style={styles.linkUrl}>{links.species}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress(links.genus)}>
          <Text style={styles.link}>
            <Text style={styles.linkText}>Genus: </Text>
            <Text style={styles.linkUrl}>{links.genus}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: 8,
    padding: 16,
    flexDirection: "column",
    // alignItems: "center",
    elevation: 2,
    width: "100%",
  },
  titleContainer: {
    width: "100%",
    // height: 40,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    backgroundColor: colors.primaryButton,
    width: "100%",
    borderRadius: 16,
  },
  imageContainer: {
    width: "100%",
    height: "40%",
    borderRadius: 8,
    marginBottom: 8,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  cardContent: {
    // flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: colors.secondaryBackground,
  },
  scientificNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  cardScientificName: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.primaryButton,
  },
  cardSynonyms: {
    marginBottom: 8,
  },
  synonymsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  synonymsText: {
    fontSize: 16,
  },
  slugContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 8,
    backgroundColor: colors.primaryButton,
    borderRadius: 16,
  },
  slugTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: colors.secondaryBackground,
  },
  slug: {
    fontSize: 16,
    marginBottom: 4,
    color: colors.secondaryBackground,
    textAlign: "center",
  },
  speciesDetailsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 8,
    width: "100%",
    borderRadius: 16,
  },
  speciesDetailKey: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: colors.primaryButton,
  },
  speciesValueText: {
    fontSize: 16,
    marginBottom: 4,
    color: colors.primaryButton,
    textAlign: "center",
  },
  cardLinks: {
    marginBottom: 8,
  },
  linksTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  link: {
    flexDirection: "row",
    marginBottom: 4,
  },
  linkText: {
    fontWeight: "bold",
  },
  linkUrl: {
    color: "blue",
  },

  listContainer: {
    alignItems: "center",
  },
  synonymContainer: {
    marginHorizontal: 10,
    backgroundColor: "#e7f0c3",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#c2d6a3",
  },
  synonymText: {
    color: "#2e7d32",
    fontSize: 8,
  },
});

export default PlantOfTheDayCard;
