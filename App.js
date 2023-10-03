import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import List from "./src/Screen/list";

export default function App() {
  return (
    <View style={styles.container}>
      <List />
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
