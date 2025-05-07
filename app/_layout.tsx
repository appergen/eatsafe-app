import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HistoryScreen from "./(tabs)/history";
import ProductScreen from "./(tabs)/product";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="history">
        <Stack.Screen
            name="history"
            component={HistoryScreen}
            options={{ headerShown: true, title: "Historique" }}
        />
        <Stack.Screen
            name="product"
            component={ProductScreen}
            options={{ headerShown: true, title: "Produit" }}
        />
      </Stack.Navigator>
  );
};

export default AppNavigator;