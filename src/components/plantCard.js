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
const PlantCard = ({ plant }) => {
  const [openModal, setOpenModal] = useState(false);

  const { common_name, scientific_name, image_url, synonyms, links, id } =
    plant;

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };
  const synonymsText = [synonyms[0], synonyms[1], synonyms[2]].join(", ");

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
              {/* <Text style={[styles.synonymsText, { fontSize: 12 }]}>
                {synonyms.join(",")} ...
              </Text> */}
              {/* {synonymsShow()} */}
            </View>
          </View>
          <View style={styles.cardLinks}>
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
          </View>
          <Button title="Close" onPress={() => setOpenModal(!openModal)} />
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

export default PlantCard;
