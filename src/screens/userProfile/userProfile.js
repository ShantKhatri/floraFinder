import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import colors from "../../variables/colors";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CameraImagePicker from "../../components/cameraImagePicker";

const UserProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState("https://via.placeholder.com/150");
  const userProfileOptions = [
    { id: 1, name: "Favorite Plants", screen: "FavoritePlants" },
    { id: 2, name: "User Details", screen: "UserDetails" },
    { id: 3, name: "Reset Password", screen: "ResetPassword" },
    { id: 4, name: "Logout", screen: "Logout" },
  ];

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{}}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: image }} // Replace with user's image
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>User's Name</Text>
      </View>

      <View style={{ width: "100%", marginTop: 50 }}>
        <FlatList
          data={userProfileOptions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(item.screen);
                }}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#cccccc",
                }}
              >
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                <AntDesign name="right" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.primaryBackground,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
});

export default UserProfileScreen;
