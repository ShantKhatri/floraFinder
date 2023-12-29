import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const CameraImagePicker = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [textResult, setTextResult] = useState([]);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
      pickImage();
    })();
  }, []);

  //   const processImage = async (base64) => {
  //     try {
  //       let body = JSON.stringify({
  //         requests: [
  //           {
  //             features: [{ type: "TEXT_DETECTION", maxResults: 5 }],
  //             image: { content: base64 },
  //           },
  //         ],
  //       });

  //       let response = await fetch(
  //         "https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY",
  //         {
  //           method: "POST",
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //           body: body,
  //         }
  //       );

  //       let responseJson = await response.json();
  //       setTextResult(JSON.stringify(responseJson, null, 2));
  //     } catch (error) {
  //       console.error("Error processing image:", error);
  //     }
  //   };

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({ base64: true });
      setImage(photo.uri);
      //   processImage(photo.base64);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      //   processImage(result.base64);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera or gallery</Text>;
  }

  return (
    <View style={styles.container}>
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
    </View>
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

export default CameraImagePicker;
