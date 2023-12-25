import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import PlantCard from "../components/plantCard";

const SearchPlantScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [textResult, setTextResult] = useState([]);
  const [textSearch, setTextSearch] = useState("");

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const processImage = async (base64) => {
    try {
      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: "TEXT_DETECTION", maxResults: 5 }],
            image: { content: base64 },
          },
        ],
      });

      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

      let responseJson = await response.json();
      setTextResult(JSON.stringify(responseJson, null, 2));
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({ base64: true });
      setImage(photo.uri);
      processImage(photo.base64);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      processImage(result.base64);
    }
  };

  const searchPlant = async () => {
    const response = await fetch(
      "https://trefle.io/api/v1/plants?token=6-zgTrpjdpJK-7MqVo_iXczQRpdIq_hmEIDfdhTUxlg"
    );
    const json = await response.json();
    const data = json.data.filter(
      (item) =>
        (item.common_name &&
          item.common_name.toLowerCase().includes(textSearch)) ||
        (item.scientific_name &&
          item.scientific_name.toLowerCase().includes(textSearch)) ||
        (item.slug && item.slug.toLowerCase().includes(textSearch)) ||
        (item.family_common_name &&
          item.family_common_name.toLowerCase().includes(textSearch)) ||
        (item.family && item.family.toLowerCase().includes(textSearch)) ||
        (item.genus && item.genus.toLowerCase().includes(textSearch)) ||
        (item.year && item.year === textSearch) ||
        (item.bibliography &&
          item.bibliography.toLowerCase().includes(textSearch)) ||
        (item.author && item.author.toLowerCase().includes(textSearch)) ||
        (item.rank && item.rank.toLowerCase().includes(textSearch))
    );
    setTextResult(data);
    // console.log(textResult);
  };

  serachResult = () => {
    return textResult && textResult.map((item) => PlantCard());
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera or gallery</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* <>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={Camera.Constants.Type.back}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={takePicture} style={styles.button}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.buttonText}>Pick Image</Text>
          </TouchableOpacity>
        </View>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        {textResult !== "" && (
          <Text style={styles.textResult}>{textResult}</Text>
        )}
      </> */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          selectionColor={"green"}
          placeholder="Search for a plant"
          placeholderTextColor="#aaaaaa"
          onChangeText={(plant) => {
            setTextSearch(plant.toLowerCase());
          }}
        />
        <TouchableOpacity onPress={searchPlant} style={styles.searchButton}>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* <Image
        source={{ uri: textResult[0].image_url }}
        onError={(error) => console.log("Image loading error:", error)}
        alt="plant"
        width={100}
        //   style={styles.image}
      /> */}
      {/* {serachResult()} */}
      {PlantCard()}
      <View style={{ marginHorizontal: 20 }}>
        {/* <Text>{textResult}</Text>
        <Image
          source={{
            uri: "https://d2seqvvyy3b8p2.cloudfront.net/40ab8e7cdddbe3e78a581b84efa4e893.jpg",
          }}
          //   source={undefined}
          alt="plant"
          //   style={styles.image}
        /> */}
      </View>
      {/* ))} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ECEDE1", width: "100%" },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {},
  buttonText: { fontSize: 18, marginBottom: 10, color: "white" },
  //   image: { flex: 1 },
  textResult: { flex: 1 },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 10,
    justifyContent: "space-between",
    backgroundColor: "#CACFC0",
    borderRadius: 20,
    paddingLeft: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    backgroundColor: "#CACFC0",
    borderRadius: 20,
    height: 48,
  },
  searchButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5F7A5D",
    borderRadius: 20,
    width: 48,
    height: 48,
  },
});

export default SearchPlantScreen;
