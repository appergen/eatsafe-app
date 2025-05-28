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
            options={{ headerShown: true, headerTitleAlign: "left", headerShadowVisible: false, title: "Historique", headerTitleStyle: {
              color: "#62B55C"}
             }}
        />
        <Stack.Screen
            name="product"
            component={ProductScreen}
            options={{ headerShown: true, headerShadowVisible: false , title: "Produit" }}
        />
      </Stack.Navigator>
  );
};

export default AppNavigator;