import React, { useCallback, useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import { set } from "date-fns";
import LabelSearch from "../services/plantScanAnalyze/labelSearch";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const PlantScanner = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [result, setResult] = useState([]);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraOpened, setCameraOpened] = useState(true);
  const [zoom, setZoom] = useState(0);
  const [imageSource, setImageSource] = useState("");

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      const image = result.assets[0].uri;

      try {
        console.log(
          "searching for plant from getResult before LabelSearch",
          image
        );
        const result = await LabelSearch(image);
        console.log("searching for plant from getResult after LabelSearch");
        setResult(result);
        navigation.navigate("SearchResult", { plant: result });
      } catch (error) {
        console.error("Error getting Result:", error);
      }
      //   return result;
    }
  };

  if (!cameraOpened) {
    return (
      <View style={styles.container}>
        {/* Display the selected image or provide an option to reopen the camera */}
      </View>
    );
  }

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({ base64: true });
      //   return photo;
      setImage(photo.uri);
      try {
        console.log(
          "searching for plant from getResult before LabelSearch",
          image
        );
        const result = await LabelSearch(photo.uri);
        console.log("searching for plant from getResult after LabelSearch");
        setResult(result);
        navigation.navigate("SearchResult", { plant: result });
      } catch (error) {
        console.error("Error getting Result:", error);
      }

      // console.log(JSON.stringify(photo.uri, null, 2));
    }
  };

  const getResult = async () => {
    console.log("searching for plant from getResult");
    try {
      console.log(
        "searching for plant from getResult before LabelSearch",
        image
      );
      const result = await LabelSearch(image);
      console.log("searching for plant from getResult after LabelSearch");
      setResult(result);
    } catch (error) {
      console.error("Error getting Result:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={Camera.Constants.FlashMode.auto}
        zoom={zoom}
        ref={(ref) => {
          setCamera(ref);
        }}
      >
        <Slider
          style={styles.zoomSlider}
          value={zoom}
          onValueChange={setZoom}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity> */}

          <View style={styles.button} />
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 100,
                backgroundColor: "white",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Ionicons name="md-images" size={42} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
    height: "100%",
    width: "100%",
  },
  camera: {
    flex: 1,
    // backgroundColor: "black",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    // flex: 1,
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-between",
  },
  button: {
    // alignSelf: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    marginBottom: 10,
    width: "33%",
    justifyContent: "center",
  },
  captureButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "white",
    width: "33%",
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 40,
    right: 20,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  zoomSlider: {
    width: 150,
    height: 40,
    // marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "white",
    opacity: 0.7,
    alignSelf: "flex-start",
    position: "absolute",
    top: "50%",
    left: "-10%",
    transform: [{ rotate: "-90deg" }],
  },
});

export default PlantScanner;
