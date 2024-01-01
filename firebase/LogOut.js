import auth from "@react-native-firebase/auth";

const LogOut = () =>
  auth()
    .signOut()
    .then(() => console.log("User signed out!"));

export default LogOut;
