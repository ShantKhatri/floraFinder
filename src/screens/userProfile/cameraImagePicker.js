import React, { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CameraImagePicker = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);
  const [type, setType] = useState(CameraType.back);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraOpened, setCameraOpened] = useState(true);
  const [zoom, setZoom] = useState(0);
  const [loading, setLoading] = useState(false);

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

  const StoreProfilePicture = async (image) => {
    try {
      await AsyncStorage.setItem("profilePicture", image);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setLoading(true);
      setCameraOpened(false);
      try {
        StoreProfilePicture(result.assets[0].uri);
      } catch (error) {
        setLoading(false);
        console.error("Error getting Result:", error);
      }
    }
  };

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({ base64: true });
      setImage(photo.uri);
      setLoading(true);
      setCameraOpened(false);
      try {
        StoreProfilePicture(photo.uri);
      } catch (error) {
        setLoading(false);
        console.error("Error getting Result:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {cameraOpened && (
        <Camera
          ratio="16:9"
          style={styles.camera}
          type={type}
          flashMode={Camera.Constants.FlashMode.auto}
          zoom={zoom}
          ref={(ref) => setCamera(ref)}
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
            onPress={() => navigation.navigate("UserProfileScreen")}
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{ ...styles.button, alignItems: "flex-start" }}
              onPress={toggleCameraType}
            >
              <Ionicons name="md-camera-reverse" size={42} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 100,
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, alignItems: "flex-end" }}
              onPress={pickImage}
            >
              <Ionicons name="md-images" size={42} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  camera: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-between",
  },
  button: {
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
    borderRadius: 100,
    // borderWidth: 5,
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
  zoomSlider: {
    width: 150,
    height: 40,
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

export default CameraImagePicker;
