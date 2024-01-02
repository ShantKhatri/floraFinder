import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import colors from "../variables/colors";

const ActivityIndicatorAnimation = ({ loadingStatus }) => {
  const [loading, setLoading] = useState(loadingStatus);
  return (
    <View style={styles.modalContainer}>
      <ActivityIndicator
        animating={loading}
        size="large"
        color={colors.primaryButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryBackground,
    // opacity: 0.5,
  },
});

export default ActivityIndicatorAnimation;
