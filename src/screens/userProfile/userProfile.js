import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import colors from "../../variables/colors";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import ActivityIndicatorAnimation from "../../components/activityIndicatorAnimation";

const UserProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editUserName, setEditUserName] = useState(false);
  const [userName, setUserName] = useState("User Name");

  const userProfileOptions = [
    { id: 1, name: "Favorite Plants", screen: "FavoritePlants" },
    { id: 2, name: "User Details", screen: "UserDetails" },
  ];

  const StoreUserName = async () => {
    try {
      await AsyncStorage.setItem("userName", userName);
    } catch (error) {
      console.error(error);
    }
  };

  const getProfile = async () => {
    setLoading(true);
    const jsonValue = await AsyncStorage.multiGet([
      "profilePicture",
      "userName",
    ]);
    setImage(jsonValue[0][1]);
    setUserName(jsonValue[1][1]);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getProfile();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
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
            }}
            style={styles.profileImage}
          />
          <View
            style={{
              backgroundColor: colors.primaryButton,
              width: 50,
              height: 50,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              bottom: 5,
              right: 10,
            }}
          >
            <Entypo
              name="camera"
              size={24}
              color={colors.secondaryBackground}
            />
          </View>
          {loading && <ActivityIndicatorAnimation loading={loading} />}
        </TouchableOpacity>
        {editUserName ? (
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <TextInput
              style={{
                ...styles.userName,
                borderWidth: 1,
                paddingHorizontal: 8,
                alignItems: "center",
                justifyContent: "center",
                margin: 0,
                borderColor: colors.primaryButton,
              }}
              value={userName}
              onChangeText={(name) => setUserName(name)}
              onSubmitEditing={() => {
                {
                  userName == "" && setUserName("User Name");
                }
                setEditUserName(false);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                {
                  userName == "" && setUserName("User Name");
                }
                setEditUserName(false);
                StoreUserName();
              }}
              style={{
                backgroundColor: colors.primaryButton,
                justifyContent: "center",
              }}
            >
              <MaterialIcons
                name="done"
                size={24}
                color={colors.primaryBackground}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.userName}>{userName}</Text>
            <TouchableOpacity onPress={() => setEditUserName(true)}>
              <FontAwesome5 name="edit" size={16} color="black" />
            </TouchableOpacity>
          </View>
        )}
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
    textAlign: "center",
  },
});

export default UserProfileScreen;
