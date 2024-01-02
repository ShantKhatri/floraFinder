import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import colors from "../../variables/colors";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import ActivityIndicatorAnimation from "../../components/activityIndicatorAnimation";

const UserProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const userProfileOptions = [
    { id: 1, name: "Favorite Plants", screen: "FavoritePlants" },
    { id: 2, name: "User Details", screen: "UserDetails" },
    // { id: 3, name: "Reset Password", screen: "ResetPassword" },
    // { id: 4, name: "Logout", screen: "Logout" },
  ];

  const getProfilePicture = async () => {
    setLoading(true);
    const jsonValue = await AsyncStorage.getItem("profilePicture");
    const photoUri = jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log("photoUri", typeof photoUri);
    setImage(photoUri);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePicture();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={{}}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CameraImagePicker")}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: colors.secondaryBackground,
          }}
        >
          {console.log("image", image)}
          <Image
            source={{
              uri: image,
            }} // Replace with user's image
            style={styles.profileImage}
          />
          {loading && <ActivityIndicatorAnimation loading={loading} />}
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
