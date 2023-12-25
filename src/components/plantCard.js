import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import Modal, { ReactNativeModal } from "react-native-modal";
const PlantCard = () => {
  const { common_name, scientific_name, image_url, synonyms, links } = {
    id: 128860,
    common_name: "Narrow-leaf plantain",
    slug: "plantago-lanceolata",
    scientific_name: "Plantago lanceolata",
    year: 1753,
    bibliography: "Sp. Pl.: 113 (1753)",
    author: "L.",
    status: "accepted",
    rank: "species",
    family_common_name: null,
    genus_id: 6597,
    image_url:
      "https://bs.plantnet.org/image/o/f8d7d6fe52e36d04f5ad1fc03f46f604d5c3cc43",
    synonyms: [
      "Plantago intermedia",
      "Plantago lanceolata var. communis",
      "Plantago lanceifolia",
      "Arnoglossum lanceolatum var. ramosum",
      "Plantago lanceolata f. eriophora",
      "Plantago lanceolata var. dubia",
      "Plantago lanceolata f. pleiocephala",
      "Plantago lanceolata var. eriophylla",
      "Plantago lanceolata var. mediterranea",
      "Plantago glareosa",
      "Plantago pseudopatagonica",
      "Plantago lanceolata subvar. eriophora",
      "Plantago dalmatica",
      "Plantago lanceolata var. bakeri",
      "Plantago linkii",
      "Plantago lanceolata var. angustifolia",
      "Plantago sylvatica",
      "Plantago orientalis var. lycia",
      "Plantago lanceolata var. montana",
      "Plantago lanceolata subsp. eriophora",
      "Plantago lanceolata f. coarctata",
      "Plantago nutans",
      "Plantago lanceolata subvar. lasiophylla",
      "Plantago lanceolata var. eriophora",
      "Plantago dubia",
      "Plantago ambigua",
      "Plantago eriophora",
      "Plantago variabilis",
      "Plantago hungarica",
      "Plantago yezomaritima",
      "Plantago lanceolata var. graminifolia",
      "Plantago elata",
      "Plantago schottii",
      "Plantago timbalii",
      "Plantago lanceolata var. capitellata",
      "Plantago lanceolata subvar. euryphylla",
      "Plantago lanceolata f. lanuginosa",
      "Plantago abyssinica",
      "Plantago lanceolata subsp. lanuginosa",
      "Plantago lanceolata var. minima",
      "Plantago irrigua",
      "Plantago lanceolata var. latifolia",
      "Plantago attenuata",
      "Plantago nigricans",
      "Arnoglossum lanceolatum var. trinervium",
      "Plantago lanuginosa",
      "Plantago lanceolata var. sphaerostachya",
      "Plantago japonica var. yezomaritima",
      "Plantago lanceolata subvar. sphaerostachya",
      "Plantago lanceolata var. contigua",
      "Plantago leiopetala",
      "Plantago lanceolata var. timbalii",
      "Plantago lanceolata f. macrostachya",
      "Plantago lanceolata var. sylvatica",
      "Plantago lanceolata subvar. eurhiza",
      "Plantago preslii",
      "Lagopus lanceolatus",
      "Plantago byzantina",
      "Plantago fontis-curvae",
      "Plantago media var. prolifera",
      "Plantago flexuosa",
      "Plantago lanceolata var. minor",
      "Plantago lanceolata f. composita",
      "Plantago lanceolata var. alpina",
      "Plantago azorica",
      "Plantago lanceolata var. erecta",
      "Plantago sphaerostachys",
      "Plantago kurdica",
      "Plantago orientalis",
      "Arnoglossum lanceolatum var. roseum",
      "Plantago lanceolata var. capitata",
      "Plantago major f. yezomaritima",
      "Plantago lanceolata f. bifurca",
      "Plantago mediterranea",
      "Plantago lanceolata var. multinervia",
      "Plantago glauca",
      "Plantago contorta",
      "Plantago lanceolata subsp. capitata",
      "Plantago sphaerostachya",
      "Plantago lanceolata var. polystachia",
      "Plantago lanceolata var. maritima",
      "Lagopus timbali",
      "Arnoglossum lanceolatum",
      "Plantago glabriflora",
      "Plantago longistipes",
      "Plantago succisa",
      "Plantago trinervis",
      "Plantago capitata",
      "Plantago lanceolata subsp. altissima",
      "Plantago longiscapa",
      "Plantago lanceolata var. lanuginosa",
    ],
    genus: "Plantago",
    family: "Plantaginaceae",
    links: {
      self: "/api/v1/species/plantago-lanceolata",
      plant: "/api/v1/plants/plantago-lanceolata",
      genus: "/api/v1/genus/plantago",
    },
  };

  const [openModal, setOpenModal] = useState(false);

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };
  const synonymsText = [synonyms[0], synonyms[1], synonyms[2]].join(", ");

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setOpenModal(!openModal)}
    >
      <Image source={{ uri: image_url }} style={styles.cardImage} />
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
        swipeDirection={["down"]}
        onBackdropPress={() => setOpenModal(!openModal)}
        coverScreen={true}
        children={true}
        // backdropColor="#ECEBDF"
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
              <Text style={[styles.synonymsText, { fontSize: 12 }]}>
                {synonyms.join(",")} ...
              </Text>
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
    backgroundColor: "#ECEBDF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: "column",
    alignItems: "center",
    elevation: 2,
    width: "80%",
    height: "50%",
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
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
    backgroundColor: "#ECEBDF",
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
    backgroundColor: "#ECEBDF",
    marginBottom: 16,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
});

export default PlantCard;
