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
  ImageBackground,
} from "react-native";
import Modal, { ReactNativeModal } from "react-native-modal";
import colors from "../variables/colors";
import FavouriteButton from "./favourite";
import { useNavigation } from "@react-navigation/native";
const PlantCard = ({ plant, pressKnowMore }) => {
  const [openModal, setOpenModal] = useState(false);

  const navigation = useNavigation();

  const {
    common_name,
    scientific_name,
    image_url,
    synonyms,
    links,
    id,
    slug,
    year,
    family,
    genus,
    rank,
  } = plant;

  const mainSpeciesData = [
    { key: "Slug", value: slug },
    { key: "Year", value: year },
    { key: "Family", value: family },
    { key: "Genus", value: genus },
    { key: "Rank", value: rank },
  ];

  const synonymsText = [synonyms[0], synonyms[1], synonyms[2]].join(", ");

  const renderSynonyms = () => {
    return synonyms.map((item, index) => (
      <View
        key={index}
        style={[styles.synonymItem, { backgroundColor: item.bgColor }]}
      >
        <Text style={styles.synonymText}>{item}</Text>
      </View>
    ));
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setOpenModal(!openModal)}
    >
      <ImageBackground source={{ uri: image_url }} style={styles.cardImage}>
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            alignSelf: "flex-end",
            // marginRight: "10%",
            // marginTop: "5%",
          }}
        >
          <FavouriteButton plant={plant} key={plant.id} />
        </View>
      </ImageBackground>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{common_name}</Text>
        <Text style={styles.synonymsTitle}>Scientific Name:</Text>
        <Text style={styles.cardScientificName}>{scientific_name}</Text>
        <View style={styles.cardSynonyms}>
          <Text style={styles.synonymsTitle}>Synonyms:</Text>
          <Text style={[styles.synonymsText, { fontSize: 12 }]}>
            {synonymsText} ...
          </Text>
        </View>
      </View>
      <Modal
        isVisible={openModal}
        animationType="slide"
        onRequestClose={() => setOpenModal(!openModal)}
        onSwipeComplete={() => setOpenModal(!openModal)}
        // swipeDirection={["down"]}
        onBackdropPress={() => setOpenModal(!openModal)}
        coverScreen={true}
        children={true}
        // // backdropColor="#ECEBDF"
        propagateSwipe={true}
      >
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: image_url }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{common_name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.synonymsTitle}>Scientific Name:</Text>
              <Text style={styles.cardScientificName}>{scientific_name}</Text>
            </View>
            <View style={styles.cardSynonyms}>
              <Text style={styles.synonymsTitle}>Synonyms:</Text>
              <View style={styles.listContainer}>{renderSynonyms()}</View>
            </View>
          </View>
          <View
            style={{
              ...styles.mainSpeciesContainer,
              borderTopWidth: 1,
              marginVertical: 16,
              paddingVertical: 8,
              width: "100%",
            }}
          >
            {mainSpeciesData.map((item, index) => (
              <View
                key={index}
                style={{
                  ...styles.speciesDetailsContainer,
                  backgroundColor: index % 2 == 0 ? "#e7f0c3" : "#c2d6a3",
                }}
              >
                <Text style={styles.speciesDetailKey}>{item.key}</Text>
                <Text style={styles.speciesValueText}>{item.value}</Text>
              </View>
            ))}
          </View>
          {/* <View style={styles.cardLinks}>
            <Text style={styles.linksTitle}>Links:</Text>
            <TouchableOpacity onPress={() => handleLinkPress(links.self)}>
              <Text style={styles.link}>
                <Text style={styles.linkText}>Self: </Text>
                <Text style={styles.linkUrl}>{links.self}</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLinkPress(links.plant)}>
              <Text style={styles.link}>
                <Text style={styles.linkText}>Plant: </Text>
                <Text style={styles.linkUrl}>{links.plant}</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLinkPress(links.genus)}>
              <Text style={styles.link}>
                <Text style={styles.linkText}>Genus: </Text>
                <Text style={styles.linkUrl}>{links.genus}</Text>
              </Text>
            </TouchableOpacity>
          </View> */}
          <TouchableOpacity
            onPress={() => {
              pressKnowMore(links.plant);
            }}
            style={{
              ...styles.button,
              backgroundColor: colors.primaryButton,
              marginBottom: 16,
              paddingVertical: 8,
              width: "80%",
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: colors.secondaryButton,
              }}
            >
              Know More
            </Text>
          </TouchableOpacity>
          <Button
            title="Close"
            onPress={() => setOpenModal(!openModal)}
            color={colors.primaryButton}
          />
        </ScrollView>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: 8,
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    elevation: 5,
    width: "100%",
    marginBottom: 16,
    height: "100%",
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  cardContent: {
    // flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardScientificName: {
    fontSize: 16,
    marginBottom: 8,
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
  modalContainer: {
    backgroundColor: colors.secondaryBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: "column",
    alignItems: "center",
    elevation: 2,
    width: "100%",
    height: "80vh",
  },
  modalContent: {
    marginBottom: 16,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  synonymContainer: {
    // marginHorizontal: 10,
    backgroundColor: "#e7f0c3",
    // padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#c2d6a3",
  },
  synonymText: {
    color: colors.secondaryButton,
    fontSize: 10,
    backgroundColor: colors.primaryButton,
    margin: 1,
    paddingHorizontal: 1,
    borderRadius: 4,
  },
  synonymItem: {
    // margin: 8,
    // padding: 12,
    // backgroundColor: colors.secondaryButton,
    borderRadius: 8,
    minWidth: 50,
  },
  speciesDetailsContainer: {
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
});

export default PlantCard;
