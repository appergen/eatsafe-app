import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppScreen from "./(tabs)/index";
import ModalScreen from "./modal"
import HistoryScreen from "./(tabs)/history";
import ProductScreen from "./(tabs)/product";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="app">
        <Stack.Screen
            name="app"
            component={AppScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
          name="modal"
          component={ModalScreen}
          options={{
            presentation: 'modal',
            animation: 'fade',
            headerShown: false,
          }}
        />
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