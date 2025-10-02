import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import AddUserScreen from "./src/screens/AddUserScreen";
import UpdateUserScreen from "./src/screens/UpdateUserScreen";

const Stack = createNativeStackNavigator();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6C63FF",
    accent: "#FF6584",
    background: "#F9FAFB",
    surface: "#FFFFFF",
    text: "#1E1E2F",
    placeholder: "#9CA3AF",
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={customTheme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: customTheme.colors.primary },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="AddUser" component={AddUserScreen} />
            <Stack.Screen name="UpdateUser" component={UpdateUserScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
