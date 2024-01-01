import React, { useCallback, useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import { set } from "date-fns";
import LabelSearch from "../services/plantScanAnalyze/labelSearch";

const PlantScanner = ({ showCamera, setScanResult }) => {
  const [type, setType] = useState(CameraType.back);
  const [result, setResult] = useState([]);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraOpened, setCameraOpened] = useState(showCamera);
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

  useEffect(() => {
    setCameraOpened(showCamera);
  }, [showCamera]);

  useEffect(() => {
    if (result.length > 0) {
      setScanResult(result);
    }
  }, [result]);

  //   useCallback(async () => {
  //     await getResult();
  //   }, [image]);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
      //   await delay(10000);
      //   console.log("imageINSTATE", image);
      //   console.log("resultINSTAE", result.assets[0].uri);
      try {
        console.log(
          "searching for plant from getResult before LabelSearch",
          image
        );
        const result = await LabelSearch(image);
        console.log("searching for plant from getResult after LabelSearch");
        setResult(result);
        setScanResult(result);
      } catch (error) {
        console.error("Error getting Result:", error);
      }
      //   return result;

      //   setCameraOpened(false);
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
      getResult();
      // console.log(JSON.stringify(photo.uri, null, 2));
      //   setCameraOpened(false);
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
      setScanResult(result);
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => setCameraOpened(false)}
          >
            <Text style={styles.text}>Close Camera</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.text}>Pick Image</Text>
          </TouchableOpacity>
          <Slider
            style={styles.zoomSlider}
            value={zoom}
            onValueChange={setZoom}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
  },
  camera: {
    flex: 1,
    // backgroundColor: "black",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  zoomSlider: {
    width: 150,
    height: 40,
    marginTop: 20,
  },
});

export default PlantScanner;
