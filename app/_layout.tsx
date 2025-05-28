import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppScreen from "./(tabs)/index";
import ModalScreen from "./modal"
import HistoryScreen from "./(tabs)/history";
import ProductScreen from "./(tabs)/product";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <GestureHandlerRootView>
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
              presentation: 'transparentModal',
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
    </GestureHandlerRootView>
  );
};

export default AppNavigator;