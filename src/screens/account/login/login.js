import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import onGoogleButtonPress from "../../../../firebase/googleSignIn/GoogleSignIn";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [google, setGoogle] = useState("");

  const handleLogin = () => {
    // Add your login logic here
  };

  return (
    <View style={{ marginTop: 50, marginHorizontal: 16 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log("Signed in with Google!")
          )
        }
      />
    </View>
  );
};

export default LoginScreen;
