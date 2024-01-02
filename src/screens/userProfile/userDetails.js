import React from "react";
import { Text, View } from "react-native";
import colors from "../../variables/colors";

const UserDetails = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primaryBackground,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: colors.secondaryBackground,
        }}
      >
        Guest User
      </Text>
    </View>
  );
};

export default UserDetails;
